const HOST = 'http://127.0.0.1:3000'
// console.log(process.env)
const api = {
  baseUrl: `${HOST}`,
  isprod: false,
  HOST,
  loginType: '2' // 1-验证码登录 2-密码登录
}

export default api