/* 数据操作模块，只负责处理数据，不关心业务 */
const mysql = require("mysql");
const Pool = mysql.createPool({
  host: "47.120.37.146",
  user: "yuyang",
  password: "Yuyang000@",
  database: "yunpanManage",
});

/**
 * @description getUser 获取用户信息
 * @param {String} account
 * @param {String} password
 * @returns {Promise} Promise
 */
function getUser(account) {
  return new Promise((resolve, reject) => {
    Pool.getConnection((err, c) => {
      if (err) {
        console.log(err);
        reject({ ok: 0, message: "数据库连接失败" });
      } else {
        c.query(
          'SELECT * FROM `user` WHERE user_phone="' + account + '";',
          (err, data) => {
            if (err) {
              console.log(err);
              reject({ code: 500, message: "数据库链接失败" });
            } else if (data.length > 0) {
              const res = {
                id: data[0].id,
                username: data[0].user_name,
                enable: true,
                createTime: data[0].user_signtime,
                updateTime: data[0].user_signtime,
                profile: {
                  id: data[0].id,
                  nickName: data[0].user_name,
                  avatar:
                    "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
                  email: data[0].email || null,
                  userId: data[0].id,
                },
                roles: [
                  {
                    id: data[0].manage_type,
                    code: "SUPER_ADMIN",
                    name: data[0].manage_name,
                    enable: true,
                  },
                ],
                currentRole: {
                  id: data[0].manage_type,
                  code: "SUPER_ADMIN",
                  name: data[0].manage_name,
                  enable: true,
                },
              };
              resolve({ code: 200, message: "查询成功", data: res });
            } else {
              reject({ code: 500, message: "用户名或密码错误" });
            }
            c.release();
          }
        );
      }
    });
  });
}

function getAllRoles() {
  return new Promise((resolve, reject) => {
    Pool.getConnection((err, c) => {
      if (err) {
        console.log(err);
        reject({ ok: 0, message: "数据库连接失败" });
      } else {
        c.query("SELECT * FROM `roles`", (err, data) => {
          console.log(data);
          if (data) {
            resolve({ code: 200, message: "查询成功", data });
          } else {
            reject({ code: 500, message: "查询失败", err });
          }
          c.release();
        });
      }
    });
  });
}

/**
 * @description getPermissions 获取用户权限
 * @param {String} account
 * @returns {Promise} Promise
 */
function getPermissions(account) {
  return new Promise((resolve, reject) => {
    Pool.getConnection((err, c) => {
      if (err) {
        console.log(err);
        reject({ ok: 0, message: "数据库连接失败" });
      } else {
        c.query(
          'SELECT manage_type FROM `user` WHERE user_phone="' + account + '";',
          (err, data) => {
            console.log(data);
            if (err) {
              reject({ code: 500, message: "数据库链接失败" });
            } else if (data.length > 0) {
              c.query("SELECT * FROM `functions`;", (err2, data2) => {
                let { manage_type } = data[0];
                let res = [];
                if (manage_type == 1) res = data2;
                else if (manage_type == 2) {
                  res = data2.filter((i) => i.role1 == 1);
                } else if (manage_type == 3) {
                  res = data2.filter((i) => i.role2 == 1);
                }
                resolve({ code: 200, message: "查询成功", data: res });
              });
            } else {
              reject({ code: 500, message: "查询失败" });
            }
            c.release();
          }
        );
      }
    });
  });
}

/**
 * @description getAllUser
 * @param {object} params
 * @returns {Promise} Promise
 */
function getAllUser(params) {
  return new Promise((resolve, reject) => {
    Pool.getConnection((err, c) => {
      if (err) {
        reject({ code: 500, message: "数据库连接失败" });
      } else {
        let sql = [];
        if (params.enabel) sql.push(`status=${params.enabel}`);
        if (params.userphone)
          sql.push(`user_phone LIKE '%${params.userphone}%'`);
        if (params.username) sql.push(`user_name LIKE '%${params.username}%'`);
        if (sql.length > 0) {
          sql = sql.join(" AND ");
          sql = " WHERE " + sql;
        }
        c.query("SELECT * FROM `user`" + sql + ";", (err, data) => {
          if (err) {
            reject({ code: 500, message: "查询失败!", message: err.code });
          } else {
            // //data 分页
            // if(params.pageNo && params.pageSize) {

            // }
            resolve({ code: 200, message: "查询成功", data: data });
          }
        });
      }
      c.release();
    });
  });
}

/**
 * @description addUser
 * @param {object} params
 * @returns {Promise} Promise
 */
function addUser(params) {
  return new Promise((resolve, reject) => {
    Pool.getConnection((err, c) => {
      if (err) {
        reject({ code: 500, message: "数据库连接失败" });
      } else {
        c.query(
          `SELECT * FROM \`user\` WHERE user_phone="${params.userphone}" OR user_name="${params.username}";`,
          (err, data) => {
            if (err) {
              console.log(err);
              reject({ code: 500, message: "查询已有用户失败!" });
            } else if (data.length > 0) {
              reject({ code: 500, message: "已有相同手机号或用户名的用户!" });
            } else {
              let nowTime =
                new Date().toLocaleDateString() +
                " " +
                new Date().toLocaleTimeString();
              let vip_name = ["超级管理员", "一级管理员", "二级管理员"][
                +params.roleIds - 1
              ];
              c.query(
                `INSERT INTO \`user\` (user_name, user_signtime, user_phone, user_password, user_key, manage_type, manage_name, status, email, sexy) VALUES ("${
                  params.username
                }", "${nowTime}", "${params.userphone}", "${
                  params.password
                }", "abc", "${+params.roleIds}", "${vip_name}", "1", null, null);`,
                (err2, data2) => {
                  if (err2) {
                    reject({ code: 500, message: "新建用户失败!" });
                  } else {
                    resolve({ code: 200, message: "新建用户成功" });
                  }
                }
              );
            }
          }
        );
      }
      c.release();
    });
  });
}

/**
 * @description updateStatus
 * @param {string} id
 * @param {number} status 0-停用 1-启用
 * @returns {Promise} Promise
 */
function updateStatus(id, status) {
  return new Promise((resolve, reject) => {
    Pool.getConnection((err, c) => {
      if (err) {
        reject({ code: 500, message: "数据库连接失败" });
      } else {
        c.query(
          `UPDATE \`user\` SET status="${status}" WHERE id="${id}";`,
          (err, data) => {
            if (err) {
              console.log(err);
              reject({ code: 500, message: "修改状态失败!" });
            } else {
              resolve({ code: 200, message: "修改状态成功" });
            }
          }
        );
      }
      c.release();
    });
  });
}

/**
 * @description updateVip
 * @param {object} params
 * @returns {Promise} Promise
 */
function updateVip(params) {
  return new Promise((resolve, reject) => {
    Pool.getConnection((err, c) => {
      if (err) {
        reject({ code: 500, message: "数据库连接失败" });
      } else {
        c.query(
          `SELECT manage_name FROM \`roles\` WHERE id=${params.roleIds};`,
          (err, data) => {
            if (err) {
              reject({ code: 500, message: "修改状态失败!" });
            } else {
              c.query(
                `UPDATE \`user\` SET manage_type="${+params.roleIds}",manage_name="${
                  data[0]?.manage_name
                }" WHERE user_phone="${params.userphone}";`,
                (err2, data2) => {
                  if (err2) {
                    console.log(err2);
                    reject({ code: 500, message: "修改状态失败!" });
                  } else {
                    resolve({ code: 200, message: "修改状态成功" });
                  }
                }
              );
            }
          }
        );
      }
      c.release();
    });
  });
}

/**
 * @description resetPwd
 * @param {string} id
 * @returns {Promise} Promise
 */
function resetPwd(id) {
  return new Promise((resolve, reject) => {
    Pool.getConnection((err, c) => {
      if (err) {
        reject({ code: 500, message: "数据库连接失败" });
      } else {
        c.query(
          `UPDATE \`user\` SET user_password="123456" WHERE id="${id}";`,
          (err, data) => {
            if (err) {
              console.log(err);
              reject({ code: 500, message: "重置密码失败!" });
            } else {
              resolve({ code: 200, message: "重置密码成功" });
            }
          }
        );
      }
      c.release();
    });
  });
}

/**
 * @description deleteUser
 * @param {string} id
 * @returns {Promise} Promise
 */
function deleteUser(id) {
  return new Promise((resolve, reject) => {
    Pool.getConnection((err, c) => {
      if (err) {
        reject({ code: 500, message: "数据库连接失败" });
      } else {
        c.query(`DELETE FROM \`user\` WHERE id="${id}";`, (err, data) => {
          if (err) {
            console.log(err);
            reject({ code: 500, message: "删除用户失败!" });
          } else {
            resolve({ code: 200, message: "删除用户成功" });
          }
        });
      }
      c.release();
    });
  });
}

module.exports = {
  getUser,
  getPermissions,
  getAllRoles,
  getAllUser,
  addUser,
  updateStatus,
  updateVip,
  resetPwd,
  deleteUser,
};
