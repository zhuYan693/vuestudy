<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref='numbox' />
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
        methods: {
            countChanged() {
                //为父组件传值
                this.$emit('getcount', parseInt(this.$refs.numbox.value));
            }
        },
        props: ["max"],
        //监听父组件传来的值
        watch: {
            max:(newValue,oldValue)=>{
                mui('.mui-numbox').numbox().setOption('max',newValue)
            }
        },
    }
</script>
<style lang="less">

</style>