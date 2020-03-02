<template>
  <div class="shopcar-container">

    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item, index) in goodslist" :key="index">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">

            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" 
            @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :initcount='$store.getters.getGoodsCount[item.id]' :id='item.id'></numbox>
                <a href="#" @click.prevent="remove(item.id,index)">删除</a>
              </p>
            </div>

          </div>
        </div>
      </div>
      <!-- 结算区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计（不含运费）</p>
              <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount['count'] }}</span> 件， 总价 <span class="red">￥{{ $store.getters.getGoodsCountAndAmount['amount'] }}</span></p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>


  </div>
</template>

<script>
  import numbox from '../subcomponents/shopcar_numbox.vue'
  export default {
    data() {
      return {
        goodslist: []
      }
    },
    created() {
      this.getGoodsList();
    },
    methods: {
      getGoodsList() {
        let idArr = [];
        //id组
        this.$store.state.car.forEach(item => {
          idArr.push(item.id);
        });
        if (idArr.length === 0) {
          return
        }
        this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(res => {
          if (res.body.status === 0) {
            this.goodslist = res.body.message;
          }
        })
      },
      //删除商品
      remove(id,index){
        this.goodslist.splice(index,1);
        this.$store.commit('removeGoodsInfo',id);
      },
      selectedChanged(id,val) {
        console.log(id+'---'+val);
        this.$store.commit('updateGoodsSelected',{
          id,
          selected: val
        })
      }
    },
    components: {
      numbox
    }
  }
</script>

<style lang="less" scoped>
  .shopcar-container {
    background-color: #eee;
    overflow: hidden;

    .goods-list {
      .mui-card-content-inner {
        display: flex;
        align-items: center;
      }

      .mui-numbox {
        height: 25px;
      }

      img {
        width: 60px;
        margin: 0 10px;
      }

      h1 {
        font-size: 13px;
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h1 {
          margin-bottom: 10px;
        }

        .price {
          color: red;
          font-weight: bold;
          margin-right: 5px;
          min-width: 46px;
          display: inline-block;
        }

        a {
          margin-left: 10px;
        }
      }
    }

    .jiesuan {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .red {
        color: red;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
</style>