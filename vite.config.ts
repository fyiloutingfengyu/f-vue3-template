import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// @ts-ignore  // todo f
import postcsspxtoviewport from 'postcss-px-to-viewport'

// https://vitejs.dev/config/
export default defineConfig({
  // 本地ip访问
  server: {
    port: 8099,
    host: "0.0.0.0"
  },
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [VantResolver()] // 按需引入Vant组件的样式
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport({
          unitToConvert: 'px', // 要转化的单位，默认为 px
          viewportWidth: 375, // 视口宽度（设计稿的宽度）
          unitPrecision: 6, // 转换后的精度(保留的小数位数)
          propList: ['*'], // 要转换单位的CSS属性，*代表全部css属性都进行单位转换
          viewportUnit: 'vw', // 转换后的单位，默认vw
          fontViewportUnit: 'vw', // 字体转换后的单位，默认vw
          selectorBlackList: ['ignore-'], // 包含'ignore-'字符串的选择器不会被转换，
          minPixelValue: 1, // 小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中进行单位转换，默认false
          replace: true, // 是否转换后直接更换属性值
          // 过滤不包含 node_modules/vant的其他所有文件
          exclude: [/^(?!.*node_modules\/vant)/],
          landscape: false // 是否处理横屏情况
        }),
        postcsspxtoviewport({
          unitToConvert: 'px',
          viewportWidth: 750,
          unitPrecision: 6,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: ['ignore-'],
          minPixelValue: 1,
          mediaQuery: true,
          replace: true,
          exclude: [/node_modules\/vant/i],
          landscape: false
        })
      ]
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  }
})
