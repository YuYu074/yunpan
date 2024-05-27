const express = require("express");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql");
const Multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require('./routers')
const managerouter = require('./managerouters')

const server = express();
server.use(cors()); // 使用cors中间件解决跨域问题
//拦截所有的请求，对post请求做出处理，把参数存在req.body中
//extended:false 方法内部使用querysyring模块处理请求参数的格式
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
const loginRouter = express.Router();

server.listen(3000, () => {
  console.log("服务器端启动成功, 端口号为3000");
});
server.use(Multer({ dest: "./allFiles" }).any());
// 准备一个 token 验证的中间件
// app.use(function (req, res, next) {
//   // req.url 表示当前地址
//   const { url, headers: { authorization: token } } = req
//   // const url = req.url
//   // const { authorization: token } = req.headers
//   // const token = req.headers.authorization

//   // 不需要验证的 请求地址
//   if (url === '/login' || url === '/banner') return next()

//   // 来到这里表示需要 token 验证
//   if (!token) return res.send({ message: '请携带 token 请求', code: 0 })

//   jwt.verify(token, 'Josiah', (err, data) => {
//     if (err && err.message === 'invalid token') return res.send({ message: '无效 token', code: 0 })

//     if (err && err.message === 'jwt expired') return res.send({ message: 'token 失效', code: 0 })

//     next()
//   })
// })
server.use("/login", loginRouter);
server.use(router)
server.use(managerouter)

//测试
loginRouter.use("/test", (req, res) => {
  console.log(req.body);
  const Pool = mysql.createPool({
    host: "47.120.31.22",
    user: "yuyang",
    password: "Yuyang000@",
    database: "yunpan",
  });
  Pool.getConnection((err, c) => {
    if (err) {
      console.log(err);
      res.send({ ok: 0, msg: "数据库连接失败" });
    } else {
      res.send({ code: 200, msg: req.body.message });
    }
  });
});
