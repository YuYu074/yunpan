import { request } from '@/utils'

export default {
  create: (data) => request.post('/user/created', data),
  update: (params = {}) => request.post('/user/update', params),
  updateStatus: (params = {}) => request.post('/user/updateStatus', params),
  delete: (params = {}) => request.post('/user/delete', params),
  resetPwd: (params = {}) => request.post(`/user/reset`, params),
  getAllVip: () => request.post(`/getAllVip`),
  managecreate: (data) => request.post('/manageuser/created', data),
  manageread: (params = {}) => request.post('/manageuser/read', params),
  manageupdate: (params = {}) => request.post('/manageuser/update', params),
  manageupdateStatus: (params = {}) => request.post('/manageuser/updateStatus', params),
  managedelete: (params = {}) => request.post('/manageuser/delete', params),
  manageresetPwd: (params = {}) => request.post(`/manageuser/reset`, params),
  managegetAllVip: () => request.post(`/getmanageAllVip`),
  // ---------------
  read: (params = {}) => request.post('/permissions/allRoles', params),
  // 获取角色权限
  getRolePermissions: (account) => request.get(`/permissions/tree?username=${account}`),
}
