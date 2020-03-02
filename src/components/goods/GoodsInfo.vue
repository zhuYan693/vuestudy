<template>
    <div class="goodsinfo-container">
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref='ball'></div>
        </transition>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;
                        销售价：<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                    </p>
                    <p>购买数量: <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
                    </p>
                    <p class="btntwo">
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>

                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">产品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号 : {{goodsinfo.goods_no}}</p>
                    <p>库存情况 : {{goodsinfo.stock_quantity}}件</p>
                    <p>上架时间 : {{goodsinfo.add_time | dataFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
    import numbox from '../subcomponents/goodsinfo_numbox.vue'
    import swiper from '../subcomponents/swiper.vue'
    export default {
        data() {
            return {
                id: this.$route.params.id,
                lunbotu: [],
                goodsinfo: [],
                ballFlag: false,
                selectedCount: 1
            }
        },
        created() {
            this.getLunbotu();
            this.getGoodsInfo();
        },
        methods: {
            //获取轮播图
            getLunbotu() {
                this.$http.get('api/getthumimages/' + this.id).then(res => {
                    if (res.body.status === 0) {
                        res.body.message.forEach((item, i) => {
                            item.img = res.body.message[i].src
                        });
                        this.lunbotu = res.body.message;
                    }
                })
            },
            //获取商品信息
            getGoodsInfo() {
                this.$http.get('api/goods/getinfo/' + this.id).then(res => {
                    if (res.body.status === 0) {
                        this.goodsinfo = res.body.message[0];
                    }
                })
            },
            //编程式导之 商品介绍
            goDesc(id) {
                this.$router.push({ name: 'goodsdesc', params: id });
            },
            //编程式导之 评论
            goComment(id) {
                this.$router.push({ name: 'goodscomment', params: id });
            },
            //加购物车
            addToShopCar() {
                this.ballFlag = !this.ballFlag;
            },
            //小球动画
            beforeEnter(el) {
                el.style.transform = 'translate(0,0)';
            },
            enter(el, done) {
                //获取徽标位置
                const badgePosition = document.getElementById('badge').getBoundingClientRect();
                //获取小球初始位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                //坐标插值
                const xDist = badgePosition.left - ballPosition.left;
                const yDist = badgePosition.top - ballPosition.top;
                el.offsetWidth;
                el.style.transform = `translate(${xDist}px,${yDist}px)`;
                el.style.transition = 'transform 1s cubic-bezier(.4,-0.3,1,.68)';
                done();
            },
            afterEnter(el) {
                this.ballFlag = !this.ballFlag;
            },
            //子组件像父组件传值
            getSelectedCount(count){
                this.selectedCount = count;
            }
        },
        components: {
            swiper,
            numbox
        }
    }
</script>


<style lang="less" scoped>
    .goodsinfo-container {
        background-color: #eee;
        overflow: hidden;

        .ball {
            position: absolute;
            top: 369px;
            left: 149px;
            width: 15px;
            height: 15px;
            background-color: #f00;
            z-index: 9999;
            border-radius: 50%;
        }

        .now_price {
            color: red;
            font-size: 16px;
            font-weight: bold;
        }

        .btntwo {
            margin-top: 10px;
            margin-bottom: 0;
        }

        .mui-card-footer {
            display: block;

            button {
                margin: 15px 0;
            }
        }

    }
</style>