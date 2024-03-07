/* 数据操作模块，只负责处理数据，不关心业务 */
const mysql = require('mysql')
const fs = require('fs');
const path = require('path');

const Pool = mysql.createPool({
  host: "47.120.37.146",
  user: "yuyang",
  password: "Yuyang000@",
  database: "yunpan",
});

/**
 * @description fileUpload
 * @param {Object} files
 * @param {String} userid
 * @returns {Promise} Promise
 */
function fileUpload(files, userid) {
  console.log(files);
  return new Promise((resolve, reject) => {
    let newName = files.path + path.parse(files.originalname).ext;
    let hashName = files.filename + path.parse(files.originalname).ext;
    let thisTime = new Date().toLocaleDateString()+' '+new Date().toLocaleTimeString();
    console.log(newName, hashName, thisTime);
    fs.rename(files.path, newName ,(err)=>{
      if(err){
        reject({ 'code': 500, 'msg': "文件资源存在问题，无法上传" });
      }else{
        Pool.getConnection((err, c) => {
          if (err) {
            reject({ 'code': 500, 'msg': "数据库连接失败" });
          } else {
            // 查询是否有同名文件
            c.query('SELECT user_name FROM `user` WHERE id="' + userid + '";', (err, data)=>{
              !err && c.query('SELECT * FROM `' + data[0].user_name + '` WHERE file_name="' + files.originalname + '";', (err2, data2)=>{
                if(data2.length > 0) {
                  let namearr = files.originalname.split('.')
                  namearr[namearr.length - 2] = `${namearr[namearr.length - 2]}(${data2.length})`
                  files.showName = namearr.join('.')
                } else {
                  files.showName = files.originalname
                }
                //写入数据库
                let inputSql1 = `INSERT INTO \`${data[0].user_name}\` (file_name, hash_name, show_name, last_time, type, size, download) VALUES ("${files.originalname}", "${hashName}", "${files.showName}", "${thisTime}", "${files.type}", "${files.size}", "0")`
                let inputSql2 = `INSERT INTO \`allfiles\` (user_id, file_name, hash_name, show_name, last_time, type, size, download) VALUES ("${userid}", "${files.originalname}", "${hashName}", "${files.showName}", "${thisTime}", "${files.type}", "${files.size}", "0")`
                c.query(inputSql1, (err3, data3)=>{
                  if(err) {
                    reject({ 'code': 500, 'msg': "数据库连接失败" });
                  } else {
                    c.query(inputSql2, (err4, data4)=>{
                      if(err) {
                        reject({ 'code': 500, 'msg': "数据库连接失败" });
                      } else {
                        resolve({'code': 200,'msg':'上传成功！'})
                      }
                    })
                  }
                })
              })
            })
            c.release();
          }
        });
      }
    })
  })
}
/**
 * @description getFileList
 * @param {String} key
 * @param {String} userid
 * @returns {Promise} Promise
 */
function getFileList(key, userid) {
  return new Promise((resolve, reject) => {
    console.log(key, userid);
    Pool.getConnection((err, c)=>{
      if(err) {
        reject({ 'code': 500, 'msg': "数据库连接失败" });
      } else {
        c.query('SELECT user_name FROM `user` WHERE id="' + userid + '";', (err, data)=>{
          console.log(data[0].user_name);
          !err & c.query('SELECT * FROM `' + data[0].user_name + '`;', (err2, data2)=>{
            if(err) {
              reject({ 'code': 500, 'msg': "数据库连接失败" });
            } else {
              console.log(JSON.stringify(data2));
              resolve({'code': 200,'msg':'查询成功!','data':data2})
            }
          })
        })
      }
    })
  })
}

module.exports = {
  fileUpload,
  getFileList
}