/* 数据操作模块，只负责处理数据，不关心业务 */
const mysql = require('mysql')
const fs = require('fs');
const path = require('path');

const Pool = mysql.createPool({
  host: "47.120.37.146",
  user: "yuyang",
  password: "Yuyang000@",
  database: "yunpanManage",
});

/**
 * @description fileUpload
 * @param {Object} files
 * @param {String} userid
 * @returns {Promise} Promise
 */
function fileUpload(files, userid) {
  return new Promise((resolve, reject) => {
    let newName = files.path + path.parse(files.originalname).ext;
    let hashName = files.filename + path.parse(files.originalname).ext;
    let thisTime = new Date().toLocaleDateString()+' '+new Date().toLocaleTimeString();
    fs.rename(files.path, newName ,(err)=>{
      if(err){
        reject({ 'code': 500, 'message': "文件资源存在问题，无法上传" });
      }else{
        Pool.getConnection((err, c) => {
          if (err) {
            reject({ 'code': 500, 'message': "数据库连接失败" });
          } else {
            // 查询是否有同名文件
            c.query('SELECT user_name FROM `user` WHERE id="' + userid + '";', (err, data)=>{
              console.log(err);
              !err && c.query('SELECT * FROM `' + data[0].user_name + '` WHERE file_name="' + files.originalname + '";', (err2, data2)=>{
                if(data2.length > 0) {
                  console.log(data2);
                  let namearr = files.originalname.split('.')
                  namearr[namearr.length - 2] = `${namearr[namearr.length - 2]}(${data2.length})`
                  files.showName = namearr.join('.')
                } else {
                  files.showName = files.originalname
                }
                //写入数据库
                let inputSql1 = `INSERT INTO \`${data[0].user_name}\` (file_name, hash_name, show_name, last_time, type, size, download) VALUES ("${files.originalname}", "${hashName}", "${files.showName}", "${thisTime}", "${files.type}", "${files.size}", "0");`
                let inputSql2 = `INSERT INTO \`allfiles\` (user_id, file_name, hash_name, show_name, last_time, type, size, download) VALUES ("${userid}", "${files.originalname}", "${hashName}", "${files.showName}", "${thisTime}", "${files.type}", "${files.size}", "0");`
                c.query(inputSql1, (err3, data3)=>{
                  if(err) {
                    reject({ 'code': 500, 'message': "数据库连接失败" });
                  } else {
                    c.query(inputSql2, (err4, data4)=>{
                      if(err) {
                        reject({ 'code': 500, 'message': "数据库连接失败" });
                      } else {
                        resolve({'code': 200,'message':'上传成功！'})
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
 * @param {String} type ''-全部 1-视频 2-图片 3-文档 4-音乐
 * @param {String} sort ''-默认(名称) 1-时间升序 2-时间降序 3-文件大小升序 4-文件大小降序
 * @returns {Promise} Promise
 */
function getFileList(key, userid, type, sort) {
  const typeArr = ['', 'video', 'image', 'document', 'radio']
  return new Promise((resolve, reject) => {
    console.log(key, userid);
    Pool.getConnection((err, c)=>{
      if(err) {
        reject({ 'code': 500, 'message': "数据库连接失败" });
      } else {
        c.query('SELECT user_name FROM `user` WHERE id="' + userid + '";', (err, data)=>{
          console.log(data[0].user_name);
          !err & c.query('SELECT * FROM `' + data[0].user_name + '`;', (err2, data2)=>{
            if(err) {
              reject({ 'code': 500, 'message': "数据库连接失败" });
            } else {
              let result = [...data2]
              // 按类型筛选
              if(type) {
                result = data2.filter(i => {
                  if(type == 3) {
                    return ['word', 'excel', 'ppt', 'pdf', 'txt'].includes(i.type)
                  }else{
                    return typeArr[+type] == i.type
                  }
                })
              }
              // 按规则排序
              if(sort) {
                sort == 1 && result.sort((a, b) => {
                  let atime = new Date(a.last_time).getTime()
                  let btime = new Date(b.last_time).getTime()
                  return atime - btime
                });
                sort == 2 && result.sort((a, b) => {
                  let atime = new Date(a.last_time).getTime()
                  let btime = new Date(b.last_time).getTime()
                  return btime - atime
                });
                sort == 3 && result.sort((a, b) => +a.size - +b.size);
                sort == 4 && result.sort((a, b) => +b.size - +a.size);
              } else {
                result.sort((a, b) => {
                  if (a.file_name < b.file_name) {
                    return -1;
                  }
                  if (a.file_name > b.file_name) {
                    return 1;
                  }
                  return 0;
                })
              }
              resolve({'code': 200,'message':'查询成功!','data':result})
            }
          })
        })
        c.release();
      }
    })
  })
}

/**
 * @description getLastFileList
 * @param {String} userid
 * @returns {Promise} Promise
 */
function getLastFileList(userid) {
  return new Promise((resolve, reject) => {
    Pool.getConnection((err, c)=>{
      if(err) {
        reject({ 'code': 500, 'message': "数据库连接失败" });
      } else {
        c.query('SELECT user_name FROM `user` WHERE id="' + userid + '";', (err, data)=>{
          !err & c.query('SELECT * FROM `' + data[0].user_name + '`;', (err2, data2)=>{
            if(err) {
              reject({ 'code': 500, 'message': "数据库连接失败" });
            } else {
              // 按时间降序并取前10
                data2.sort((a, b) => {
                  let atime = new Date(a.last_time).getTime()
                  let btime = new Date(b.last_time).getTime()
                  return btime - atime
                })
                if(data2.length > 10) data2.splice(10)
              resolve({'code': 200,'message':'查询成功!','data':data2})
            }
          })
        })
        c.release();
      }
    })
  })
}

// /**
//  * @description downFile
//  * @param {String} userid
//  * @returns {Promise} Promise
//  */
// function downFile(userid, id) {
//   return new Promise((resolve, reject) => {
//     Pool.getConnection((err, c)=>{
//       if(err) {
//         reject({ 'code': 500, 'message': "数据库连接失败" });
//       } else {
//         c.query('SELECT user_name FROM `user` WHERE id="' + userid + '";', (err, data)=>{
//         !err & c.query('SELECT * FROM `' + data[0].user_name + '` WHERE id=' + id + ';', (err2, data2)=>{
//             if(err) {
//               reject({ 'code': 500, 'message': "数据库连接失败" });
//             } else {
//               let {file_name:name, hash_name:hashname} = data2[0];// 待下载的文件名
//               console.log(__dirname);
//               let dirname = __dirname.replace('\\routers','')
//               let path = dirname + "/allFiles/" + hashname;// 待下载文件的路径
//               resolve({'code': 200,'message':'查询成功!','path':path,'name':name,'hash_name':hashname})
//             }
//           })
//         })
//         c.release();
//       }
//     })
//   })
// }

module.exports = {
  fileUpload,
  getFileList,
  getLastFileList
}