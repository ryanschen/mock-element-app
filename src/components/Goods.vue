<template>
  <div class="goods">

      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item, index) in goods" v-bind:key="index" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index, $event)">
            <span class="text border-1px">
              <span v-show="item.type>0" class="icon"></span>{{ item.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="(item, index) in goods" v-bind:key="index" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" v-bind:key="food.index" class="food-item border-1px">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" alt="">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">¥{{food.price}}</span><span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                  </div>
                  <div class="cart-control-wrapper">
                    <cart-control :food="food"></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shop-cart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shop-cart>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import ShopCart from './ShopCart'
import CartControl from './CartControl'
export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      ShopCart,
      CartControl,
    },
    data(){
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = []
        console.log('goods:',this.goods)
        this.goods.forEach(good => {
            good.foods.forEach(food => {
                if(food.count){
                    foods.push(food)
                }
            })
        })
        return foods;
      }
    },
    mounted(){
      this.$http.get('/api/goods').then((response)=>{
          console.info(response.data.data)
          this.goods = response.data.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
      })
    },
    methods: {
      selectMenu(index, event) {
        console.log(index, event)
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        this.foodsScroll.scrollToElement(foodList[index], 300)
      },
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for(let i = 0; i < foodList.length; i++){
          height += foodList[i].clientHeight
          this.listHeight.push(height)
        }
      }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/mixin.scss';

.goods{
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper{
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
    .menu-item{
      display: table;
      height: 54px;
      width: 56px;
      line-height: 14px;
      padding: 0 12px;
      &.current{
        position: relative;
        z-index: 10;
        margin-top: -1px;
        font-size: 12px;
        font-weight: 700;
        background-color: #fff;
        .text{
          @include border-none()
        }
      }
      .icon{

      }
      .text{
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        @include border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }
  .foods-wrapper{
    flex: 1;
    .title{
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147,153,159);
      background-color: #f3f5f7;
    }
    .food-item{
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        &:last-child{
          @include border-none();
          margin-bottom: 0;
        }
        .icon{
          flex: 0 0 57px;
          margin-right: 10px;
  
        }
        .content{
          flex: 1;
          .name{
            font-size: 14px;
            color: rgb(7,17,27);
            line-height: 14px;
            margin: 2px 0 8px 0;
            height: 14px;
          }
          .desc, .extra{
            line-height: 10px;
            font-size: 10px;
            color: rgb(147,153,159);
          }
          .desc{
            margin-bottom: 8px;
            line-height: 12px;
          }
          .extra{
            .count{
              margin-right: 12px;
            }
          }
          .price{
            font-weight: 700;
            line-height: 24px;
            .now{
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240, 20, 20);
            }
            .old{
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147,153,159);
            }
          }
          .cart-control-wrapper{
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
    }
  }
}
</style>
