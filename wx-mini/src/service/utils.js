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

export default {
  jump
}