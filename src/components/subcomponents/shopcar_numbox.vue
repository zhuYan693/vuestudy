<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged"
            ref='numbox' readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>
<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        data() {
            return {

            }
        },
        mounted() {
            // 初始化数字选择框组件
            mui(".mui-numbox").numbox();
        },
        methods: {
            countChanged() {
                //实时更新
                this.$store.commit('updateGoodsInfo',{
                    id: this.id,
                    count: parseInt(this.$refs.numbox.value)
                });
            }
        },
        props: ["max", 'initcount','id'],
        //监听父组件传来的值
        watch: {
            max: (newValue, oldValue) => {
                mui('.mui-numbox').numbox().setOption('max', newValue)
            }
        },
    }
</script>
<style lang="less">

</style>