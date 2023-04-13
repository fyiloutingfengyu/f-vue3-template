/**
 * @description: 公共请求拦截器版
 */
import axios from 'axios'
import { Toast } from 'vant'

// todo f
import type { HttpOptions, LoadingObj } from '@/interface/common'

import { DOMAIN, removeLocalStorage } from '@/utils/common'
import { ignoreTokenUrl } from '@/api/ignore-token'
import { STORAGE_NAME } from '@/utils/constant'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const commonConfig = require('@/config/index')

axios.defaults.baseURL = commonConfig.BASE_URL
// 请求超时时间
axios.defaults.timeout = 30000

interface UrlArr {
  [key: string]: any;
}

const urlArr: UrlArr = {}
let count = 0

// 设置ContentType
const getContentType = (type: string) => {
  const dataType = type || 'json'

  switch (dataType) {
    case 'form':
      return 'application/x-www-form-urlencoded;charset=utf-8'
    case 'json':
      return 'application/json'
    case 'file':
      return 'multipart/form-data'
    default:
      return 'application/json'
  }
}

// 跳转到登录页面
const gotoLogin = () => {
  if (location.pathname !== '/login') {
    setTimeout(() => {
      // todo f 优化
      window.location.href = `${DOMAIN}/login?redirect=${encodeURIComponent(location.href)}`
    }, 700)
  }
}

// 请求完成后从缓存中删除请求地址缓存
const removeUrlCache = (options: HttpOptions) => {
  const url = options.url

  //删除已结束的请求缓存
  if (urlArr[url]) {
    for (const i in urlArr[url]) {
      if (urlArr[url][i] == options.flag) {
        delete urlArr[url][i]
        break
      }
    }

    if (Object.keys(urlArr[url]).length === 0) {
      delete urlArr[url]
    }
  }
}

// 封装功能的请求
const http = (options: HttpOptions) => {
  const defaultOptions = {
    isRepeatable: false, // 默认请求不可重复
    isLoading: true, // 默认添加loading
    isManualDealError: false, // 默认不手动处理后台接口错误
    isManualDealHttpError: false // 默认不手动处理http请求的错误
  }

  options = Object.assign(defaultOptions, options)

  let isIgnoreToken = false
  const accessToken = authStore.token

  interface HeadersObj {
    'Content-Type': string;
    Authorization?: string;
  }

  const headersObj: HeadersObj = {
    'Content-Type': getContentType(options.type),
    Authorization: ''
  }

  // 设置token
  if (accessToken) {
    headersObj.Authorization = accessToken
  }

  // 不需要校验token的接口删除 headers中的Authorization
  for (let index = 0; index < ignoreTokenUrl.length; index++) {
    const ignoreUrl = ignoreTokenUrl[index]

    if (options.url && options.url.startsWith(ignoreUrl)) {
      // delete运算符操作数必须为any、unknown、never或为可选
      delete headersObj.Authorization
      isIgnoreToken = true
      break
    }
  }

  // 前置拦截，进入axios之前进行登录态和请求是否能重复发送的拦截，不用放在interceptors.request中

  // 本地不存在token且是需要校验token的接口，直接提示去登录 （如首次访问首页的情况）
  if (!isIgnoreToken && !accessToken) {
    Toast.fail('登录后才可以访问哦！')
    gotoLogin()
    return
  }

  // 请求不能重复
  if (!options.isRepeatable) {
    const requestUrl = options.url
    const paramsStr = options.params ? JSON.stringify(options.params) : '_'

    // url和参数都相同的请求认为是重复提交
    if (urlArr[requestUrl] && urlArr[requestUrl][paramsStr]) {
      return
    }

    // 缓存请求的url和data
    urlArr[requestUrl] = urlArr[requestUrl] || {}

    const flag = 'req' + (++count)

    urlArr[requestUrl][paramsStr] = flag
    options.flag = flag
  }

  const loadingObj: LoadingObj = {
    duration: 0, // 持续展示 toast
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    mask: false
  }

  // 添加loading
  if (options.isLoading) {
    const loadingConfig = options.loadingConfig

    if (loadingConfig) {
      Object.assign(loadingObj, loadingConfig)
    }

    Toast.loading(loadingObj)
  }

  interface Config {
    headers: HeadersObj,
    url: string,
    method: any,
    data?: any,
    params?: any
  }

  const config: Config = {
    headers: headersObj,
    url: options.url,
    method: options.method || 'get'
  }

  const methodsList = ['put', 'PUT', 'post', 'POST', 'patch', 'PATCH']

  if (methodsList.includes(config.method)) {
    config['data'] = options.params
  } else {
    config['params'] = options.params
  }


  axios.interceptors.request.use(config => {
    return config
  }, err => {
    return err
  })

  axios.interceptors.response.use((response) => {
    removeUrlCache(options)
    Toast.clear()

    if (options.isManualDealError) {
      // 手动接口返回的处理错误
      return response
    } else {
      // 自动处理接口返回的错误
      switch (response.data.code) {
        case 200:
          console.log('接口返回的数据', response.data)
          return response.data
        default:
          Toast.fail(response.data.message)
          return response.data
      }
    }
  }, error => {
    removeUrlCache(options)
    Toast.clear()

    if (options.isManualDealHttpError) {
      // 手动处理http请求的错误
      return error
    } else {
      // 自动处理http请求的错误
      if (error.response) {
        switch (error.response.status) {
          case 401: // 未登录、登陆过期
          case 402: // 未登录、登陆过期
            Toast.fail('身份认证失败,请重新登录！')
            removeLocalStorage(STORAGE_NAME.TOKEN)
            authStore.setToken('')

            gotoLogin()
            break
          case 500:
            Toast.fail(error.response.data.message)
            break
          default:
            if (process.env.VUE_APP_ENV !== 'production') {
              Toast.fail(error.response.data.message)
            } else {
              Toast.fail('服务异常，请稍后再试！')
            }
        }
      } else if (error.request) {
        Toast.fail(error.message)
      } else {
        Toast.fail(error.message)
      }
    }
  })

  return new Promise((resolve, reject) => {
    // @ts-ignore todo f
    axios(config).then(res => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export { http }

