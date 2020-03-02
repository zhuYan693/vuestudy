<template>
    <div class="goodsdesc-cotainer">
        <h3>{{ info.title }}</h3>
        <hr>
        <div class="content" v-html="info.content"></div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                info: {}
            }
        },
        created() {
            this.getGoodsDesc();
        },
        methods: {
            getGoodsDesc() {
                this.$http.get('api/goods/getdesc/' + this.$route.params.id).then(res => {
                    if (res.body.status == 0) {
                        this.info = res.body.message[0];
                    }
                })
            }
        },
    }
</script>
<style lang="less">
    .goodsdesc-cotainer {
        padding: 4px;

        h3 {
            font-size: 16px;
            color: #226aff;
            text-align: center;
            margin: 15px 0;
        }

        .content {
            img {
                width: 100%;
            }
        }
    }
</style>