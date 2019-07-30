<template>
  <div>
    <div class="goods">
      <div class="menu_wrapper" ref="menuWrapper">
        <ul>
          <li class="menu_item border-1px" v-for="(item, index) in goods" :key="index"
              :class="{'current': currentIndex === index}" @click="selectMenu(index)">
          <span class="text">
            <i class="icon" v-if="item.type > 0" :class="classMap[item.type]"></i>{{item.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods_wrapper" ref="foodsWrapper">
        <ul>
          <li class="food_list" v-for="(item, index) in goods" :key="index" ref="foodList">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectFood(food)" class="food_item border-1px" v-for="(food, foodIndex) in item.foods"
                  :key="foodIndex">
                <div class="icon">
                  <img :src="food.icon" alt="" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc" v-show="food.description">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span v-show="food.rating">好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">¥{{food.price}}</span>
                    <s class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</s>
                  </div>
                  <div class="control_wrapper">
                    <Cartcontrol :food="food"></Cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <Shopcart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></Shopcart>
    </div>
    <Food :food="selectedFood" ref="food"></Food>
  </div>
</template>

<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import Shopcart from 'components/shopcart/shopcart'
  import Cartcontrol from 'components/cartcontrol/cartcontrol'
  import Food from 'components/food/food'

  const ERR_OK = 200

  export default {
    name: 'goods',
    components: { Shopcart, Cartcontrol, Food },
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let heigh1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= heigh1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods() {
        let foods = []
        this.goods.forEach(good => {
          good.foods.forEach(food => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

      axios.get('https://easy-mock.com/mock/5d31ca59b047ba213269b656/api2/goods')
        .then(response => {
          if (response.status === ERR_OK) {
            this.goods = response.data
            this.$nextTick(() => {
              this._initScroll()
              this._calculateHeight()
            })
          }
        })
    },
    methods: {
      selectMenu(index) {
        let foodList = this.$refs.foodList
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      selectFood(food) {
        this.selectedFood = food
        this.$refs.food.show()
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodList
        let height = 0
        this.listHeight.push(height)

        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 48px
    width: 100%
    overflow: hidden

    .menu_wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7

      .menu_item
        display: table
        width: 56px
        height: 54px
        padding: 0 12px
        border-1px(rgba(7, 17, 27, 0.1))

        &.current
          margin-top: -1px
          background: #fff
          font-weight: 700

        &:last-child
          border-none()

        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat

          &.decrease
            bg-image('decrease_3')

          &.discount
            bg-image('discount_3')

          &.guarantee
            bg-image('guarantee_3')

          &.invoice
            bg-image('invoice_3')

          &.special
            bg-image('special_3')

        .text
          display: table-cell
          vertical-align: middle
          line-height: 14px
          font-size: 12px
          color: #07111b

    .foods_wrapper
      flex: 1

      .food_list
        .title
          height: 26px
          line-height: 26px
          padding-left: 14px
          font-size: 12px
          color: #93999f
          border-left: 2px solid #d9dde1
          background: #f3f5f7

        .food_item
          display: flex
          margin: 18px
          padding-bottom: 18px
          border-1px(rgba(7, 17, 27, 0.1))

          &:last-child
            border-none()
            margin-bottom: 0

          .icon
            flex: 0 0 57px
            width: 57px
            margin-right: 10px

            img
              vertical-align: top

          .content
            flex: 1

            .name
              margin: 2px 0 8px 0
              line-height: 14px
              font-size: 14px
              color: #07111b

            .desc, .extra
              line-height: 10px
              font-size: 10px
              color: #93999f

            .desc
              line-height: 12px
              margin-bottom: 8px

            .extra
              .count
                margin-right: 12px

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

            .control_wrapper
              position: absolute
              right: 0
              bottom: 12px
</style>
