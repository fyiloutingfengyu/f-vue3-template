import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import qiankun from 'vite-plugin-qiankun'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin'
import { viteMockServe } from 'vite-plugin-mock'
import { visualizer } from 'rollup-plugin-visualizer'
import requireTransform from 'vite-plugin-require-transform'
import legacy from '@vitejs/plugin-legacy' // 处理浏览器兼容性
// import externalGlobals from 'rollup-plugin-external-globals'
import viteCompression from 'vite-plugin-compression'
import path from 'path'

const packageJson = require('./package.json')

const useViteMockServe = (mode: string) => {
  // process.cwd()前执行node命令时候的文件夹地址
  if (loadEnv(mode, process.cwd()).VITE_APP_ENV === 'mock') {
    return viteMockServe({
      mockPath: 'mock', // 默认值 'mock'
      supportTs: true, // 默认值 true
      localEnabled: true,
      prodEnabled: false
    })
  }
}

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  return defineConfig({
    base: '/sub-vue', // 开发或生产服务的公共基础路径，默认值为 '/'
    build: {
      target: 'es2015',
      minify: 'esbuild',
      rollupOptions: {
        /*plugins: [
          externalGlobals({
            vue: 'Vue'
          })
        ],*/
        output: {
          /*format: 'es',
          globals: {
            vue: 'Vue'
          },*/
          // 指定chunks的入口文件模式
          entryFileNames: 'assets/js/[name].[hash].js',
          // 对代码分割产生的chunk进行自定义命名
          chunkFileNames: 'assets/js/[name].[hash].js',
          // 自定义构建结果中静态资源的名称
          assetFileNames: (assetInfo) => {
            if (typeof assetInfo.name === 'string') {
              let subDir = 'img'

              if (path.extname(assetInfo.name) === '.css') {
                subDir = 'css'
              }

              return `assets/${subDir}/[name].[hash].[ext]`
            } else {
              return 'assets/[name].[hash].[ext]'
            }
          }
        }
      }
    },
    esbuild: {
      drop: loadEnv(mode, process.cwd()).VITE_APP_ENV === 'production' ? ['console', 'debugger'] : []
    },
    plugins: [
      vue(),
      vueJsx(),
      Components({
        resolvers: [
          VantResolver({
            // importStyle: false // 按需引入Vant组件时，不导入样式
          })]
      }),
      requireTransform({
        fileRegex: /.ts$|.vue$/
      }),
      legacy({
        targets: [
          "> 1%, last 1 version, ie >= 11",
          "safari >= 10",
          "Android > 39",
          "Chrome >= 60",
          "Safari >= 10.1",
          "iOS >= 10.3",
          "Firefox >= 54",
          "Edge >= 15"
        ],
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
        polyfills: ["es.promise.finally", "es/map", "es/set"],
        modernPolyfills: ["es.promise.finally"]
      }),
      viteCompression({
        verbose: true,
        disable: false,
        algorithm: 'gzip',
        ext: '.gz'
      }),
      useViteMockServe(mode),
      visualizer({}),
      // 名称为主应用中注册的该子应用的名称
      qiankun('sub-vue', {
        useDevMode: true // 不使用热更新
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
            landscape: false // 是否处理横屏情况
          })
        ]
      },
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/variables.scss";'
        }
      }
    },
    // 本地ip访问
    server: {
      port: 8099,
      host: '0.0.0.0',
      origin: 'http://localhost:8099', // 开发服务器的基础路径
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  })
}
