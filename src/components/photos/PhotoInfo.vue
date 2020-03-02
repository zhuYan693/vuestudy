<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间: {{ photoinfo.add_time | dataFormat}}</span>
            <span>点击:{{ photoinfo.click}}次</span>
        </p>
        <hr>
        <!-- 缩略图 -->
        <div class="thumbs">
            <vue-preview :slides="list" @close="handleClose"></vue-preview>
        </div>

        <cmt-box :id="id"></cmt-box>
    </div>
</template>
<script>
    import comment from '../subcomponents/comment.vue'
    export default {
        data() {
            return {
                id: this.$route.params.id,
                photoinfo: [],
                list: []
            }
        },
        created() {
            this.getPhotoInfo();
            this.getThumbs();
        },
        methods: {
            //获取图片信息
            getPhotoInfo() {
                this.$http.get('api/getimageInfo/' + this.id).then(res => {
                    if (res.body.status === 0) {
                        this.photoinfo = res.body.message[0]
                    }
                })
            },
            // 获取缩略图
            getThumbs() {
                this.$http.get('api/getthumimages/' + this.id).then(res => {
                    if (res.body.status === 0) {
                        res.body.message.forEach((item, i) => {
                            item.w = 600;;
                            item.h = 400;
                            item.src = res.body.message[i].src,
                            item.msrc = res.body.message[i].src
                        });
                        this.list = res.body.message;
                    }
                })
            },
            handleClose() {  //加上这个方法
                console.log('close event')
            }
        },
        components: {
            'cmt-box': comment
        }
    }
</script>

<style lang="less" scoped>
    .photoinfo-container {
        padding: 0 4px;

        h3 {
            margin: 15px 0;
            font-size: 14px;
            text-align: center;
            color: #26a2ff;
        }

        .subtitle {
            display: flex;
            justify-content: space-between;
        }

        .thumbs{
         /deep/ .my-gallery{   //deep深层作用选择器
              display: flex;
              flex-wrap:wrap;//默认换行
              figure{
                  width: 30%;  
                  margin: 5px; 
                  img{
                      width: 100%;
                      box-shadow: 0 0 8px #999;  
                      border-radius: 5px;
                  }
              }
          }
        }
    }
</style>