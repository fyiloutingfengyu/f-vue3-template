<script setup lang="ts">
import { http } from '@/utils/http'
import loginApi from '@/api/login'

const images = [
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg'
]

const toLogin = () => {
  http({
    url: loginApi.login.url,
    method: loginApi.login.method,
    params: {
      mobilePhone: '18888888888',
      pwd: '123'
    },
    isManualDealError: true
  })
    .then((res) => {
      console.log(666, res)
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <van-swipe class="home-swipe" :autoplay="3000" height="300" lazy-render>
    <van-swipe-item v-for="image in images" :key="image">
      <img :src="image" />
    </van-swipe-item>
  </van-swipe>

  <van-button type="primary" size="mini" @click="toLogin"> login</van-button>
  <img class="test-pic" src="@/assets/images/test_pic.jpg" alt="">
  <i class="alipay-icon"></i>
</template>

<style lang="scss" scoped>
.home-swipe {
  .van-swipe-item {
    img {
      display: block;
      width: 100%;
      height: 300px;
      padding: 30px 60px;
      background-color: var(--van-white);
      pointer-events: none;
    }
  }
}

.test-pic {
  visibility: hidden;
  width: 100%;
}

.alipay-icon {
  display: block;
  width: 40px;
  height: 40px;
  background: url("../assets/images/icon_apliay.png") no-repeat left center;
  background-size: 100% 100%;
}
</style>
