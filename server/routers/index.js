const express = require('express')
const router = express.Router()
const { login, findByName, save, update, deleteById } = require('./login')
const { getAllSpace, getPriceData } = require('./vip')
const { fileUpload, getFileList, getLastFileList } = require('./file')
router
  .post('/login', (req, res) => {
    const { account, password } = req.body
    login(account, password).then(user => res.status(200).send(user), err => res.status(500).send(err))
  })
  .post('/vip/getAllSpace', (req, res) => {
    const { id:userid } = req.body
    getAllSpace(userid).then(data => res.status(200).send(data), err => res.status(500).send(err))
  })
  .post('/fileUpload', (req, res) => {
    const files = {
      ...req.files[0],
      originalname: req.body.name || req.files.originalname,
      type: req.body.type || 'other'
    }
    const { id:userid } = req.body
    fileUpload(files, userid).then(data => res.status(200).send(data), err => res.status(500).send(err))
  })
  .post('/getFileList', (req, res) => {
    const { userid, key, type, sort } = req.body
    getFileList(key, userid, type, sort).then(data => res.status(200).send(data), err => res.status(500).send(err))
  })
  .post('/getLastFileList', (req, res) => {
    const { userid } = req.body
    getLastFileList(userid).then(data => res.status(200).send(data), err => res.status(500).send(err))
  })
  .post('/getPriceData', (req, res) => {
    const { vip_name } = req.body
    getPriceData(vip_name).then(data => res.status(200).send(data), err => res.status(500).send(err))
  })


  .get('/student/name', (req, res) => {
    const { name } = req.query
    findByName(name).then(student => res.status(200).send(student), err => res.status(500).send(err))
  })

module.exports = router