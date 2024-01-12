import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/login',
    method: 'post',
    timeout: 2000,
    response: {
      code: 200,
      data: {
        token: 'token-string'
      }
    }
  }
] as MockMethod[]
