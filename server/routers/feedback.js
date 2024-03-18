/* 数据操作模块，只负责处理数据，不关心业务 */
const mysql = require('mysql')
const Pool = mysql.createPool({
  host: "47.120.37.146",
  user: "yuyang",
  password: "Yuyang000@",
  database: "yunpan",
});

/**
 * @description addFeedback
 * @param {String} userid
 * @param {String} content
 * @returns {Promise} Promise
 */
function addFeedback(userid, content) {
  return new Promise((resolve, reject) => {
    Pool.getConnection((err, c) => {
      if (err) {
        console.log(err);
        reject({ ok: 0, msg: "数据库连接失败" });
      } else {
        const thisTime = new Date().toLocaleDateString()+' '+new Date().toLocaleTimeString();
        c.query(`INSERT INTO \`feedback\` (user_id, content, feed_time, status, result) VALUES ("${userid}", "${content}", "${thisTime}", "0", "");`,(err,data)=>{
          if(err){
            console.log(err);
            reject({'code': 500,'msg':'数据库链接失败'});
          }else{
            resolve({'code': 200,'msg':'提交成功'});
          }
          c.release();
        });
      }
    });
  })
}

/**
 * @description getFeedback
 * @param {String} userid
 * @returns {Promise} Promise
 */
function getFeedback(userid) {
  return new Promise((resolve, reject) => {
    Pool.getConnection((err, c) => {
      if (err) {
        console.log(err);
        reject({ ok: 0, msg: "数据库连接失败" });
      } else {
        c.query(`SELECT * FROM \`feedback\` WHERE user_id=${userid};`,(err,data)=>{
          if(err){
            console.log(err);
            reject({'code': 500,'msg':'数据库链接失败'});
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
  addFeedback,
  getFeedback
}
