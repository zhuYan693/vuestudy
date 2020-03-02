import Vue from 'vue'
import app from './app.vue'
//导入路由
import VueRouter from 'vue-router'
import router from './router.js'
import Vueresource from 'vue-resource'
import Vuex from 'vuex'
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Vueresource)
Vue.http.options.emulateJSON = true;
//定义全局过滤器
Vue.filter('dataFormat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(dataStr).format(pattern);
});
//获取本地存储
let car = JSON.parse(localStorage.getItem('car')) || [];
var store = new Vuex.Store({
    state: {
        car: car
    },
    mutations: {
        //添加购物车
        addToCar(state, goodsinfo) {
            //数据添加
            let flag = false;
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true;
                }
            })
            if (!flag) {
                state.car.push(goodsinfo)
            }
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        //修改购物车
        updateGoodsInfo(state, goodsinfo) {
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count);
                    return true;
                }
                localStorage.setItem('car', JSON.stringify(state.car));
            })
        },
        //删除购物车商品
        removeGoodsInfo(state, id) {
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1);
                    return true;
                }
                localStorage.setItem('car', JSON.stringify(state.car));
            })
        },
        //更新
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected;
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car));
        }
    },
    getters: {
        getAllCount(state) {
            //统计总个数
            let num = 0;
            state.car.forEach(item => {
                num += item.count;
            });
            return num;
        },
        //得到对应id的数量
        getGoodsCount(state) {
            let o = {};
            state.car.forEach(item => {
                o[item.id] = item.count
            });
            return o;
        },
        //c初始是否选中
        getGoodsSelected(state) {
            let o = {};
            state.car.forEach(item => {
                o[item.id] = item.selected
            });
            return o;
        },
        getGoodsCountAndAmount(state) {
            let o = {
                count: 0,
                amount: 0
            };
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count;
                    o.amount += item.price * item.count;
                }

            })
            return o;
        }

    }
})
//Mint-UI组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import moment from 'moment'
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
Vue.use(MintUI)
import {
    Header,
    Swipe,
    SwipeItem,
    Button,
    Lazyload
} from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);
Vue.http.options.root = 'http://www.liulongbin.top:3005';
let vm = new Vue({
    el: '#app',
    data: {
        msg: '123'
    },
    render: c => c(app),
    router,
    store
})