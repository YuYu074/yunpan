import { request } from '@/utils'

export default {
  // 获取用户信息
  getUser: (account) => request.get(`/user/detail?username=${account}`),
  // 刷新token
  refreshToken: () => request.get('/auth/refresh/token'),
  // 登出
  logout: () => request.post('/logout'),
  // 切换当前角色
  switchCurrentRole: (role) => request.post(`/auth/current-role/switch/${role}`),
  // 获取角色权限
  getRolePermissions: (account) => request.get(`/permissions/tree?username=${account}`),
  // 验证菜单路径
  validateMenuPath: (path) => request.get(`/permission/menu/validate?path=${path}`),
}
