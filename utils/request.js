import {
  config
} from './config.js'


class request {
  constructor() {
    this.API_URL = config.url;   //调用config的接口
  }
  Get(url, params, responseType) {
    // var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : [];
    return new Promise(function (resolve, reject) {
      wx.request({
        url: config.url + url,
        data: params,
        method: 'GET',
        responseType: responseType ? responseType : "",
        header: {
          'Content-Type': 'application/json',
          
        },
        success: res => {
          resolve(res.data);
          console.log(res)
          // if (res.data.statusCodes == '200') {
          //   wx.reLaunch({
              // url: '/pages/index/index?txt=' + res.data.infoMap.reason
            // })
          // }
        },
        fail: res => {
          wx.showToast({
            title: '请求异常,请稍后重试',
            icon: '',
            duration: 2000
          })
          reject(res.data)
          return
  
        }
      })
    });
  }

  Post(url, params, header) {
    // var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : [];
    return new Promise(function (resolve, reject) {
      wx.request({
        url: config.url + url,
        data: params,
        method: 'POST',
        header: {
            'Content-Type': 'application/json',        
        },
        success: res => {
          console.log(res)
          // if (res.data.statusCodes == '200') {
            // wx.reLaunch({
              // url: '/pages/index/index?txt=' + res.data.infoMap.reason
            // })
          // }
          resolve(res.data);
        },
        fail: res => {
          wx.showToast({
            title: '请求异常,请稍后重试',
            icon: '',
            duration: 2000
          })
          reject(res.data)
          return
        
        }
      })
    });
  }
}


export {
  request
}

