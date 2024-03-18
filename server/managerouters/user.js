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
        reject({ ok: 0, msg: "数据库连接失败" });
      } else {
        c.query(
          'SELECT * FROM `user` WHERE user_phone="' + account + '";',
          (err, data) => {
            if (err) {
              console.log(err);
              reject({ code: 500, msg: "数据库链接失败" });
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
              resolve({ code: 200, msg: "查询成功", data: res });
            } else {
              reject({ code: 500, msg: "用户名或密码错误" });
            }
            c.release();
          }
        );
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
        reject({ ok: 0, msg: "数据库连接失败" });
      } else {
        c.query(
          'SELECT * FROM `user` WHERE user_phone="' + account + '";',
          (err, data) => {
            if (err) {
              console.log(err);
              reject({ code: 500, msg: "数据库链接失败" });
            } else if (data.length > 0) {
              resolve({ code: 200, msg: "查询成功", data: data[0] });
            } else {
              reject({ code: 500, msg: "用户名或密码错误" });
            }
            c.release();
          }
        );
      }
    });
  });
}

module.exports = {
  getUser,
  getPermissions,
};
