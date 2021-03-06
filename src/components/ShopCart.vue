<template>
  <div class="shop-cart">
      <div class="content">
          <div class="content-left">
              <div class="logo-wrapper">
                  <div class="logo" :class="{'highlight':totalCount>0}">
                    <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
                  </div>
                  <div class="num" v-show="totalCount>0">{{totalCount}}</div>
              </div>
              <div class="price" :class="{'highlight':totalPrice>0}">¥{{totalPrice}}</div>
              <div class="desc">需配送费¥{{deliveryPrice}}元</div>
          </div>
          <div class="content-right">
              <div class="pay" :class="payClass">{{payDesc}}</div>
          </div>
          <div class="ball-container">
              <div v-for="(ball,index) in balls" :key="index">
                    <transition
                        name="drop"
                        @before-enter="beforeDrop"
                        @enter="dropping"
                        @after-enter="afterDrop">
                        <div v-show="ball.show" class="ball">
                                <div class="inner inner-hook"></div>
                        </div>
                    </transition>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        selectFoods: {
            type: Array,
            default() {
                return [];
            }
        },
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        }
    },
    computed: {
        totalPrice() {
            let total = 0
            this.selectFoods.forEach(food => {
                total += food.price * food.count
            })
            return total;
        },
        totalCount() {
            let count = 0
            this.selectFoods.forEach(food => {
                count += food.count
            })
            return count;
        },
        payDesc() {
            if(this.totalPrice === 0){
                return `¥${this.minPrice}元起送`;
            }else if(this.totalPrice < this.minPrice){
                let diff = this.minPrice - this.totalPrice
                return `还差¥${diff}元起送`;
            }else{
                return `去结算`;
            }
        },
        payClass() {
            if(this.totalPrice < this.minPrice){
                return 'not-enough';
            }else{
                return `enough`;
            }
        }
    },
    data() {
        return {
            balls: this.$store.getters.getBalls
        }
    },
    methods: {
        beforeDrop (el) {
            let count = this.$store.getters.getBalls.length
            while(count--){
                let ball = this.$store.getters.getBalls[count]
                if(ball.show){
                    let rect = ball.el.getBoundingClientRect()
                    console.log(rect)
                    let x = rect.left - 32
                    let y = -(window.innerHeight - rect.top - 22)
                    el.style.display = ''
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`
                    el.style.transform = `translate3d(0,${y}px,0)`
                    let inner = el.getElementsByClassName('inner-hook')[0]
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`
                    inner.style.transform = `translate3d(${x}px,0,0)`
                }
            }
        },
        dropping (el, done) {
            let rf = el.offsetHeight
            //体验优化，异步执行下落代码
            this.$nextTick(() => {
                el.style.webkitTransform = `translate3d(0,0,0)`
                el.style.transform = `translate3d(0,0,0)`
                let inner = el.getElementsByClassName('inner-hook')[0]
                inner.style.webkitTransform = `translate3d(0,0,0)`
                inner.style.transform = `translate3d(0,0,0)`
                el.addEventListener('transitionend', done)
            })
        },
        afterDrop (el) {
            this.$store.dispatch('resetBall', el)
        },
    }
}
</script>

<style lang="scss" scoped>
.shop-cart{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content{
        display: flex;
        background-color: #141d27;
        font-size: 0;
        color: rgba(255,255,255,0.4);
        .content-left{
            flex: 1;
            .logo-wrapper{
                display: inline-block;
                vertical-align: top;
                position: relative;
                top: -10px;
                margin: 0 12px;
                padding: 6px;
                background-color: red;
                width: 56px;
                height: 56px;
                box-sizing: border-box;
                border-radius: 50%;
                background-color: #141d27;
                .logo{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    text-align: center;
                    background-color: #2b343c;
                    &.highlight{
                        background-color: rgb(0, 160, 220);
                    }
                    .icon-shopping_cart{
                        line-height: 44px;
                        font-size: 24px;
                        color: #80858a;
                        &.highlight{
                            background-color: rgb(0, 160, 220);
                            color: #fff;
                        }
                    }
                }
                .num{
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 24px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    border-radius: 16px;
                    font-size: 9px;
                    font-weight: 700;
                    color: #fff;
                    background: rgb(240, 20, 20);
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);

                }
            }
            .price{
                display: inline-block;
                vertical-align: top;
                margin-top: 12px;
                line-height: 24px;
                padding-right: 12px;
                box-sizing: border-box;
                border-right: 1px solid rgba(255, 255, 255, 0.1);
                font-size: 16px;
                font-weight: 700;
                &.highlight{
                    color: #fff;
                }
            }
            .desc{
                display: inline-block;
                vertical-align: top;
                margin: 12px 0 0 12px;
                line-height: 24px;
                font-size: 10px;
            }
        }
        .content-right{
            flex: 0 0 105px;
            width: 105px;
            .pay{
                height: 48px;
                line-height: 48px;
                text-align: center;
                font-size: 12px;
                font-weight: 700;
                &.not-enough{
                    background: #2b333b;
                }
                &.enough{
                    background: #00b43c;
                    color: #fff;
                }
            }
        }
    }
    .ball-container{
        .ball{
            position: fixed;
            left: 32px;
            bottom: 22px;
            z-index: 200;
            &.drop-enter-active, &.drop-leave-active{
                transition: all .4s cubic-bezier(0.49,-0.29,0.75,0.41);
            }
            .inner{
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background-color: rgb(0, 160, 220);
                transition: all .4s linear;
            }
        }
    }
}           
</style>
