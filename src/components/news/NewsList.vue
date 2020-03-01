<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="(item) in newslist" :key="item.id">
        <router-link :to="'/home/newsinfo/'+ item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class="mui-ellipsis">
              <span class="mui-pull-left">发表时间: {{ item.add_time | dataFormat }}</span>
              <span class="mui-pull-right">点击：{{ item.click }}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      newslist: []
    };
  },
  created() {
    this.getNewList();
  },
  methods: {
    getNewList() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getnewslist")
        .then(res => {
          if (res.body.status === 0) {
            this.newslist = res.body.message;
          } else {
            Toast("获取新闻列表失败");
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.mui-media-body {
  h1 {
    font-size: 14px;
  }

  .mui-ellipsis {
    color: #226aff;
    font-size: 12px;
  }
}
</style>