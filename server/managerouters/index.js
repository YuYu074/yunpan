const express = require("express");
const fs = require("fs");

const managerouter = express.Router();
const { login } = require("./login");
const { getPriceData, getAllVip } = require("./vip");
const { fileUpload, getFileList, getLastFileList } = require("./file");
const { addFeedback, getFeedback } = require("./feedback");
const {
  getUser,
  getPermissions,
  getAllUser,
  addUser,
  updateStatus,
  updateVip,
  resetPwd,
  deleteUser,
} = require("./user");

managerouter
  .post("/manage/login", (req, res) => {
    const { username: account, password } = req.body;
    login(account, password).then(
      (user) => res.status(200).send(user),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/logout", (req, res) => {
    res.status(200).send({
      code: 0,
      message: "OK",
      data: true,
      originUrl: "/auth/logout",
    });
  })
  .get("/manage/user/detail", (req, res) => {
    const { username: account } = req.query;
    getUser(account).then(
      (user) => res.status(200).send(user),
      (err) => res.status(500).send(err)
    );
  })
  .get("/manage/permissions/tree", (req, res) => {
    const { username: account } = req.query;
    getPermissions(account).then(
      (user) => res.status(200).send(user),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/fileUpload", (req, res) => {
    const files = {
      ...req.files[0],
      originalname: req.body.name || req.files.originalname,
      type: req.body.type || "other",
    };
    const { id: userid } = req.body;
    fileUpload(files, userid).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/getFileList", (req, res) => {
    const { userid, key, type, sort } = req.body;
    getFileList(key, userid, type, sort).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/getLastFileList", (req, res) => {
    const { userid } = req.body;
    getLastFileList(userid).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .get("/manage/downFile/:name", (req, res) => {
    const { name } = req.params;
    let dirname = __dirname.replace("\\routers", "");
    let path = dirname + "/allFiles/" + name; // 待下载文件的路径
    var f = fs.createReadStream(path);
    res.writeHead(200, {
      "Content-Type": "application/force-download",
      "Content-Disposition": "attachment; filename=" + name,
    });
    f.pipe(res);
  })
  .post("/manage/getPriceData", (req, res) => {
    const { vip_name } = req.body;
    getPriceData(vip_name).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/addFeedback", (req, res) => {
    const { userid, content } = req.body;
    addFeedback(userid, content).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/getFeedback", (req, res) => {
    const { userid } = req.body;
    getFeedback(userid).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/manageuser/read", (req, res) => {
    getAllUser(req.body).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/manageuser/created", (req, res) => {
    addUser(req.body).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/getmanageAllVip", (req, res) => {
    getAllVip().then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/manageuser/updateStatus", (req, res) => {
    const { id, status } = req.body;
    updateStatus(id, status).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/manageuser/update", (req, res) => {
    updateVip(req.body).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/manageuser/reset", (req, res) => {
    const { id } = req.body;
    resetPwd(id).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/manageuser/delete", (req, res) => {
    const { id } = req.body;
    deleteUser(id).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  });

module.exports = managerouter;
