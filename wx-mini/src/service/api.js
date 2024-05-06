// const HOST = 'http://127.0.0.1:3000'
const HOST = 'http://47.120.37.146:3000'
// const HOST = 'http://192.168.31.76:3000'
// console.log(process.env)
const api = {
  baseUrl: `${HOST}`,
  isprod: false,
  HOST,
  loginType: '2' // 1-验证码登录 2-密码登录
}

export default api
