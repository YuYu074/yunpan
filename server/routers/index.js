const express = require("express");
const fs = require("fs");

const router = express.Router();
const { login } = require("./login");
const { getAllSpace, getPriceData, getAllVip, updateVipOptions } = require("./vip");
const { fileUpload, getFileList, getLastFileList, getDangerFiles, updateDangerFiles } = require("./file");
const { addFeedback, getFeedback, getAllFeedback, updateFeedback } = require("./feedback");
const {
  getAllUser,
  addUser,
  updateStatus,
  updateVip,
  resetPwd,
  deleteUser,
} = require("./user");
router
  .post("/login", (req, res) => {
    const { account, password } = req.body;
    login(account, password).then(
      (user) => res.status(200).send(user),
      (err) => res.status(500).send(err)
    );
  })
  .post("/vip/getAllSpace", (req, res) => {
    const { id: userid } = req.body;
    getAllSpace(userid).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/fileUpload", (req, res) => {
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
  .post("/getFileList", (req, res) => {
    const { userid, key, type, sort } = req.body;
    getFileList(key, userid, type, sort).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/getLastFileList", (req, res) => {
    const { userid } = req.body;
    getLastFileList(userid).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .get("/downFile/:name", (req, res) => {
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
  .post("/getPriceData", (req, res) => {
    const { vip_name } = req.body;
    getPriceData(vip_name).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/addFeedback", (req, res) => {
    const { userid, content } = req.body;
    addFeedback(userid, content).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/getFeedback", (req, res) => {
    const { userid } = req.body;
    getFeedback(userid).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/getAllFeedback", (req, res) => {
    console.log(req.body);
    getAllFeedback(req.body).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    )
  })
  .post("/manage/updateFeedback", (req, res) => {
    updateFeedback(req.body).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    )
  })
  .post("/manage/user/read", (req, res) => {
    getAllUser(req.body).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/user/created", (req, res) => {
    addUser(req.body).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/getAllVip", (req, res) => {
    getAllVip().then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/updateVip", (req, res) => {
    updateVipOptions(req.body).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/user/updateStatus", (req, res) => {
    const { id, status } = req.body;
    updateStatus(id, status).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/user/update", (req, res) => {
    updateVip(req.body).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/user/reset", (req, res) => {
    const { id } = req.body;
    resetPwd(id).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/user/delete", (req, res) => {
    const { id } = req.body;
    deleteUser(id).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/getDangerFiles", (req, res) => {
    getDangerFiles().then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })
  .post("/manage/updateDangerFiles", (req, res) => {
    updateDangerFiles(req.body).then(
      (data) => res.status(200).send(data),
      (err) => res.status(500).send(err)
    );
  })

module.exports = router;
