// pages/login/login.js
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
    src1: '../../image/logo.png',
    src2: '../../image/logo1.png',
    src3: '../../image/logo2.png',
    acode: '../../image/aCode.png',
    phone: '../../image/phone.png',
    send: false,
    alreadySend: false,
    second: 60,
    disabled: true,
    buttonType: 'default',
    phoneNum: '', //手机号
    code: '', //验证码
    otherInfo: '',
    info: '发送',

  },
  // 手机号部分
  inputPhoneNum: function(e) {
    let phoneNum = e.detail.value
    if (phoneNum.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNum)
      if (checkedNum) {
        this.setData({
          phoneNum: phoneNum
        })
        console.log('手机号：' + this.data.phoneNum)
        this.showSendMsg()

      }
    } else {
      this.setData({
        phoneNum: ''
      })
      this.hideSendMsg()
    }
  },

  checkPhoneNum: function(phoneNum) {
    let str = /^1\d{10}$/
    if (str.test(phoneNum)) {
      return true
    } else {
      wx.showToast({
        title: '手机号不正确',
        image: '../../image/error.png'
      })
      return false
    }
  },
  // 验证码
  addCode: function(e) {
    let code = e.detail.value
    if (code) {
      this.setData({
        code: code
      })
    }
  },
  showSendMsg: function() {
    if (!this.data.alreadySend) {
      this.setData({
        send: true
      })
    }
  },

  hideSendMsg: function() {
    this.setData({
      send: false,
      disabled: true,
    })
  },

  sendMsg: function() {
    var phoneNum = this.data.phoneNum;
    this.setData({
      alreadySend: true,
      send: false
    })
    // 当前时间戳
    let timestamp = Date.parse(new Date());
    //md5加密sign
    let sign = util.hexMD5(timestamp + 'REEST2A72F53B39C');

    let setTimer = setInterval(
      () => {
        this.setData({
          second: this.data.second - 1
        })
        if (this.data.second <= 0) {
          this.setData({
            second: 60,
            alreadySend: false,
            send: true,
            info: '重新发送'
          })
          resolve(setTimer)
        }
      }, 1000)
    wx.showLoading({
      title: '发送中...',
      mask: true
    })

   

    let data = {
      "version": app.globalData.version,
      "timestamp": timestamp,
      "sign": sign,
      "params": {
        "bindTel": phoneNum
      }
    }
    UserApi.getphoneCode(data, (res) => {
      console.log(res)
      if (res.code == "0") {
        wx.hideLoading()
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 2000
        })
        // clearInterval(setTimer)
        this.setData({
          // second: 60,
          disabled: false,
          // send: false,
          // alreadySend: false,
        })
      } else {
        wx.showToast({
          title: "发送失败",
          icon: 'none',
          duration: 1000
        })
        this.setData({
          alreadySend: false,
          send: true,
          info: '重新发送'
        })
      }
    })
  },

  // 绑定手机登录及获取微信
  onSubmit: function(e) {
    var _this = this
    // 当前时间戳
    let timestamp = Date.parse(new Date());
    //md5加密sign
    let sign = util.hexMD5(timestamp + 'REEST2A72F53B39C');

    let data = {
      "version": app.globalData.version,
      "timestamp": timestamp,
      "sign": sign,
      "params": {
        "openId": wx.getStorageSync('openId'),
        "bindTel": this.data.phoneNum,
        "unionId": "165098",
        "bindSource": "rosefinch",
        "verifyCode": this.data.code
      }
    }
    UserApi.setphone(data, (res) => {
      // console.log(res)
      if (res.code == "0") {
        wx.setStorageSync('resdata', res.data)
        wx.switchTab({
          url: '../../pages/home/home',
        })
      }
      if (res.code == "1"){
        wx.showToast({
          title: "账户不存在!",
          icon: 'none',
          duration: 1000
        })
        this.setData({
          disabled: true,
          send:true,
          info: ''
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    // 查看是否授权
    // 页面创建时执行
    var _this = this;
    wx.setNavigationBarTitle({
      title: '手机登录'
    })

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

  },

})