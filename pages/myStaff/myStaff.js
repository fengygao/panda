// pages/myStaff/myStaff.js
import {
  Api
} from "../../services/Api.js"
let UserApi = new Api()
const app = getApp()
var util = require('../../utils/md5.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stafflist: null,
    clerkRole:''
  },
  staffDetail: function (e) {
    console.log(e.currentTarget.dataset.index)
    var index = parseInt(e.currentTarget.dataset.index);
    
    wx.navigateTo({
      url: '/pages/staffItem/staffItem?index='+index,
    })
  },
  go_update() {
    console.log('我更新啦')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
   
    if (wx.getStorageSync("resdata")) {
      let obj = wx.getStorageSync("resdata")
      console.log(obj)
      this.setData({
        clerkRole: obj.clerkRole
      })

      // 当前时间戳
      let timestamp = Date.parse(new Date());
      //md5加密sign
      let sign = util.hexMD5(timestamp + 'REEST2A72F53B39C');
      
      let data = {
        "version": app.globalData.version,
        "timestamp": timestamp,
        "sign": sign,
        "params": {
          "clerkOpenId": obj.clerkOpenId
        }
      }
      UserApi.mystaff(data, (res) => {

        let arr = []
        if (res.code == "0") {
          arr = JSON.parse(res.data)
          console.log(arr)
          this.setData({
            stafflist: arr
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})