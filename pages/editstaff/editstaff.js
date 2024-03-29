// pages/addstaff/addstaff.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: null,
    array: ['男', '女'],
    date: null,
    switch1Checked: true,
    switch2Checked: false,
  },
  // 性别
  bindPickerChange: function (e) {
    console.log('性别为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 入职时间
  bindDateChange: function (e) {
    console.log('入职时间为', e.detail.value)
    this.setData({
      date: e.detail.value
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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