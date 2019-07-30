<template>
  <div class="cartconstrol">
    <transition name="move">
      <div class="cart_decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart_count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart_add" @click.stop.prevent="addCart">
      <span class="inner icon-add_circle"></span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'cartconstrol',
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart() {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      decreaseCart() {
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .cartconstrol
    font-size: 0

    .cart_decrease, .cart_add
      display: inline-block
      padding: 6px
      opacity: 1;

      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: #00a0dc

    .cart_decrease
      transform: translate3d(0, 0, 0)

      .inner
        transition: all 0.4s linear
        transform: rotate(0)

      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear

      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)

        .inner
          transform: rotate(180deg)

    .cart_count
      display: inline-block
      vertical-align: top
      line-height: 36px
      width: 16px
      text-align: center
      font-size: 10px
      color: #93999f
</style>
