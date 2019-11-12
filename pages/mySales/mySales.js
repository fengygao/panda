// pages/mine/mine.js
import {
  Api
} from "../../services/Api.js"
let UserApi = new Api()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: null,//日期
    salelist: [
     
    ],
  },
  // 时间处理
  timehandTap2: function (symbol) {
    symbol = symbol || '-';
    let date = new Date();
    console.log(date)
    let year = date.getFullYear();
    let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return year + symbol + month + symbol + day;
  },
  // 时间筛选
  bindDateChange: function (e) {
    let date = e.detail.value
    console.log('入职时间为', date)
    this.setData({
      date: date,
    })
    let obj = wx.getStorageSync("resdata")
    let data = {
      "version": "1.0",
      "timestamp": 123456,
      "sign": "46b9a27dabb9f3392fff1cd127e5b2a0",
      "params": {
        "saleYmd": this.data.date,
        "contNo": obj.contNo,
        "mallId": obj.mallId
      }
    }
    UserApi.saleList(data, (res) => {
      console.log(res)
      // let arr = []
      if (res.code == "0") {
        //   arr = JSON.parse(res.data)
        this.setData({
          salelist: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let obj = wx.getStorageSync("resdata")
    let timesaa = this.timehandTap2("-")
    this.setData({
      date: timesaa,
    })
    let data = {
      "version": "1.0",
      "timestamp": 123456,
      "sign": "46b9a27dabb9f3392fff1cd127e5b2a0",
      "params": {
        "saleYmd": timesaa,
        "contNo": obj.contNo,
        "mallId": obj.mallId
      }
    }
    UserApi.saleList(data, (res) => {
      console.log(res)
      // let arr = []
      if (res.code == "0") {
        //   arr = JSON.parse(res.data)
        this.setData({
          salelist: res.data
        })
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})