import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  return defineConfig({
    // 本地ip访问
    server: {
      port: 8099,
      host: '0.0.0.0'
    },
    plugins: [
      vue(),
      vueJsx(),
      Components({
        resolvers: [VantResolver()] // 按需引入Vant组件的样式
      }),
      viteMockServe({
        mockPath: 'mock', // 默认值 'mock'
        supportTs: true, // 默认值 true
        // process.cwd()前执行node命令时候的文件夹地址
        localEnabled: loadEnv(mode, process.cwd()).VITE_APP_ENV === 'mock'
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
          postcsspxtoviewport8plugin({
            unitToConvert: 'px', // 要转化的单位，默认为 px
            viewportWidth: file => {
              let num = 750
              if (file.indexOf('node_modules/vant') !== -1) {
                num = 375
              }
              return num
            },
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
}
