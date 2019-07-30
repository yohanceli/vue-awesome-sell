<template>
  <div class="ratings" ref="ratings">
    <div class="ratings_content">
      <div class="overview">
        <div class="overview_left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview_right">
          <div class="score_wrapper">
            <span class="title">服务态度</span>
            <Star :size="36" :score="seller.serviceScore"></Star>
            <span class="score_text">{{seller.serviceScore}}</span>
          </div>
          <div class="score_wrapper">
            <span class="title">商品评分</span>
            <Star :size="36" :score="seller.foodScore"></Star>
            <span class="score_text">{{seller.foodScore}}</span>
          </div>
          <div class="delivery_wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <Split></Split>
      <Ratingselect @select="selectRating" @toggle="toggleContent" :ratings="ratings" :selectType="selectType"
                    :contentOnly="contentOnly"></Ratingselect>
      <div class="rating_wrapper">
        <ul>
          <li v-show="needShow(rating.rateType, rating.text)" v-for="(rating, index) in ratings"
              class="rating_item border-1px" :key="index">
            <div class="avatar">
              <img :src="rating.avatar" alt="" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star_wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="recommend_item" v-for="(item, index) in rating.recommend" :key="index">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import Split from '../split/split'
  import Star from '../star/star'
  import Ratingselect from '../ratingselect/ratingselect'
  import { formatDate } from 'common/js/date'

  const ERR_OK = 200
  const ALL = 2

  export default {
    name: 'ratings',
    components: { Ratingselect, Star, Split },
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,
        contentOnly: true
      }
    },
    methods: {
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
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      toggleContent(contentOnly) {
        this.contentOnly = !contentOnly
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },
    created() {
      axios.get('https://easy-mock.com/mock/5d31ca59b047ba213269b656/api2/ratings')
        .then(response => {
          if (response.status === ERR_OK) {
            this.ratings = response.data
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.ratings, {
                click: true
              })
            })
          }
        })
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

  .ratings
    position: absolute
    top: 174px
    bottom: 0
    width: 100%
    overflow: hidden

    .overview
      display: flex
      padding: 18px 0

      .overview_left
        flex: 0 0 138px
        width: 138px
        padding: 6px 0;
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px

        .score
          line-height: 28px
          margin-bottom: 6px
          font-size: 24px
          color: #ff9900

        .title
          line-height: 12px
          margin-bottom: 8px
          font-size: 12px
          color: #07111b

        .rank
          line-height: 10px
          font-size: 10px
          color: #93999f

      .overview_right
        flex: 1
        padding: 6px 0 6px 24px

        .score_wrapper
          margin-bottom: 8px
          font-size: 0

          .title
            display: inline-block
            vertical-align: top
            line-height: 18px
            font-size: 12px
            color: #07111b

          .star
            display: inline-block
            vertical-align: top
            margin: 0 12px

          .score_text
            line-height: 18px
            font-size: 12px
            color: #ff9900

        .delivery_wrapper
          .title
            display: inline-block
            vertical-align: top
            line-height: 18px
            font-size: 12px
            color: #07111b

          .delivery
            line-height: 18px
            margin-left: 12px
            font-size: 12px
            color: #93999f

        @media only screen and (max-width: 320px)
          padding: 6px 0 6px 12px
          .score_wrapper
            .star
              margin: 0 6px

          .delivery_wrapper
            .delivery
              margin-left: 6px

    .rating_wrapper
      padding: 0 18px

      .rating_item
        display: flex
        padding: 18px 0
        border-1px(rgba(7, 17, 27, 0.1))

        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px

          img
            border-radius: 50%

        .content
          position: relative
          flex: 1

          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: #07111b

          .star_wrapper
            margin-bottom: 6px

            .star
              display: inline-block
              vertical-align: top
              margin-right: 6px

            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: #93999f

          .text
            margin-bottom: 8px
            line-height: 18px
            font-size: 12px
            color: #07111b

          .recommend
            .icon-thumb_up
              margin-right: 8px
              line-height: 16px
              font-size: 12px
              color: #00a0dc

            .recommend_item
              display: inline-block;
              margin: 0 8px 4px 0
              padding: 0 6px
              line-height: 16px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 2px
              font-size: 9px
              color: #93999f

          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: #93999f
</style>
