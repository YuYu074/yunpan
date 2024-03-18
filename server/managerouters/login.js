/* 数据操作模块，只负责处理数据，不关心业务 */
const mysql = require('mysql')
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
        reject({ ok: 0, msg: "数据库连接失败" });
      } else {
        c.query('SELECT * FROM `user` WHERE user_phone="' + account + '" AND user_password="' + password + '";',(err,data)=>{
          if(err){
            console.log(err);
            reject({'code': 500,'msg':'数据库链接失败'});
          }else if(data.length > 0){
            resolve({'code': 200,'msg':'登录成功','data':data[0]});
          }else{
            reject({'code': 500,'msg':'用户名或密码错误'});
          }
          c.release();
        });
      }
    });
  })
}

/**
 * @description get student by name
 * @param {String} name
 * @returns {Promise} Promise
 */
function findByName(name) {
  return new Promise((resolve, reject) => {
    const sql = 'select * from student where name like' + '"%' + name + '%"'
    connection.query(sql, (err, res) => err ? reject(err.message) : resolve(res))
  })
}

/**
 * @description add a student and save in database
 * @param {Object} student
 * @returns {Promise} Promise
 */
function save(student) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO student (name,regNum,major) VALUES(?,?,?)'
    const { name, regNum, major } = student
    connection.query(sql, [name, regNum, major], (err, res) => err ? reject(err.message) : resolve(res))
  })
}

/**
 * @description update student and save in database
 * @param {Object} student
 * @returns {Promise} Promise
 */
function update(student) {
  return new Promise((resolve, reject) => {
    const { regNum, homeworkScore, finalDesignScore, absence, isEliteMenber } = student
    const sql = 'UPDATE student SET homeworkScore = ?,finalDesignScore = ?,absence = ?,isEliteMenber = ? WHERE regNum =' + regNum
    connection.query(sql, [homeworkScore, finalDesignScore, absence, isEliteMenber], (err, res) => err ? reject(err) : resolve(res))
  })
}

/**
 * @description delete a student and save in database
 * @param {Number} id
 * @returns {Promise} Promise
 */
function deleteById(regNum) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM student WHERE regNum =' + regNum
    connection.query(sql, (err, res) => err ? reject(err) : resolve(res))
  })
}

module.exports = {
  login,
  findByName,
  save,
  update,
  deleteById
}
