/**
 * @description 不需要校验token的接口
 */

const ignoreTokenUrl: string[] = [
  '/api/login',
  '/api/setUserInfo', // todo f 暂时不校验登录态
  '/api/getUserInfo' // todo f
]

export { ignoreTokenUrl }
