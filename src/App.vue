<script>
    import {mapMutations} from 'vuex';

    import Card from 'components/card';
    import List from 'components/list';
    import TextInput from 'components/text-input';
    import Message from 'components/message';

    export default {
        components: {Card, List, TextInput, Message},
        methods: mapMutations([
            'initData',
        ]),
        created() {
            this.initData();
        }
    };
</script>

<template>
    <div id="app">
        <div class="sidebar">
            <card></card>
            <list></list>
        </div>
        <div class="main">
            <message></message>
            <text-input></text-input>
        </div>
    </div>
</template>

<style lang="less" scoped>
    #app {
        margin: 20px auto;
        width: 800px;
        height: 600px;

        overflow: hidden;
        border-radius: 3px;

        .sidebar, .main {
            height: 100%;
        }
        .sidebar {
            float: left;
            width: 200px;
            color: #f4f4f4;
            background-color: #2e3238;
        }
        .main {
            position: relative;
            overflow: hidden;
            background-color: #eee;
        }
        .text {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
        }
        .message {
            height: ~'calc(100% - 160px)';
        }
    }
</style>
