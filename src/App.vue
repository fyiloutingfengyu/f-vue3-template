<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { usePageStore } from '@/stores/page'

const onClickLeft = () => history.back()
const pageStore = usePageStore()

let title = computed(() => {
  return pageStore.pageTitle
})

</script>

<template>
  <van-nav-bar
    :title="title"
    left-text="返回"
    left-arrow
    safe-area-inset-top
    @click-left="onClickLeft"
  />
  <RouterView />
</template>

<style lang="scss">
body {
  padding-bottom: var(--van-tabbar-height);
}
</style>
