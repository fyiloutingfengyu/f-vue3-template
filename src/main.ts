import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './styles/main.scss'

// Toast,Dialog,Notify和ImagePreview组件是以函数的形式提供的，
// unplugin-vue-components无法自动引入对应的样式，需要手动引入
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';

console.log(import.meta.env);
console.log(import.meta.env.VITE_APP_ENV);
console.log(process.env.NODE_ENV)
console.log()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
