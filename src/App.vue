<template>
  <div id="app">
    <app-header></app-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
export default {
    components: {
      AppHeader
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
    // border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    // box-sizing: border-box;
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
