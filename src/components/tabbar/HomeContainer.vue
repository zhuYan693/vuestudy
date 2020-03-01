<template>
  <div>
    <mt-swipe :auto="10000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.index">
        <img :src="item.img" />
      </mt-swipe-item>
    </mt-swipe>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/NewsList">
          <img src="../../images/menu1.png" alt />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu2.png" alt />
          <div class="mui-media-body">图片分享</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu3.png" alt />
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt />
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt />
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt />
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { Toast } from "mint-ui";
  export default {
    data() {
      return {
        lunbotuList: []
      };
    },
    created() {
      this.getLunbotu();
    },
    methods: {
      getLunbotu() {
        this.$http
          .get("http://www.liulongbin.top:3005/api/getlunbo")
          .then(res => {
            if (res.body.status === 0) {
              this.lunbotuList = res.body.message;
            } else {
              Toast("读取轮播图错误");
            }
          });
      }
    }
  };
</script>

<style lang="less" scoped>
  .mint-swipe {
    height: 200px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .mui-grid-view.mui-grid-9 {
    background-color: #fff;

    li {
      border: 0;

      img {
        width: 60px;
        height: 60px;
      }
    }
  }
</style>