/* 数据操作模块，只负责处理数据，不关心业务 */
const mysql = require('mysql')
const Pool = mysql.createPool({
  host: "47.120.37.146",
  user: "yuyang",
  password: "Yuyang000@",
  database: "yunpan",
});

/**
 * @description Query user storage space
 * @param {String} userid
 * @returns {Promise} Promise
 */
function getAllVip() {
  return new Promise((resolve, reject) => {
    Pool.getConnection((err, c) => {
      if (err) {
        reject({ 'code': 500, 'msg': "数据库连接失败" });
      } else {
        c.query('SELECT * FROM `viptab`;',(err,data)=>{
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

/**
 * @description Query user storage space
 * @param {String} userid
 * @returns {Promise} Promise
 */
function getAllSpace(userid) {
  return new Promise((resolve, reject) => {
    Pool.getConnection((err, c) => {
      if (err) {
        reject({ 'code': 500, 'msg': "数据库连接失败" });
      } else {
        c.query('SELECT vip_id, used_space FROM `user` WHERE id="' + userid + '";',(err,data)=>{
          if(err){
            reject({'code': 500,'msg':'数据库连接失败'});
          }else{
            c.query('SELECT vip_space FROM `viptab` WHERE id="' + data[0].vip_id + '";',(err2,data2)=>{
              if(err){
                reject({'code': 500,'msg':'数据库连接失败'});
              }else{
                resolve({'code': 200,'msg':'查询成功','data':{...data[0], ...data2[0]}});
              }
            })
          }
          c.release();
        });
      }
    });
  })
}

/**
 * @description getPriceData
 * @param {String} vip_name
 * @returns {Promise} Promise
 */
function getPriceData(vip_name) {
  return new Promise((resolve, reject) => {
    Pool.getConnection((err, c) => {
      if (err) {
        reject({ 'code': 500, 'msg': "数据库连接失败" });
      } else {
        c.query('SELECT * FROM `viptab` WHERE vip_name="' + vip_name + '";',(err,data)=>{
          if(err){
            reject({'code': 500,'msg':'数据库连接失败'});
          }else{
            resolve({'code': 200,'msg':'查询成功','data':data[0]});
          }
          c.release();
        });
      }
    });
  })
}

module.exports = {
  getAllSpace,
  getPriceData,
  getAllVip
}