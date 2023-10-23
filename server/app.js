const express = require("express");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql");
const Multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");

const server = express();
server.use(cors()); // 使用cors中间件解决跨域问题
//拦截所有的请求，对post请求做出处理，把参数存在req.body中
//extended:false 方法内部使用querysyring模块处理请求参数的格式
server.use(bodyParser.urlencoded({ extended: false }));
const loginRouter = express.Router();

server.listen(3000, () => {
  console.log("服务器端启动成功, 端口号为3000");
});
server.use(Multer({ dest: "./allFiles" }).any());
server.use("/login", loginRouter);

//下载计数
loginRouter.use("/test", (req, res) => {
  console.log(req.body);
  var Pool = mysql.createPool({
    host: "47.120.37.146",
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
