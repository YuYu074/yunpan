import { request } from '@/utils'

export default {
  login: (data) => request.post('/login', data, { noNeedToken: true }),
  getUser: (account) => request.get(`/user/detail?username=${account}`),
}
