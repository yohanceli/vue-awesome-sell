<template>
  <div class="header">
    <div class="content_wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support_count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin_wrapper" @click="showDetail">
      <span class="bulletin_title"></span><span class="bulletin_text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail_wrapper clearfix">
          <div class="detail_main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star_wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support_item" v-for="(item, index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail_close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import star from 'components/star/star'

  export default {
    name: 'v-header',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true
      },
      hideDetail() {
        this.detailShow = false
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
      star
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"

  .header
    position: relative
    overflow: hidden
    color: #ffffff
    background: rgba(7, 17, 27, 0.5)

    .content_wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0

      .avatar
        display: inline-block
        vertical-align: top
        margin-right: 16px

        img
          border-radius: 2px

      .content
        display: inline-block

        .title
          margin: 2px 0 8px 0

          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat

          .name
            margin-left: 16px
            font-size: 16px
            line-height: 18px
            font-weight: bold

        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px

        .support
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat

            &.decrease
              bg-image('decrease_1')

            &.discount
              bg-image('discount_1')

            &.guarantee
              bg-image('guarantee_1')

            &.invoice
              bg-image('invoice_1')

            &.special
              bg-image('special_1')

          .text
            line-height: 12px;
            font-size: 10px

      .support_count
        position: absolute
        right: 12px
        bottom: 18px
        padding: 0 8px
        height: 24px
        line-height 24px
        border-radius: 14px
        background: rgba(0, 0, 0, 0.2)
        text-align: center

        .count
          vertical-align: top
          font-size: 10px

        .icon-keyboard_arrow_right
          line-height: 24px
          margin-left: 2px
          font-size: 10px

    .bulletin_wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 24px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background: rgba(7, 17, 27, 0.2)

      .bulletin_title
        display: inline-block
        vertical-align: top
        margin-top: 8px
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat no-repeat

      .bulletin_text
        vertical-align: top
        margin: 0 4px
        font-size: 12px

      .icon-keyboard_arrow_right
        position: absolute
        right: 12px
        top: 8px
        font-size: 10px

    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)

    .detail
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      backdrop-filter: blur(10px)
      background: rgba(7, 17, 27, 0.8)

      &.fade-enter-active, &.fade-leave-active
        transition: all 0.5s

      &.fade-enter, &.fade-leave-to
        opacity: 0

      .detail_wrapper
        width: 100%
        min-height: 100%

        .detail_main
          margin-top: 64px
          padding-bottom: 64px

          .name
            line-height: 16px
            text-align: center
            font-size: 16px
            font-weight: 700

          .star_wrapper
            margin-top: 18px
            padding: 2px 0
            text-align: center

          .title
            display: flex
            width: 80%
            margin: 28px auto 24px

            .line
              flex: 1
              position: relative
              top: -6px
              border-bottom: 1px solid rgba(255, 255, 255, 0.2)

            .text
              padding: 0 12px
              font-size: 14px
              font-weight: 700

          .supports
            width: 80%
            margin: 0 auto

            .support_item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0

              &:last-child
                margin-bottom: 0

              .icon
                display: inline-block
                width: 16px
                height: 16px
                vertical-align: top
                margin-right: 6px
                background-size: 16px 16px
                background-repeat: no-repeat

                &.decrease
                  bg-image('decrease_2')

                &.discount
                  bg-image('discount_2')

                &.guarantee
                  bg-image('guarantee_2')

                &.invoice
                  bg-image('invoice_2')

                &.special
                  bg-image('special_2')

              .text
                font-size: 12px
                line-height: 16px

          .bulletin
            width: 80%
            margin: 0 auto

            .content
              padding: 0 12px
              line-height: 24px
              font-size: 12px

      .detail_close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both
        font-size: 32px
</style>
