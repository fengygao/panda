// pages/mine/mine.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    menuitems: [
      { text: '我的员工', url: '../myStaff/myStaff', icon: '../../image/staff.png', tips: '' },
      { text: '我的活动', url: '', icon: '../../image/activity.png', tips: '' },
      { text: '违约单', url: '', icon: '../../image/Default.png', tips: '' }
    ],
    toright:'../../image/toright.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var _this=this 
    wx.setNavigationBarTitle({
      title: '我的'
    })
    var info = wx.getStorageSync('resdata')
    console.log(info)
    if (info) {
      this.setData({
        userInfo: info
      })
    }
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