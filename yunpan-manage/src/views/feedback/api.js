import { request } from '@/utils'

export default {
  getAllFeedback: (params = {}) => request.post('/getAllFeedback', params),
  update: (params = {}) => request.post(`/updateFeedback`, params),
}
