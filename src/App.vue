<template>
  <div id="app">
    <VHeader :seller="seller"></VHeader>
    <div class="tab border-1px">
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
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import VHeader from 'components/v-header/v-header'
  import axios from 'axios'
  import { urlParse } from 'common/js/util'

  const ERR_OK = 200

  export default {
    name: 'app',
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse()
            return queryParam.id
          })()
        }
      }
    },
    components: {
      VHeader
    },
    created() {
      axios.get('https://easy-mock.com/mock/5d31ca59b047ba213269b656/api2/seller?id=' + this.seller.id).then(response => {
        if (response.status === ERR_OK) {
          this.seller = Object.assign({}, this.seller, response.data)
        }
      })
    }
  }
</script>

<style lang="stylus">
  @import "common/stylus/mixin.styl"

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    border-1px(rgba(7, 17, 27, 0.1))

    .tab-item
      flex: 1
      text-align: center

      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)

        &.active
          color: rgb(240, 20, 20)
</style>
