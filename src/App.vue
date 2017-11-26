<template>
  <div id="app">
    <app-header :seller="seller"></app-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller" ></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { urlParse } from './assets/js/util'
import AppHeader from '@/components/AppHeader'
export default {
    components: {
      AppHeader
    },
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        },
        goods: {

        }
      }
    },
    mounted () {
      this.$http.get('/api/seller?id=' + this.seller.id)
      .then( (response) => {
        console.log(response);
        this.seller = Object.assign({}, this.seller, response.data.data)
      })
      .catch( (error) => {
        console.log(error);
      });

      this.$http.get('/api/goods')
      .then( (response) => {
        console.log('goods:', response);
        this.goods = Object.assign({}, this.goods, response.data.data)
      })
      .catch( (error) => {
        console.log(error);
      });
    }
}
</script>

<style lang="scss">
@import './assets/css/mixin.scss';
#app{
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    @include border-1px(rgba(7, 17, 27, 0.1));
    .tab-item{
      flex: 1;
      text-align: center;
      a{
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93)
      }
      a.active{
        color:rgb(240, 20, 20)
      }
    }
  }
}

</style>
