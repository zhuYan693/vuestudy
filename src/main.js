import Vue from 'vue'
import app from './app.vue'
//导入路由
import VueRouter from 'vue-router'
import router from './router.js'
import Vueresource from 'vue-resource' 
Vue.use(VueRouter)
Vue.use(Vueresource)
//Mint-UI组件
import MintUI from 'mint-ui'

Vue.use(MintUI)
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
Vue.use(MintUI)
import { Header, Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
let vm = new Vue({
    el: '#app',
    data: {
        msg: '123'
    },
    render: c => c(app),
    router
})