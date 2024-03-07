import { api } from '@/service'

function checkType (ext) {
  const imageList = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp']
  const videoList = ['mp4', 'm2v', 'mkv']
  const radioList = ['mp3', 'wav', 'wmv']
  const compressList = ['zip', 'rar', '7z']
  const wordList = ['doc', 'docx']
  const excelList = ['xls', 'xlsx']
  const pptList = ['ppt']
  const pdfList = ['pdf']
  const txtList = ['txt']
  const exeList = ['exe']
  if (imageList.includes(ext)) return 'image'
  else if (videoList.includes(ext)) return 'video'
  else if (radioList.includes(ext)) return 'radio'
  else if (compressList.includes(ext)) return 'compress'
  else if (wordList.includes(ext)) return 'word'
  else if (excelList.includes(ext)) return 'excel'
  else if (pptList.includes(ext)) return 'ppt'
  else if (pdfList.includes(ext)) return 'pdf'
  else if (txtList.includes(ext)) return 'txt'
  else if (exeList.includes(ext)) return 'exe'
  else return 'other'
}

function upload () {
  // 调用选择文件接口
  wx.chooseMessageFile({
    count: 9, // 文件数量
    type: 'file',
    success (res) {
      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFiles
      console.log('选择', res)
      console.log(tempFilePaths)
      tempFilePaths.forEach(i => {
        console.log(i)
        const uploadTask = wx.uploadFile({ // 调用上传文件接口
          url: api.baseUrl + "/fileUpload",
          filePath: i.path,
          name: 'file',
          method: "post",
          header: {
            "content-type": "multipart/form-data",
            "Authorization": wx.getStorageSync("token")
          },
          formData: {
            'name': i.name,
            'type': checkType(i.name.split('.').at(-1)),
            'id': wx.getStorageSync('user').id
          },
          success (res) {
            console.log(res)
            // 上传成功后的一些操作
            wx.hideLoading()
          }
        })
        console.log(uploadTask)

        uploadTask.onProgressUpdate((res) => {
          console.log('上传进度', res.progress)
          console.log('已经上传的数据长度', res.totalBytesSent)
          console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
        })
      })
    }
  })
}

export default upload