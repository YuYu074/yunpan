import { basePermissions } from '@/settings'
import api from '@/api'

function transform(org, cur) {
  org.forEach((item) => {
    if (cur.some((i) => i.function_name == item.name)) item.show = true
    else item.show = false
    if (Array.isArray(item.children)) transform(item.children, cur)
  })
}

export async function getUserInfo(account) {
  const res = await api.getUser(account)
  const { id, username, profile, roles, currentRole } = res.data || {}
  return {
    id,
    username,
    avatar: profile?.avatar,
    nickName: profile?.nickName,
    gender: profile?.gender,
    address: profile?.address,
    email: profile?.email,
    roles,
    currentRole,
  }
}

export async function getPermissions(account) {
  const res = await api.getRolePermissions(account)
  transform(basePermissions, res.data)
  const myInfo = [
    {
      id: 8,
      name: '个人资料',
      code: 'UserProfile',
      type: 'MENU',
      parentId: null,
      path: '/profile',
      redirect: null,
      icon: 'i-fe:user',
      component: '/src/views/profile/index.vue',
      layout: null,
      keepAlive: null,
      method: null,
      description: null,
      show: false,
      enable: true,
      order: 99,
    },
  ]
  // return basePermissions
  return basePermissions.concat(myInfo)
}
