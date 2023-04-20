import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import App from './App.vue'
import router from './router'
import { getLocalStorage } from '@/utils/common'
import { STORAGE_NAME } from '@/utils/constant'
import 'vant/lib/index.css'
// import './styles/main.scss'

// Toast,Dialog,Notify和ImagePreview组件是以函数的形式提供的，
// unplugin-vue-components无法自动引入对应的样式，需要手动引入
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'

console.log(import.meta.env)
console.log(import.meta.env.VITE_APP_ENV)
console.log(process.env.NODE_ENV)

if (import.meta.env.VITE_APP_ENV === 'mock') {
  const mockModule = import.meta.glob('./mock/index.ts')
  console.log(mockModule)

  mockModule['./mock/index.ts']().then((mod: any) => {
    mod.setupProdMockServer()
  })
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

const authStore = useAuthStore()
const token = getLocalStorage(STORAGE_NAME.TOKEN)

if (token) {
  authStore.setToken(token)
}

app.mount('#app')
