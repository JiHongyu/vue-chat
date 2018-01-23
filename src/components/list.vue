<script>
    import {mapMutations, mapGetters} from 'vuex';

    export default {
        computed: mapGetters([
            'sessions',
            'currentId'
        ]),
        methods: mapMutations([
            'SELECT_SESSION'
        ])
    };
</script>

<template>
    <div class="list">
        <ul>
            <li v-for="item in sessions" :class="{ active: item.id === currentId }" @click="SELECT_SESSION(item.id)">
                <img class="avatar" width="30" height="30" :alt="item.user.name" :src="item.user.img">
                <p class="name">{{item.user.name}}</p>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="less">
    .list {
        li {
            padding: 12px 15px;
            border-bottom: 1px solid #292C33;
            cursor: pointer;
            transition: background-color .1s;

            &:hover {
                background-color: rgba(255, 255, 255, 0.03);
            }
            &.active {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
        .avatar, .name {
            vertical-align: middle;
        }
        .avatar {
            border-radius: 2px;
        }
        .name {
            display: inline-block;
            margin: 0 0 0 15px;
        }
    }
</style>