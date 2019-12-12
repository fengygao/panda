//app.js
// tabBar
// {
//   "pagePath": "pages/management/management",
//   "iconPath": "image/Management1.png",
//   "selectedIconPath": "image/Management2.png",
//   "text": "经营"
// },
import {
  Api
} from "services/Api.js"
let UserApi = new Api()
const app = getApp()
var util = require('/utils/md5.js')

App({
  globalData: {
    version: '1.0',
  },
  onLaunch: function() {
   
    // 展示本地存储能力
    // 更新迭代后强制更新一下
    // const updateManager = wx.getUpdateManager()
    // updateManager.onCheckForUpdate(function(res) {
    //   // 请求完新版本信息的回调
    //   console.log(res.hasUpdate)
    // })
    // updateManager.onUpdateReady(function() {
    //   wx.showModal({
    //     title: '更新提示',
    //     content: '最新版本已就绪，更新之后将会重启',
    //     success: function(res) {
    //       if (res.confirm) {
    //         // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
    //         updateManager.applyUpdate()
    //       }
    //     }
    //   })
    // })
    // updateManager.onUpdateFailed(function() {
    //   // 新的版本下载失败
    //   wx.showModal({
    //     title: '更新提示',
    //     content: '新版本下载失败',
    //     showCancel: false
    //   })
    // })


    //用户登录逻辑
    let _this = this;
      wx.login({
        success(res) {
          // console.log(res)
          // 发送 res.code 到后台换取 openId, sessionKey, unionId 

          // 当前时间戳
          let timestamp = Date.parse(new Date());
          //md5加密sign
          let sign = util.hexMD5(timestamp + 'REEST2A72F53B39C');

          let data = {
            "version": _this.globalData.version,
            "timestamp": timestamp,
            "sign": sign,
            "params": {
              "code": res.code
            }
          }
          UserApi.getOpenid(data, (res) => {
            // console.log(res)
            if (res.code == '0') {         
              wx.setStorageSync('openId', res.data.openid)

              // 当前时间戳
              let timestamp = Date.parse(new Date());
              //md5加密sign
              let sign = util.hexMD5(timestamp + 'REEST2A72F53B39C');

              let data = {
                "version": _this.globalData.version,
                "timestamp": timestamp,
                "sign": sign,
                "params": {
                  "openId": res.data.openid
                }
              }
              UserApi.login(data, (res) => {
                console.log(res)
                if (res.code == "1") {
                  console.log('未绑定')
                  wx.redirectTo({
                    url: '../../pages/login/login',
                  })
                }
                if (res.code == "0") {
                  console.log( '已绑定') 
                  wx.setStorageSync('resdata', res.data)      
                  wx.switchTab({
                    url: '../../pages/home/home',
                  })
                }
              })
            }else{
              wx.showToast({
                title: '服务器异常',
                icon: '',
                duration: 2000
              })
              return
            }
          })
          // wx.getSetting({
          //   success(res) {
          //     if (res.authSetting['scope.userInfo']) {
          //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          //       wx.getUserInfo({
          //         success: function (val) {
          //           console.log(val.userInfo)
          //           wx.setStorageSync('userInfo', val.userInfo)
          //         }
          //       })
          //     }
          //   }
          // })
        }
      })
  },
  onShow: function() {

  },

  // 
  // let pages = getCurrentPages();
  // let currPage = null;
  // if (pages.length) {
  //   currPage = pages[pages.length - 1];
  // }
  // console.log(currPage)
})