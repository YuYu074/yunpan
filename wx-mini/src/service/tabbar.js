import mpx from '@mpxjs/core'
import { useSetupStore } from '@/store'
const store = useSetupStore()

function get () {
  let tabbarData = {
    title: 'tabbar',
    list: [
      {
        text: '首页',
        pagePath: '/pages/tabbar/tabbar1',
        iconPath: '../asset/img/tabBars/tab_icon_index_normal@2x.png',
        selectedIconPath: '../asset/img/tabBars/tab_icon_index_selected@2x.png'
      },
      {
        text: '文件',
        pagePath: '/pages/tabbar/tabbar2',
        iconPath: '../asset/img/tabBars/tab_icon_file_normal@2x.png',
        selectedIconPath: '../asset/img/tabBars/tab_icon_file_selected@2x.png'
      },
      {
        text: '会员',
        pagePath: '/pages/tabbar/tabbar3',
        iconPath: '../asset/img/tabBars/tab_icon_vip_normal@2x.png',
        selectedIconPath: '../asset/img/tabBars/tab_icon_vip_selected@2x.png'
      },
      {
        text: '我的',
        pagePath: '/pages/tabbar/tabbar4',
        iconPath: '../asset/img/tabBars/tab_icon_user_normal@2x.png',
        selectedIconPath: '../asset/img/tabBars/tab_icon_user_selected@2x.png'
      }
    ]
  }
  mpx.setStorageSync('tabbarData', tabbarData)
  return tabbarData
}

function init () {
  let tabbarData = get()
  let msg = ''
  if (msg) {
    mpx.showModal({
      title: '提示',
      content: msg,
      showCancel: false,
      success (e) {
        if (e.confirm) { }
      }
    })
  } else {
    jump(tabbarData.list[0].pagePath)
  }
  return msg
}


function jump (pagePath) {
  let tabbarData = get()
  let index = tabbarData.list.findIndex((item) => item.pagePath === pagePath)
  let msg = ''
  if (index < 0) {
    msg = `对不起，没有你要跳转的tabbar菜单：${pagePath}`
  }
  if (msg) {
    mpx.showModal({
      title: '提示',
      content: msg,
      showCancel: false,
      success (e) {
        if (e.confirm) { }
      }
    })
  } else {
    mpx.switchTab({
      url: pagePath
    })
    store.setTabbarIndex(index)
  }
}

export default {
  get,
  init,
  jump
}
