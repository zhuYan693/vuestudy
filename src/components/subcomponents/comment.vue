<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="写下你要说的话(最多120个字)" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in comments" :key="i">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;
                    用户：{{ item.user_name}}&nbsp;&nbsp;
                    发表时间：{{ item.add_time | dataFormat }}
                </div>
                <div class="cmt-body">
                    {{ item.content === 'undefined' ? '该用户什么都没有留下' : item.content }}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>

    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                pageindex: 1,
                comments: [],
                msg: ''
            }
        },
        created() {
            this.getComments();
        },
        methods: {
            getComments() {
                this.$http.get(`api/getcomments/${this.id}?pageindex=${this.pageindex}`).then(res => {

                    if (res.body.status === 0) {
                        this.comments = this.comments.concat(res.body.message);
                    } else {
                        Toast('评论失败');
                    }
                })
            },
            getMore() {
                this.pageindex++;
                this.getComments();
            },
            postComment() {
                if (this.msg.trim().length === 0) {
                    return Toast('评论内容不能为空');
                }
                this.$http.post('api/postcomment/' + this.$route.params.id, {
                    content: this.msg.trim()
                }).then(res => {
                    if (res.body.status === 0) {
                        let cmt = { user_name: '匿名用户', add_time: Date.now(), content: this.msg };
                        this.comments.unshift(cmt);
                        this.msg = ''
                    }
                })
            }
        },
        props: ['id']
    }
</script>

<style lang="less">
    .cmt-container {
        h3 {
            font-size: 18px;
        }

        textarea {
            height: 85px;
            margin: 0;
        }

        .cmt-list {
            padding: 5px 0;
            line-height: 35px;

            .cmt-title {
                height: 35px;

                background-color: #ccc;
                font-size: 13px;
            }

            .cmt-body {
                text-indent: 2em;
                font-size: 12px;
            }
        }

    }
</style>