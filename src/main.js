import Vue from 'vue'
import app from './app.vue'
//导入路由
import VueRouter from 'vue-router'
import router from './router.js'
import Vueresource from 'vue-resource' 
Vue.use(VueRouter)
Vue.use(Vueresource)
//定义全局过滤器
Vue.filter('dataFormat',(dataStr,pattern = 'YYYY-MM-DD HH:mm:ss')=>{
    return moment(dataStr).format(pattern);
})
//Mint-UI组件
import MintUI from 'mint-ui'

Vue.use(MintUI)
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import moment from 'moment'
Vue.use(MintUI)
import { Header, Swipe, SwipeItem,Button  } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.http.options.root = 'http://www.liulongbin.top:3005';
let vm = new Vue({
    el: '#app',
    data: {
        msg: '123'
    },
    render: c => c(app),
    router
})