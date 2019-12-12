// pages/addstaff/addstaff.js
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
    phoneNum:null,//手机号
    staffName:null,//姓名
    index: null,//性别
    identity:null,//身份证
    array: [ '男','女'],
    date: null,//日期
    datestr:null,//日期时间戳
    switch1Checked: true,//录入销售额
    switch2Checked: false,//服务申请
    disabled: false,//提交按钮
  },
  //手机号
  input1: function (e) {   
    let phoneNum = e.detail.value
    if (phoneNum) {
      this.setData({
        phoneNum: phoneNum,      
      })
      console.log('手机号为', e.detail.value)
    }
  },
  //姓名
  input2: function (e) {
    let staffName = e.detail.value
    if (staffName) {
      this.setData({
        staffName: staffName,
      })
      console.log('姓名为', e.detail.value)
    }
  },
  //身份证
  input3: function (e) {
    let identity = e.detail.value
    if (identity) {
      this.setData({
        identity: identity,
      })
      console.log('身份证为', e.detail.value)
    }
  },
// 性别
  bindPickerChange: function(e) {
    console.log('性别为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 入职时间
  bindDateChange: function (e) {    
    let date = e.detail.value
    console.log('入职时间为', date)
    // 入职时间戳
    var timesdate = Date.parse(date);
    timesdate = timesdate / 1000;
    console.log("入职时间戳为：" + timesdate);
    this.setData({
      date: date,
      datestr: timesdate
    })
  },
  // 是否录入
  switch1Change: function (e) {
    console.log('是否录入为', e.detail.value)
    this.setData({
      switch1Checked: e.detail.value
    })
  },
  // 服务申请
  switch2Change: function (e) {
    console.log('服务申请为', e.detail.value)
    this.setData({
      switch2Checked: e.detail.value
    })
  },
  btnsubmit(){   
    if (this.data.phoneNum && this.data.staffName && this.data.index && this.data.identity && this.data.date){
      // 当前时间戳
      let timestamp = Date.parse(new Date());
      //md5加密sign
      let sign = util.hexMD5(timestamp + 'REEST2A72F53B39C');

      let userobj = wx.getStorageSync('resdata')
      let data = {
        "version": app.globalData.version,
        "timestamp": timestamp,
        "sign": sign,
        "params": {
          "id": '',
          "idNo": this.data.identity,
          "clerkOpenId": userobj.clerkOpenId,
          "clerkName": this.data.staffName,
          "contNo": userobj.contNo,
          "clerkStatus": "1",
          "status": "1",
          "clerkRole": '2',
          "bindTel": this.data.phoneNum,
          "entryTime": this.data.datestr + '000',
          "entryTimeStr": this.data.date,
          "isSales": this.data.switch1Checked == true ? '1' : '0',
          "isElecard": this.data.switch2Checked == true ? '1' : '0',
          "isDel": "0",
          "healthCardList": [{
            "name": "",
            "path": ""
          }],
          "cardPhoto": [{
            "name": "",
            "path": ""

          }],
          "clerkPhotoList": [{
            "name": "",
            "path": ""
          }]
        }
      }
      UserApi.addstaff(data, (res) => {
        console.log(res)
        if (res.code == "0") {
          wx.showToast({
            title: '新增成功',
            icon: 'success',
            duration: 2000
          })
          let pages = getCurrentPages();   //获取小程序页面栈
          let beforePage = pages[pages.length - 2];  //获取上个页面的实例对象
          beforePage.go_update();
          wx.navigateBack({         //返回上一页  
            delta: 1
          })
        }
      })
    } else {
      wx.showToast({
        title: "请先填写完整",
        icon: "none"
      })
    }  
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // if(){

    // }

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
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})