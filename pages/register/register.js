// pages/register/register.js
const app = getApp()
var util = require('../../utils/md5.js')
import {
  Api
} from "../../services/Api.js"
let UserApi = new Api()
Page({

  /**
   * 页面的初始数据
   */
  data: {},
  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    // wx.switchTab({
    //   url: '../../pages/home/home',
    // })
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
    
    wx.login({
      success(res) {
        // console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId 

        // 当前时间戳
        let timestamp = Date.parse(new Date());
        //md5加密sign
        let sign = util.hexMD5(timestamp + 'REEST2A72F53B39C');

        let data = {
          "version": app.globalData.version,
          "timestamp": timestamp,
          "sign": sign,
          "params": {
            "code": res.code
          }
        }
        // UserApi.getOpenid(data, (res) => {
        //   console.log(res)
        // })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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