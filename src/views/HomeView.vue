<script setup lang='ts'>
const images = [
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg'
]
</script>

<template>
  <van-swipe class='home-swipe'
             :autoplay='3000'
             height='300'
             lazy-render>
    <van-swipe-item v-for='image in images' :key='image'>
      <img :src='image' />
    </van-swipe-item>
  </van-swipe>

</template>

<style lang='scss' scoped>
.home-swipe {
  .van-swipe-item {

  }
}
</style>
