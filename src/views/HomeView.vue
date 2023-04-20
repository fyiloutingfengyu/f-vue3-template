<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const images = [
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg'
]

const active = ref(0)

const goToDetail = (id: string) => {
  router.push({
    path: '/product-detail',
    query: {
      id: id
    }
  })
}

</script>

<template>
  <van-swipe class="home-swipe" :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in images" :key="image">
      <img :src="image" />
    </van-swipe-item>
  </van-swipe>
  <van-grid column-num="3">
    <van-grid-item v-for="(item, index) in 6" :key="index"
                   icon="photo-o" :text="`文本${item}`"
    />
  </van-grid>
  <van-card
    num="2"
    tag="标签"
    price="2.00"
    desc="描述信息"
    title="商品标题"
    thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
    origin-price="10.00"
    @click="goToDetail(1)"
  />
  <van-card
    num="2"
    tag="标签"
    price="2.00"
    desc="描述信息"
    title="商品标题"
    thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
    origin-price="10.00"
    @click="goToDetail(2)"
  />
  <van-card
    num="2"
    tag="标签"
    price="2.00"
    desc="描述信息"
    title="商品标题"
    thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
    origin-price="10.00"
    @click="goToDetail(2)"
  />
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="search" dot>标签</van-tabbar-item>
    <van-tabbar-item icon="friends-o" badge="5">标签</van-tabbar-item>
    <van-tabbar-item
      icon="setting-o"
      badge="20"
      to="/login"
    >
      我的
    </van-tabbar-item>
  </van-tabbar>
</template>

<style lang="scss" scoped>
.home-swipe {
  .van-swipe-item {
    img {
      display: block;
      width: 100%;
      padding: 30px 60px;
      background-color: var(--van-white);
      pointer-events: none;
    }
  }
}
</style>
