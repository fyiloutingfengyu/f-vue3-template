<script setup lang="ts">
import { inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { http } from '@/utils/http'
import loginApi from '@/api/login'
import { useAuthStore } from '@/stores/auth'
import { setLocalStorage } from '@/utils/common'
import { STORAGE_NAME } from '@/utils/constant'

const store = useAuthStore()
const route = useRoute()
const router = useRouter()
let redirect = '/'
const mainAppRouter: any = inject('maiAppRouter')
console.log(111, mainAppRouter)

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
  })
    .then((res: any) => {
      store.setToken(res.data.token)
      setLocalStorage(STORAGE_NAME.TOKEN, res.data.token)

      router.replace({
        path: redirect
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

const toReactApp = () => {
  history.pushState(null, 'sub-react', '/sub-react')
}

const toMainApp = () => {
  mainAppRouter.push('/')
}

</script>

<template>
  <div>
    <van-button type="primary" size="mini" @click="toLogin"> login</van-button>

    <img class="test-pic" src="@/assets/images/test_pic.jpg" alt="">
    <i class="alipay-icon"></i>
    <van-button @click="toReactApp">去react子应用</van-button>
    <van-button @click="toMainApp">去主应用</van-button>
  </div>
</template>


<style scoped lang="scss">
.test-pic {
  display: block;
  width: 40px;
  height: 40px;
  margin-bottom: 100px;
}

.alipay-icon {
  display: block;
  width: 40px;
  height: 40px;
  background: url("../assets/images/icon_apliay.png") no-repeat left center;
  background-size: 100% 100%;
}
</style>
