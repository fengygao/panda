// pages/mine/mine.js
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
    // 当前时间戳
    let timestamp = Date.parse(new Date());
    //md5加密sign
    let sign = util.hexMD5(timestamp + 'REEST2A72F53B39C');

    let obj = wx.getStorageSync("resdata")
    let data = {
      "version": app.globalData.version,
      "timestamp": timestamp,
      "sign": sign,
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
    // 当前时间戳
    let timestamp = Date.parse(new Date());
    //md5加密sign
    let sign = util.hexMD5(timestamp + 'REEST2A72F53B39C');
    
    let data = {
      "version": app.globalData.version,
      "timestamp": timestamp,
      "sign": sign,
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
        console.log(res.data)
        // const years = res.data.saleYmd.slice(0, 4);
        // const month = res.data.saleYmd.slice(4, 6);
        // const day = res.data.saleYmd.slice(6, 8);
        // const saledata = years + '-' + month + '-' + day
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
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