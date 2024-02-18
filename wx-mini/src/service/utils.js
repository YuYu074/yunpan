// import appJson from '@/app.json'
import { useSetupStore } from '../store'


const jump = function (url, isReLaunch = false) {
  if (url) {
    console.log(url)
    if (isReLaunch) {
      wx.reLaunch({
        url
      })
    } else {
      wx.navigateTo({
        url
      })
    }
  } else {
    console.log('没有url')
  }
}
const fixLength = function (str) {
  if (str) {
    if (str.indexOf('%') > -1 || str.indexOf('px') > -1) {
      return str
    } else {
      return str + 'px'
    }
  } else {
    return ''
  }
}

// 保留n位小数并格式化输出（不足的部分补0
const fomatFloat = function (value, n) {
  // console.log(111111111111)
  value = +value
  var f = Math.round(value * Math.pow(10, n)) / Math.pow(10, n)
  var s = f.toString()
  var rs = s.indexOf('.')
  if (rs < 0) {
    s += '.'
  }
  for (var i = s.length - s.indexOf('.'); i <= n; i++) {
    s += '0'
  }
  if (n === 0) {
    return s.split('.')[0]
  } else {
    return s
  }
}
// 实现千位分隔符
const parseToMoney = num => {
  let [integer, decimal] = String.prototype.split.call(num, '.')
  integer = integer.replace(/\d(?=(\d{3})+$)/g, '$&,')
  return integer + (decimal ? ('.' + decimal) : '')
}

export default {
  jump,
  parseToMoney,
  fomatFloat,
  fixLength
}