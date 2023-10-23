import get from 'lodash-es/get'
import utils from './utils'
import debounce from 'lodash-es/debounce'

let loadingCount = 0


function loadingCountMinus () {
  loadingCount--
  if (loadingCount <= 0) {
    loadingCount = 0
    // console.log('hideLoading')
    wx.hideLoading()
  }
}

const currentPageIsLogin = function () {
  const pages = getCurrentPages()
  const path = pages[pages.length - 1].route
  return path === 'pages/login/login'
}

/**
 * token过期 - 防抖执行函数
 */
const TokenDebounce = debounce(async (errorMsg) => {
  console.log('---执行 防抖---')
  wx.showModal({
    title: '提示',
    content: errorMsg,
    showCancel: false,
    success (e) {
      if (e.confirm) {
        if (!currentPageIsLogin()) {
          console.log('-----跳转------')
          utils.jump('/pages/login/login')
        }
      }
    }
  })
}, 500)


// 封装wx.request方法
async function request ({
  url = '',
  method = 'POST',
  data = {},
  header = {
    'debug': 'true'
  },
  // dataType = 'json',
  responseType = 'text',
  success,
  fail,
  complete,
  isShowLoading = true,
  loadingText = '加载中...',
  isSendToken = true,
  // isCheckToken = false,
  isShowError = true
}) {
  if (isShowLoading) {
    loadingCount++
    wx.showLoading({
      title: loadingText,
      mask: true
    })
  }

  const token = wx.getStorageSync('token')
  if (isSendToken && token) {
    header.token = token
  }

  function fainFn (err, reject) {
    let errorMsg = '网络异常，请稍后重试。'
    wx.hideLoading()
    if (err.data) {
      if (typeof err.data === 'string') {
        errorMsg = err.data
      } else {
        errorMsg = get(err, 'data.error_code', '网络异常，请稍后重试。')
      }
    }
    let tokenOverdue = false
    // if (errorMsg.indexOf('token is invalid(decode).') !== -1 || errorMsg.indexOf('token is invalid(null).') !== -1 || errorMsg === 'token无效，请重新登录') {
    if (err.statusCode === 401) {
      tokenOverdue = true
    }

    if (tokenOverdue) {
      TokenDebounce(errorMsg)
    }

    if (!tokenOverdue && isShowError) {
      wx.showModal({
        title: '提示',
        content: errorMsg,
        showCancel: false,
        success (e) { }
      })
    }
    fail && fail(err)
    reject(err)
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      header: header,
      // dataType: dataType,
      responseType: responseType,
      data: data,
      success (res) {
        if (res.statusCode === 200) {
          success && success(res)
          resolve(res)
        } else {
          fainFn(res, reject)
        }
      },
      fail (err) {
        fainFn(err, reject)
      },
      complete (res) {
        complete && complete(res)
        if (isShowLoading) {
          loadingCountMinus()
        }
      }
    })
  })
}

export default request
