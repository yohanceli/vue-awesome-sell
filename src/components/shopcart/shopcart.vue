<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content_left">
          <div class="logo_wrapper">
            <div class="logo" :class="{'highlight': totalCount > 0}">
              <span class="icon-shopping_cart"></span>
            </div>
            <div class="num" v-show="totalCount > 0">
              <span class="text">{{totalCount}}</span>
            </div>
          </div>
          <div class="price" :class="{'highlight': totalPrice > 0}">¥{{totalPrice}}</div>
          <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
        </div>
        <div class="content_right" @click.stop.prevent="pay">
          <div class="pay" :class="{'highlight': totalPrice >= minPrice}">{{payDesc}}</div>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart_list" v-show="listShow">
          <div class="list_header border-1px">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list_content" ref="listContent">
            <ul>
              <li class="food border-1px" v-for="(food, index) in selectFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <span class="price">¥{{food.price * food.count}}</span>
                <div class="cartcontrol_wrapper">
                  <Cartconstrol :food="food"></Cartconstrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list_mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Cartconstrol from '../cartcontrol/cartcontrol'

  export default {
    name: 'shopcart',
    components: { Cartconstrol },
    props: {
      selectFoods: {
        type: Array,
        default() {
          return []
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
    data() {
      return {
        fold: true
      }
    },
    computed: {
      totalPrice() {
        let total = 0
        this.selectFoods.forEach(food => {
          total += food.price * food.count
        })
        return total
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach(food => {
          count += food.count
        })
        return count
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `¥${this.minPrice}起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差¥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    methods: {
      toggleList() {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      hideList() {
        this.fold = true
      },
      empty() {
        this.selectFoods.forEach(food => {
          food.count = 0
        })
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return
        }
        window.alert(`支付${this.totalPrice}元`)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"

  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px

    .content
      display: flex
      height: 100%
      background: #141d27
      color: rgba(255, 255, 255, 0.4)

      .content_left
        flex: 1
        display: flex

        .logo_wrapper
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          text-align: center

          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c

            .icon-shopping_cart
              line-height: 44px
              font-size: 24px

            &.highlight
              background: #00a0dc

              .icon-shopping_cart
                color: #fff

          .num
            position: absolute
            top: 0
            right: 0
            height: 16px
            padding: 0 7px
            border-radius: 8px
            font-size: 0
            color: #fff
            background: #f01414
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);

            .text
              line-height: 16px
              font-size: 9px
              font-weight: 700

        .price
          line-height: 24px
          margin: 12px 0
          padding-right: 12px
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700

          &.highlight
            color: #fff

        .desc
          line-height: 24px
          margin: 12px 0 0 12px
          font-size: 10px

      .content_right
        flex: 0 0 105px
        width: 105px

        .pay
          height: 100%
          line-height: 48px
          text-align: center
          background: #2b343c
          font-size: 12px
          font-weight: 700
          cursor: pointer

          &.highlight
            background: #00b43c
            color: #fff

    .shopcart_list
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)

      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s

      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)

      .list_header
        display: flex
        align-items: center
        height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-1px(rgba(7, 17, 27, 0.1))

        .title
          flex: 1
          font-size: 14px
          color: #07111b

        .empty
          font-size: 12px
          color: #00a0dc

      .list_content
        max-height: 217px
        overflow: hidden
        padding: 0 18px
        background: #fff

        .food
          display: flex
          align-items: center
          height: 53px
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))

          .name
            flex: 1
            font-size: 14px
            color: #07111b

          .price
            font-size: 14px
            color: #f01414
            font-weight: 700

          .cartcontrol_wrapper
            margin-left: 9px

  .list_mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    background: rgba(7, 17, 27, 0.8)
    opacity: 1

    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s

    &.fade-enter, &.fade-leave-active
      opacity: 0
</style>
