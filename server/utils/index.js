/**
 * @description 格式化文件大小， B转KB, MB ……
 * @param {String | Number} size 
 * @returns {String} 格式化后的文件大小
 */
function formatSize (size) {
  if (size == null || size == '') {
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

module.exports = {
  formatSize
}