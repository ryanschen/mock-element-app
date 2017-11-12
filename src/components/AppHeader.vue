<template>
  <div class="header"><!-- header start-->
    <div class="content-wrapper"><!-- content-wrapper start-->

      <div class="avatar"><!-- avatar start-->
        <img :src="seller.avatar" alt="" width="64" height="64">
      </div>              <!-- avatar end-->

      <div class="content"><!-- content start-->
        <div class="title"><!-- title start-->
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>             <!-- title end-->
        <div class="description">
            {{ seller.description }}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" ></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>             <!-- content end-->

      <div v-if="seller.supports" class="support-count">
          <span class="count">{{ seller.supports.length }}个</span>
          <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div><!-- content-wrapper end-->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
  </div><!-- header end-->
</template>

<script>
export default {
    props: {
      seller: {
        type: Object
      }
    },
    methods: {
      showDetail () {

      }
    }
}
</script>

<style lang="scss" scoped>
.header{
  position: relative;
  color: #fff;
  background-color: rgba(7, 17, 27, 0.5);
  .content-wrapper{
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
    .avatar{
      display: inline-block;
      vertical-align: top;
      img{
        border-radius: 2px;
      }
    }
    .content{
      display: inline-block;
      margin-left: 16px;
      .title{
        margin: 2px 0 8px 0;
        .brand{
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          background-size: 30px 18px;
          background-repeat: no-repeat; 
          background-image: url('../assets/img/brand@2x.png');
        }
        .name{
          font-size: 16px;
          color: rgb(255, 255, 255);
          font-weight: bold;
          line-height: 18px;
          margin-left: 6px;
        }
      }
      .description{
        font-size: 12px;
        line-height: 12px;
        margin-bottom: 10px;
      }
      .support{
        .icon{
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          background-image: url('../assets/img/decrease_1@2x.png');
        }
        .text{
          font-size: 10px;
          line-height: 12px;
        }
      }
    }
    .support-count{
        position: absolute;
        right: 12px;
        bottom: 14px;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        border-radius: 14px;
        background: rgba(0, 0, 0, 0.2);
        text-align: center;
      .icon-keyboard_arrow_right{
        margin-left: 2px;
        line-height: 24px;
        font-size: 10px;
      }
      .count{
        font-size: 10px;
        vertical-align: top;
      }
    }
  }
  .bulletin-wrapper{
      position: relative;
      height: 28px;
      line-height: 28px;
      padding: 0 22px 0 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      background: rgba(7, 17, 27, 0.2);
      .bulletin-title{
        display: inline-block;
        vertical-align: top;
        margin-top: 8px;
        width: 22px;
        height: 12px;
        background-image: url('../assets/img/bulletin@2x.png');
        background-size: 22px 12px;
        background-repeat: no-repeat;
      }
      .bulletin-text{
        vertical-align: top;
        margin: 0 4px;
        font-size: 10px;
      }
      .icon-keyboard_arrow_right{
        position: absolute;
        font-size: 10px;
        right: 12px;
        top: 8px;
      }
    }
}
</style>
