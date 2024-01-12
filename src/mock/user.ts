import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/getUserInfo',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          name: 'f'
        }
      }
    }
  },
  {
    url: '/api/setUserInfo',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {}
      }
    }
  }
] as MockMethod[]
