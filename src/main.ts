import { createApp } from 'vue'
import type { App } from 'vue'
import { createPinia } from 'pinia'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/es/helper'
import { useAuthStore } from '@/stores/auth'
import app from './App.vue'
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

let root: App

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

// qiankun生命周期函数
renderWithQiankun({
  mount(props: any) {
    console.log('qiankun props', props)

    props.onGlobalStateChange((state: any, prev: any) => {
      console.log('qiankun onGlobalStateChange', state)
      console.log('prev', prev)
      // 获取父组件传递的状态
      if (state.userInfo) {
        // todo f 存储用户信息
      }

      if (state.token) {
        // 存储token信息
      }
    }, true) // 首次加载也执行

    render(props)
  },
  bootstrap() {
  },
  unmount() {
    root.unmount()
  },
  update() {
  }
})

// 非qiankun 环境，独立运行
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  console.log('独立运行')
  render({})
}

// 挂载页面
function render(props: any) {
  const { container, mainAppRouter } = props

  root = createApp(app)

  root.provide('maiAppRouter', mainAppRouter)

  root.use(createPinia())
  root.use(router)

  const authStore = useAuthStore()
  const token = getLocalStorage(STORAGE_NAME.TOKEN)

  if (token) {
    authStore.setToken(token)
  }

  const dom = container ? container.querySelector('#app') : '#app'

  root.mount(dom)
}
