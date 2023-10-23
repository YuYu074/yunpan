const HOST = 'http://127.0.0.1:3000'
// console.log(process.env)
const api = {
  flycode: `${HOST}`, // flycode 接口前缀
  isprod: false, // HOST === 'https://smart100.xtion.net/',
  HOST,
  HOST_CHARTS,
  loginType: '2', // 1-验证码登录 2-密码登录
}

export default api
