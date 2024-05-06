import { request } from '@/utils'

export default {
  read: (params = {}) => request.post('/getAllVip', params),
  update: (params = {}) => request.post('/updateVip', params),
}
