// pages/salesEntry/salesEntry.js
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
    sectioninfo: {},
    disabled: false,
    salesvolume: null, //销售额
    salespens: null, //销售笔数
    date: null, //日期
    tempFilePaths: [], //图片数组
    imgpath: [],
    start: '', //录入日期开始区间
    end: '', //录入日期结束区间
    dayId:'',
    replaceImg:'0'//上传的图片变更

  },
  input1: function(e) {
    // console.log(e.detail.value)
    let salesvolume = e.detail.value
    if (salesvolume) {
      this.setData({
        salesvolume: salesvolume,

      })
      console.log('销售额' + this.data.salesvolume)
    }
  },
  input2: function(e) {
    // console.log(e.detail.value)
    let salespens = e.detail.value
    if (salespens) {
      this.setData({
        salespens: salespens
      })
      console.log('销售笔数' + this.data.salespens)
    }
  },
  // 录入时间
  bindDateChange: function(e) {
    let times = e.detail.value;
    console.log('入职时间为', times)
    this.setData({
      date: times,
    })
  },
  // 时间处理
  timehandTap2: function(symbol) {
    symbol = symbol || '-';
    let date = new Date();
    // console.log(date)
    let year = date.getFullYear();
    let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return year + symbol + month + symbol + day;
  },
  timehandTap: function(symbol, n) {
    symbol = symbol || '-';
    let date = new Date();
    date = date.setDate(date.getDate() + n);
    date = new Date(date)
    // console.log(date)
    let year = date.getFullYear();
    let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return year + symbol + month + symbol + day;
  },
  // 数据处理
  dadtaTap: function() {
    let that = this;
    let times = this.timehandTap("-", -(2 + 1));
    let times2 = this.timehandTap2("-")
    // console.log(times)
    // console.log(times2)
    that.setData({
      start: times,
      end: times2
    })

  },

  btnsubmit: function(e) {
    if (this.data.salesvolume && this.data.salespens && this.data.date && this.data.tempFilePaths) {
      let that = this;
      console.log(this.data.tempFilePaths)
      if (wx.getStorageSync("resdata")) {
        let date = this.data.date.replace(/-/g, '')
        let obj = wx.getStorageSync("resdata")
        let _this = this;

        // 当前时间戳
        let timestamp = Date.parse(new Date());
        //md5加密sign
        let sign = util.hexMD5(timestamp + 'REEST2A72F53B39C');

        let data = {
          "version": app.globalData.version,
          "timestamp": timestamp,
          "sign": sign,
          "params": {
            "sale": this.data.salesvolume,
            "count": this.data.salespens,
            "clerkId": obj.clerkId,
            "saleYmd": date,
            "contNo": obj.contNo,
            "mallId": obj.mallId,
            "dayId": this.data.dayId == '' ? '' : this.data.dayId,
            "paths": this.data.tempFilePaths,
            "replaceImg": this.data.replaceImg
          }
        }
        UserApi.salesubmit(data, (res) => {
          // console.log(res)
          if (res.code == "0") {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            })
            that.setData({
              salesvolume: '', //销售额
              salespens: '', //销售笔数
              date: '', //日期
              tempFilePaths: [],
            })
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    }else{
      wx.showToast({
        title: "请先填写完整",
        icon: "none"
      })
    }   
  },
  // 图片上传
  chooseimage: function() {
    var _this = this;
    var arrimg = []
    console.log(this.data.tempFilePaths)
    //获取当前已有的图片
    wx.chooseImage({
      count: 9 , //最多还能上传的图片数,这里最多可以上传9张
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success(res) {
        console.log(res.tempFilePaths)
        const tempFilePaths = res.tempFilePaths
        wx.showLoading({
          title: '上传中',
          mask: true
        })
        // 当前时间戳
        let timestamp = Date.parse(new Date());
        //md5加密sign
        let sign = util.hexMD5(timestamp + 'REEST2A72F53B39C');
        
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            // url: 'http://rosefinch-dev/merchantMain_web/img/fileUpload.htm', //开发接口地址
            url: 'http://pre.re-est.com/merchantMain_web/img/fileUpload.htm', //预发布接口地址
            filePath: tempFilePaths[i],
            name: 'file',
            header: {
              "Content-Type": "multipart/form-data"
            },
            formData: {
              "version": app.globalData.version,
              "timestamp": timestamp,
              "sign": sign,
              "creator": '12'
            },
            success(res) {
              wx.hideLoading()
              arrimg=[];
              var imgarr = JSON.parse(res.data)
              if (imgarr.code == '0') {        
                var tempFilePathsimg = imgarr.data
                arrimg.push(tempFilePathsimg)
                if (i == tempFilePaths.length) {
                  var arr = _this.data.tempFilePaths.concat(arrimg)
                  wx.showToast({
                    title: '已上传成功',
                    icon: 'success',
                    duration: 2000
                  })

                  //  获取图片                
                  // console.log(arr)
                  _this.setData({
                    tempFilePaths: arr,
                    replaceImg: '1'
                  })
                }
              }
            }
          })
        }
      },
      fail: function (err) {
        wx.hideLoading()
        if (err) {
          wx.showToast({
            title: '上传失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  // 点击图片删除本张图片
  removeimg(e) {
    // console.log(e)
    var dataindex = e.currentTarget.dataset.index;
    let arr;
    arr = this.data.tempFilePaths.splice(dataindex, 1);

    this.setData({
      tempFilePaths: this.data.tempFilePaths,
      replaceImg:'1'
    })
  },
  // 图片查看
  previewImg: function (e) {
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.tempFilePaths;
    wx.previewImage({
      current: imgArr[index], //当前图片地址
      urls: imgArr, //所有要预览的图片的地址集合 数组形式
    })
  },
  timenow: function () {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return Y + M + D;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.dadtaTap()
    wx.setNavigationBarTitle({
      title: '日销售录入'
    })
    if (wx.getStorageSync('resdata')) {
      let object = wx.getStorageSync('resdata')
      // console.log(object)
      this.setData({
        sectioninfo: object
      })
    }

    // console.log(this.data.dayId)
    let timesaa = this.timehandTap2("-")
    let timesday = timesaa.replace(/-/g, '')
    // console.log(timesday)
    if (wx.getStorageSync("resdata")) {
      let obj = wx.getStorageSync("resdata")

      // 当前时间戳
      let timestamp = Date.parse(new Date());
      //md5加密sign
      let sign = util.hexMD5(timestamp + 'REEST2A72F53B39C');

      let data = {
        "version": app.globalData.version,
        "timestamp": timestamp,
        "sign": sign,
        "params": {
          "saleYmd": timesday,
          "contNo": obj.contNo,
          "mallId": obj.mallId,
        }
      }
      UserApi.salesreach(data, (res) => {
        if (res.code == "0") {
          var years = res.data.saleYmd.slice(0, 4);
          var month = res.data.saleYmd.slice(4, 6);
          var day = res.data.saleYmd.slice(6, 8);
          let saledata = years + '-' + month + '-' + day
          this.setData({
            salesvolume: Number(res.data.sale),
            salespens: Number(res.data.count),
            date: saledata,
            dayId: res.data.id,
            tempFilePaths: res.data.paths
          })
        }
      })
    }
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

  }
})