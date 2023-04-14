<script setup lang="ts">
import { RouterView } from 'vue-router'

const onClickLeft = () => history.back()
</script>

<template>
  <van-nav-bar
    title="f-mall"
    left-text="返回"
    left-arrow
    safe-area-inset-top
    @click-left="onClickLeft"
  />
  <RouterView />
</template>

<style lang="scss" scoped>
.name {
  width: 100px;
  height: 100px;
  font-size: 26px;
  color: $color-primary;
}
</style>
