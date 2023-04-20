<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const getProductInfo = () => {
  console.log(route.query.id)

}

getProductInfo()

</script>

<template>
  <div class="product-detail">
    <van-card
      num="2"
      tag="标签"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
      origin-price="10.00"
    />
  </div>
  <van-action-bar>
    <van-action-bar-icon icon="chat-o" text="客服" dot />
    <van-action-bar-icon icon="cart-o" text="购物车" badge="5" />
    <van-action-bar-icon icon="shop-o" text="店铺" badge="12" />
    <van-action-bar-button type="warning" text="加入购物车" />
    <van-action-bar-button type="danger" text="立即购买" />
  </van-action-bar>
</template>

<style>

</style>
