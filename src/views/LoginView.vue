<script setup lang="ts">
import { http } from '@/utils/http'
import loginApi from '@/api/login'
import { useAuthStore } from '@/stores/auth'

const store = useAuthStore()
console.log(store)

const toLogin = () => {
  http({
    url: loginApi.login.url,
    method: loginApi.login.method,
    params: {
      mobilePhone: '18888888888',
      pwd: '123'
    }
  })
    .then((res) => {
      console.log(666, res)
      store.setToken(res.data.token)
      console.log(777,store.token)
    })
    .catch((err) => {
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
</style>
