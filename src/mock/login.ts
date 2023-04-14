import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/getUserInfo',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          name: 'f',
        },
      }
    },
  },
  {
    url: '/api/login',
    method: 'post',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        token: 'token-string',
      },
    },
  },
] as MockMethod[]
