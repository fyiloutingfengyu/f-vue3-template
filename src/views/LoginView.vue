<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import http from '@/utils/http'
import loginApi from '@/api/login'
import { useAuthStore } from '@/stores/auth'
import { setLocalStorage } from '@/utils/common'
import { STORAGE_NAME } from '@/utils/constant'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
let redirect = '/'

if (typeof route.query.redirect === 'string') {
  redirect = route.query.redirect
}

console.log(router.currentRoute.value)

const toLogin = () => {
  http({
    url: loginApi.login.url,
    method: loginApi.login.method,
    params: {
      mobilePhone: '18888888888',
      pwd: '123'
    }
  }).then((res: any) => {
    authStore.setToken(res.data.token)
    setLocalStorage(STORAGE_NAME.TOKEN, res.data.token)

    router.replace({
      path: redirect
    })
  }).catch((err) => {
    console.log(err)
  })
}

</script>

<template>
  <div>
    <van-button type="primary" size="mini" @click="toLogin"> login</van-button>

    <img class="test-pic" src="@/assets/images/test_pic.jpg" alt="">
    <i class="alipay-icon"></i>
  </div>
  <div class="test-auto-prefix">test</div>
</template>


<style scoped lang="scss">
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

.test-auto-prefix {
  opacity: 0.5;
  transform: rotate(30deg);
}

</style>
