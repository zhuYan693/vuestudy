import Vue from 'vue'
import app from './app.vue'
//Mint-UI组件
import MintUI from 'mint-ui'
// import { Header } from 'mint-ui'
// Vue.component(Header.name, Header)
Vue.use(MintUI)
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.min.css'
Vue.use(MintUI)
let vm = new Vue({
    el: '#app',
    data: {
        msg: '123'
    },
    render: c => c(app)
})