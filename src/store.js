/**
 * Vuex
 * http://vuex.vuejs.org/zh-cn/intro.html
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const now = new Date();
const randId = Math.floor(Math.random()*6457 + 1001000);
const store = new Vuex.Store({
    state: {
        // 当前用户
        user: {
            name: '' + randId,
            img: 'dist/images/1.jpg',
            uid: randId
        },
        // 会话列表
        /**
         *
         * {
         *      id: 2,
         *      user: {
         *          name: 'webpack',
         *          img: 'dist/images/3.jpg'
         *      },
         *      messages: []
         *  }
         */
        sessions: [],
        // 当前选中的会话
        currentSessionId: null,
        // 过滤出只包含这个key的会话
        filterKey: '',
        webSocket: null
    },
    mutations: {
        initData(state) {
            let data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        initWebSocket(state) {
            state.webSocket = new WebSocket("ws://localhost:8080/websocket/" + randId);

            //连接发生错误的回调方法
            state.webSocket.onerror = () => {
                console.log("connect error")
            };

            //连接成功建立的回调方法
            state.webSocket.onopen = (event) => null;

            //接收到消息的回调方法
            state.webSocket.onmessage = function(event){
                console.log(event.data);
                let res = JSON.parse(event.data);
                let msg = res.data;
                if(msg.type === 1){
                    let session = state.sessions.find(item => item.id === msg.sender);
                    if(session){
                        session.messages.push({
                            content: msg.context,
                            date: new Date(),
                            self: false
                        });
                    }
                }else if(msg.type === 2){
                    let existSession = state.sessions.filter(item => msg.onlineUid.indexOf(item.id) > -1 );
                    let existUid = existSession.map(item => item.id);
                    let newUid = msg.onlineUid.filter(item => existUid.indexOf(item) < 0);
                    newUid.forEach(item => {
                        let newSession = {};
                        newSession.id = item;
                        newSession.user = {name: ''+item,img: 'dist/images/2.png'};
                        newSession.messages = [];
                        existSession.push(newSession);
                    })
                    state.sessions = existSession;
                }

            };

            //连接关闭的回调方法
            state.webSocket.onclose = function(){
                console.log("closed");
            };

            //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
            window.onbeforeunload = function(){
                websocket.close();
            };

        },
        // 发送消息
        sendMessage({sessions, currentSessionId, webSocket}, content) {

            // 组装数据
            let postData = {}
            postData.sender = randId;
            postData.receiver = currentSessionId;
            postData.context = content;
            // 向服务器发送数据
            webSocket.send(JSON.stringify(postData));
            // 本地存储修改
            let session = sessions.find(item => item.id === currentSessionId);
            session.messages.push({
                content: content,
                date: new Date(),
                self: true
            });
        },
        // 选择会话
        selectSession(state, id) {
            state.currentSessionId = id;
        },
        // 搜索
        setFilterKey(state, value) {
            state.filterKey = value;
        }
    },
    getters: {
        // 当前会话 session
        session: ({sessions, currentSessionId}) => sessions.find(session => session.id === currentSessionId),
        // 过滤后的会话列表
        filteredSessions: ({sessions, filterKey}) => {
            let result = sessions.filter(session => session.user.name.includes(filterKey));
            return result;
        }
    }
});

store.watch(
    (state) => state.sessions,
    (val) => {
        console.log('CHANGE: ', val);
        localStorage.setItem('vue-chat-session', JSON.stringify(val));
    },
    {
        deep: true
    }
);

export default store;
