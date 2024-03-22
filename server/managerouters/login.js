/* 数据操作模块，只负责处理数据，不关心业务 */
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const Pool = mysql.createPool({
  host: "47.120.37.146",
  user: "yuyang",
  password: "Yuyang000@",
  database: "yunpanManage",
});

/**
 * @description login by phonenumber and password
 * @param {String} account
 * @param {String} password
 * @returns {Promise} Promise
 */
function login(account, password) {
  return new Promise((resolve, reject) => {
    Pool.getConnection((err, c) => {
      if (err) {
        console.log(err);
        reject({ ok: 0, message: "数据库连接失败" });
      } else {
        c.query('SELECT * FROM `user` WHERE user_phone="' + account + '" AND user_password="' + password + '";',(err,data)=>{
          if(err){
            console.log(err);
            reject({'code': 500,'message':'数据库链接失败'});
          }else if(data.length > 0){
            const res = {
              ...data[0],
              accessToken: jwt.sign({...data[0]}, 'yunpan', {expiresIn: '1h'})
            }
            resolve({'code': 200,'message':'登录成功','data':res});
          }else{
            reject({'code': 500,'message':'用户名或密码错误'});
          }
          c.release();
        });
      }
    });
  })
}

module.exports = {
  login
}
