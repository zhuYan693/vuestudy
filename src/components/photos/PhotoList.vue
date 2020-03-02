<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item' , item.id === 0 ? 'mui-active' : '']" href="#item1mobile"
                        v-for="(item, index) in cates" :key="index" @tap="getPhotoListByCateId(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>

        </div>
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1>{{ item.title }}</h1>
                    <div class="info-body"> {{ item.zhaiyao }} </div>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
    import mui from '../../lib/mui/js/mui.min'

    export default {
        data() {
            return {
                cates: [],
                list: []
            }
        },
        created() {
            this.getAllCategory();
            this.getPhotoListByCateId(0);
        },
        mounted() {
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods: {
            getAllCategory() {
                this.$http.get('api/getimgcategory').then(res => {
                    if (res.body.status === 0) {
                        res.body.message.unshift({ title: '全部', id: 0 })
                        this.cates = res.body.message;
                    } else {
                        Toast('获取分类列表失败');
                    }
                })
            },
            getPhotoListByCateId(id) {
                this.$http.get('api/getimages/' + id).then(res => {
                    if (res.body.status === 0) {
                        this.list = res.body.message;
                    } else {
                        Toast('获取分类列表失败');
                    }
                })
            }
        },
    }
</script>
<style lang="less" scoped>
    * {
        touch-action: pan-y;
    }

    .photo-list {
        list-style: none;
        text-align: center;
        padding: 10px;
        margin: 0;

        li {
            background-color: #ccc;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;
            position: relative;

            img {
                width: 100%;
                vertical-align: middle;
            }

            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }

            .info {
                position: absolute;
                bottom: 0;
                text-align-last: left;
                color: #fff;
                background: rgba(0, 0, 0, .4);

                h1 {
                    font-size: 14px;
                }

                .info-body {
                    font-size: 13px;
                }
            }
        }
    }
</style>