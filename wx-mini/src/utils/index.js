import CryptoJS from "crypto-js"

/**
 * @description 格式化文件大小， B转KB, MB ……
 * @param {String | Number} size
 * @returns {String} 格式化后的文件大小
 */
function formatSize(size) {
  if (size == null || size == "") {
    return "0 B"
  }
  let unitArr = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  let index = 0
  let srcsize = parseFloat(size)
  index = Math.floor(Math.log(srcsize) / Math.log(1024))
  size = srcsize / Math.pow(1024, index)
  size = size.toFixed(2)
  return size + unitArr[index]
}

/**
 * @description 文件类型校验
 * @param {String} str 文件后缀名/文件名
 * @returns {String} String
 */
function checkType(str) {
  let ext = str.split(".").at(-1)
  const imageList = ["png", "jpg", "jpeg", "bmp", "gif", "webp"]
  const videoList = ["mp4", "m2v", "mkv"]
  const radioList = ["mp3", "wav", "wmv"]
  const compressList = ["zip", "rar", "7z"]
  const wordList = ["doc", "docx"]
  const excelList = ["xls", "xlsx"]
  const pptList = ["ppt", "pptx"]
  const pdfList = ["pdf"]
  const txtList = ["txt"]
  const exeList = ["exe"]
  if (imageList.includes(ext)) return "image"
  else if (videoList.includes(ext)) return "video"
  else if (radioList.includes(ext)) return "radio"
  else if (compressList.includes(ext)) return "compress"
  else if (wordList.includes(ext)) return "word"
  else if (excelList.includes(ext)) return "excel"
  else if (pptList.includes(ext)) return "ppt"
  else if (pdfList.includes(ext)) return "pdf"
  else if (txtList.includes(ext)) return "txt"
  else if (exeList.includes(ext)) return "exe"
  else return "other"
}

// ------------AES-------------

function getAesString(data, key, iv) {
  // 加密
  let keys = CryptoJS.enc.Utf8.parse(key)
  let vis = CryptoJS.enc.Utf8.parse(iv)
  let encrypt = CryptoJS.AES.encrypt(data, keys, {
    iv: vis,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7 // padding处理
  })
  return encrypt.toString() // 加密完成后，转换成字符串
}

function getDAesString(encrypted, key, iv) {
  // 解密
  key = CryptoJS.enc.Utf8.parse(key)
  iv = CryptoJS.enc.Utf8.parse(iv)
  let decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

// AES 对称秘钥加密
const aes = {
  en: (data, key) => getAesString(data, key.key, key.iv),
  de: (data, key) => getDAesString(data, key.key, key.iv)
}

export { formatSize, checkType, aes }
