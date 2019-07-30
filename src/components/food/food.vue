<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food_content">
        <div class="image_header">
          <img :src="food.image" alt="">
          <div class="back" @click="back">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell_count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">¥{{food.price}}</span>
            <s class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</s>
          </div>
          <div class="cartcontrol_warpper">
            <Cartcontrol :food="food" ref="cartControl"></Cartcontrol>
          </div>
          <transition name="fade">
            <div @click.stop.prevent="buy" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
          </transition>
        </div>
        <Split v-show="food.info"></Split>
        <div class="info" v-show="food.info">
          <h2 class="title">商品介绍</h2>
          <p class="text">{{food.info}}</p>
        </div>
        <Split></Split>
        <div class="ratings">
          <h2 class="title">商品评价</h2>
          <Ratingselect :ratings="food.ratings" :selectType="selectType" :contentOnly="contentOnly"
                        :desc="desc" @select="selectRating" @toggle="toggleContent"></Ratingselect>
          <div class="rating_wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType, rating.text)" class="rating_item"
                  v-for="(rating, index) in food.ratings" :key="index">
                <div class="item_info">
                  <div class="time">{{rating.rateTime | formatDate}}</div>
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img :src="rating.avatar" class="avatar" alt="">
                  </div>
                </div>
                <div class="item_content">
                  <p class="text">
                    <span
                        :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>
                    {{rating.text}}
                  </p>
                </div>
              </li>
            </ul>
            <div class="no_ratings" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  import Cartcontrol from 'components/cartcontrol/cartcontrol'
  import Split from '../split/split'
  import Ratingselect from '../ratingselect/ratingselect'
  import { formatDate } from 'common/js/date'

  // const POSITIVE = 0
  // const NEGATIVE = 1
  const ALL = 2

  export default {
    name: 'food',
    components: { Ratingselect, Split, Cartcontrol },
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        contentOnly: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      show() {
        this.showFlag = true
        this.selectType = ALL
        this.contentOnly = true

        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      back() {
        this.showFlag = false
      },
      buy() {
        this.$refs.cartControl.addCart()
      },
      needShow(type, text) {
        if (this.contentOnly && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      },
      selectRating(type) {
        this.selectType = type
      },
      toggleContent(contentOnly) {
        this.contentOnly = !contentOnly
      }
    },
    filters: {
      formatDate(time) {
        return formatDate(time, 'yyyy-MM-dd hh:mm')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"

  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    transform: translate3d(0, 0, 0)

    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear

    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)

    .food_content
      .image_header
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        // padding百分比是根据宽度获取的

        img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%

        .back
          position: absolute
          left: 0
          top: 10px

          .icon-arrow_lift
            display: block
            padding: 10px
            font-size: 20px
            color: #fff

      .content
        position: relative
        padding: 18px

        .title
          line-height: 14px
          margin-bottom: 8px
          font-size: 14px
          font-weight: 700
          color: #07111b

        .detail
          height: 10px
          font-size: 0
          margin-bottom: 19px

          .sell_count, .rating
            line-height: 10px
            font-size: 10px
            color: #93999f

        .price
          line-height: 24px

          .now
            margin-right: 8px
            line-height: 14px
            font-size: 14px
            font-weight: 700
            color: #f01414

          .old
            font-size: 10px
            color: #93999f
            font-weight: 700

        .cartcontrol_warpper
          position: absolute
          right: 12px
          bottom: 12px

        .buy
          position: absolute
          right: 18px
          bottom: 18px
          height: 24px
          line-height: 24px
          padding: 0 12px
          border-radius: 12px
          font-size: 10px
          color: #fff
          background: #00a0dc

          &.fade-enter-active, &.fade-leave-active
            transition: all 0.2s

          &.fade-enter, &.fade-leave-active
            opacity: 0

      .info
        padding: 18px

        .title
          line-height: 14px
          margin-bottom: 6px
          font-size: 14px
          color: #07111b

        .text
          line-height: 24px;
          padding: 0 8px
          font-size: 12px
          color: #4d555d

      .ratings
        padding-top: 18px

        .title
          line-height: 14px
          margin: 0 18px
          font-size: 14px
          color: #07111b

        .rating_wrapper
          padding: 0 18px

          .rating_item
            padding: 18px 0
            border-1px(rgba(7, 17, 27, 0.1))

            .item_info
              display: flex
              justify-content: space-between
              margin-bottom: 10px
              line-height: 14px
              font-size: 10px
              color: #93999f

              .user
                .name
                  display: inline-block
                  vertical-align: top

                .avatar
                  margin-left: 6px;
                  width: 12px;
                  height: 12px;
                  border-radius: 50%

            .item_content
              .text
                line-height: 16px
                font-size: 12px
                color: #07111b

                .icon-thumb_up, icon-thumb_down
                  margin-right: 4px;

                .icon-thumb_up
                  color: #00a0dc

                .icon-thumb_down
                  color: #b7bbbf
</style>
