/**
 * @description: 公共配置
 */

const MODE_URL = {
  // 生产环境
  production: {
    baseURL: 'https://h5.prd.f.com',
    cdnURL: 'https://f-h5.cdn.f.com/resource/'
  },
  // 测试环境
  test: {
    baseURL: 'https://h5.test.f.com',
    cdnURL: 'https://f-h5-test.cdn.f.com/resource/'
  },
  // 开发环境
  development: {
    baseURL: 'https://h5.test.f.com',
    cdnURL: import.meta.env.BASE_URL
  },
  // 数据mock
  mock: {
    baseURL: '',
    cdnURL: import.meta.env.BASE_URL
  }
}

// @ts-ignore // todo f
const BASE_URL = MODE_URL[import.meta.env.VITE_APP_ENV].baseURL

module.exports = {
  BASE_URL,
  MODE_URL
}
