/* 数据操作模块，只负责处理数据，不关心业务 */
const mysql = require('mysql')
const Pool = mysql.createPool({
  host: "47.120.37.146",
  user: "yuyang",
  password: "Yuyang000@",
  database: "yunpanManage",
});

/**
 * @description getPriceData
 * @param {String} vip_name
 * @returns {Promise} Promise
 */
function getPriceData(vip_name) {
  return new Promise((resolve, reject) => {
    Pool.getConnection((err, c) => {
      if (err) {
        reject({ 'code': 500, 'message': "数据库连接失败" });
      } else {
        c.query('SELECT * FROM `viptab` WHERE vip_name="' + vip_name + '";',(err,data)=>{
          if(err){
            reject({'code': 500,'message':'数据库连接失败'});
          }else{
            resolve({'code': 200,'message':'查询成功','data':data[0]});
          }
          c.release();
        });
      }
    });
  })
}

/**
 * @description getAllVip
 * @returns {Promise} Promise
 */
function getAllVip() {
  return new Promise((resolve, reject) => {
    Pool.getConnection((err, c) => {
      if (err) {
        reject({ 'code': 500, 'msg': "数据库连接失败" });
      } else {
        c.query('SELECT * FROM `roles`;',(err,data)=>{
          if(err){
            reject({'code': 500,'msg':'数据库连接失败'});
          }else{
            resolve({'code': 200,'msg':'查询成功','data':data});
          }
          c.release();
        });
      }
    });
  })
}

module.exports = {
  getPriceData,
  getAllVip
}