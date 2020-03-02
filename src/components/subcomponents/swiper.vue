<template>
    <div>
        <mt-swipe :auto="10000">
            <mt-swipe-item v-for="item in lunbotuList" :key="item.index">
                <img :src="item.img" :class="{'full':isfull}" />
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    export default {
        props:['lunbotuList','isfull']
    }
</script>

<style lang="less" scoped>
    .mint-swipe {
        height: 200px;
        text-align: center;
        img {
            /* width: 100%; */
            height: 100%;
        }
        .full {
            width: 100%;
        }
    }
</style>