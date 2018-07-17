<script>
    import {mapMutations} from 'vuex';

    export default {
        data() {
            return {
                content: ''
            };
        },
        methods: {
            onKeyUp(e) {
                if (e.ctrlKey && e.keyCode === 13 && this.content.length && this.state.currentSessionId) {
                    this.sendMessage(this.content);
                    this.content = '';
                }
            },
            // (...) 对象展开运算符
            ...mapMutations([
                'sendMessage',
                'state'
            ])
        }
    };
</script>

<template>
    <div class="text">
        <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" @keyup="onKeyUp"></textarea>
    </div>
</template>

<style lang="less" scoped>
    .text {
        height: 160px;
        border-top: solid 1px #ddd;

        textarea {
            padding: 10px;
            height: 100%;
            width: 100%;
            border: none;
            outline: none;
            font-family: "Micrsofot Yahei";
            resize: none;
        }
    }
</style>