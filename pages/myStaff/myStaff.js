// pages/myStaff/myStaff.js
import {
  Api
} from "../../services/Api.js"
let UserApi = new Api()
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
      let data = {
        "version": "1.0",
        "timestamp": 123456,
        "sign": "46b9a27dabb9f3392fff1cd127e5b2a0",
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