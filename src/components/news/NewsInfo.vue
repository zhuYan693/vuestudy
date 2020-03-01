<template>
    <div class="newsinfo-container">
        <h3 class="title">{{ newsinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间:{{ newsinfo.add_time | dataFormat}}</span>
            <span>点击: {{ newsinfo.click }} 次</span>
        </p>
        <hr>
        <div class="content" v-html="newsinfo.content">
        </div>
        <!-- 评论模块 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>
<script>
    import comment from '../subcomponents/comment.vue'
    import { Toast } from 'mint-ui'
    export default {
        data() {
            return {
                id: this.$route.params.id,
                newsinfo: {}
            }
        },
        components:{
            "comment-box": comment
        },
        created(){
            this.getNewsInfo();
        },
        methods: {
            getNewsInfo(){
                this.$http.get('api/getnew/'+this.id).then(res=>{
                    if(res.body.status === 0) {
                        this.newsinfo = res.body.message[0];
                    }else {
                        Toast('获取新闻信息失败')
                    }
                })
            }
        },
    };
</script>
<style lang="less" scoped>
    .newsinfo-container {
        padding: 0 5px;

        .title {
            margin: 15px 0;
            color: red;
            text-align: center;
            font-size: 16px;
        }

        .subtitle {
            display: flex;
            justify-content: space-between;
            color: #226aff;
        }
    }
</style>