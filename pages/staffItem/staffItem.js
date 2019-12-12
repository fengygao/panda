
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
    stafflist: {},
    edit: '../../image/edit.png',
    Cancellation: '../../image/Cancellation.png',
    staffindex:null,
    dianzhang: '../../image/dianzhang.png',
    dianyuan: '../../image/dianyuan.png'
  },
delete(e){
  let staffid = this.data.stafflist.id
  console.log(staffid)

  // 当前时间戳
  let timestamp = Date.parse(new Date());
  //md5加密sign
  let sign = util.hexMD5(timestamp + 'REEST2A72F53B39C');

  let data = {
    "version": app.globalData.version,
    "timestamp": timestamp,
    "sign": sign,
    "params": {
      "id": staffid
    }
  }
  wx.showModal({
    title: '提示',
    content: '是否注销此员工？',
    success(res) {
      if (res.confirm) {
        console.log('用户点击确定')  
        UserApi.staffdelete(data, (res) => {
          console.log(res.data)      
          if (res.code == "0") {
            wx.showToast({
              title: '注销成功',
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

      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
},
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    this.setData({
      staffindex: options.index
    })
    
    let obj = wx.getStorageSync("resdata")
    console.log(obj)

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
        console.log(this.data.staffindex)
        this.setData({
          stafflist: arr[this.data.staffindex]
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

