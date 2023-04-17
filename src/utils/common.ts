/**
 * @description: 格式化日期
 * @method dateFormat
 * @param {Date} date 需要格式化的日期类型
 * @param {string} format 自定义的格式
 * @returns {string} 格式化之后的日期字符串
 */
const dateFormat = (date: Date, format: string) => {
  const dateObj = new Date(date)
  const map: any = {
    M: dateObj.getMonth() + 1, //月份
    d: dateObj.getDate(), //日
    h: dateObj.getHours(), //小时
    m: dateObj.getMinutes(), //分
    s: dateObj.getSeconds(), //秒
    S: dateObj.getMilliseconds() //毫秒
  }

  format = format.replace(/([yMdhmsS])+/g, function (all, item) {
    let val = map[item]

    if (val !== undefined) {
      if (all.length > 1) {
        val = '0' + val
        val = val.substr(val.length - 2)
      }
      return val
    } else if (item === 'y') {
      return (dateObj.getFullYear() + '').substr(4 - all.length)
    }
    return all
  })
  return format
}

/**
 * @description: 获取localStorage
 * @method getLocalStorage
 * @param {string} name - localStorage的名称
 */
const getLocalStorage = (name: string) => {
  return localStorage.getItem(name) || ''
}

/**
 * @description: 存入localStorage
 * @method setLocalStorage
 * @param {string} name - localStorage的名称
 * @param {string} value - 存入的值
 */
const setLocalStorage = (name: string, value: string) => {
  return localStorage.setItem(name, value)
}

/**
 * @description: 删除localStorage
 * @method removeLocalStorage
 * @param {string} name - localStorage的名称
 */
const removeLocalStorage = (name: string) => {
  localStorage.removeItem(name)
}

/**
 * @description: 当前服务域名
 */
const DOMAIN = window.location.origin

/**
 * @description: 读取location.search中的参数值
 * @param {string} name 名称
 * @return {string} url中的参数的值
 */
const getUrlParam = (name: string) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const search = window.location.search.substr(1)
  const result = search.match(reg)

  if (result != null) {
    return decodeURIComponent(result[2])
  } else {
    return ''
  }
}

const userAgent = navigator.userAgent

/**
 * @description: 判断是否是Android
 * @return {boolean}
 */
const isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1

/**
 * @description: 判断是否是iOS
 * @return {boolean}
 */
const isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

/**
 * @description: 设置页面标题
 * @method setPageTitle
 * @param {string} title - 标题内容
 */
const setPageTitle = (title: string) => {
  document.title = title
  if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
    const i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = function () {
      setTimeout(function () {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
}

/**
 * @description: 生成二维码
 * @method createQrCode
 * @param {string} url - url地址
 * @param {number} w - 二维码的宽度，单位 px
 * @param {number} h - 二维码的高度，单位 px
 * @param {HTMLElement} qrContainer - 包裹生成的二维码的父级元素dom或级元素id
 */
/*const createQrCode = (
  url: string,
  w = 100,
  h = 100,
  qrContainer: HTMLElement | string,
  colorDark = '#000',
  colorLight = '#fff'
) => {
  const screenWidth = window.screen.width
  const QRCode = require('qrcodejs2')
  const qrCode = new QRCode(qrContainer, {
    width: (w * screenWidth) / 750, //图像宽度
    height: (h * screenWidth) / 750, //图像高度
    colorDark: colorDark, // 二维码颜色
    colorLight: colorLight, // 背景色
    correctLevel: QRCode.CorrectLevel.H //容错级别
  })

  qrCode.clear() //清除二维码
  qrCode.makeCode(url) //生成新的二维码
}*/

export {
  dateFormat,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  DOMAIN,
  getUrlParam,
  isAndroid,
  isiOS,
  setPageTitle,
  // createQrCode
}
