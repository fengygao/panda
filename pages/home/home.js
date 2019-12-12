var wxCharts = require("../../utils/wxcharts.js")
import {
  Api
} from "../../services/Api.js"
let UserApi = new Api()
var lineChart = null;
const app = getApp()
var util = require('../../utils/md5.js')
Page({
  data: {
    focus: false,
    inputValue: '',
    images: ['../../image/swiper-item2.jpg', '../../image/swiper-item3.jpg'],
    indicatorDots: true,
    vertical: false, //滑动方向是否纵向
    autoplay: true,
    circular: true, //衔接滑动
    interval: 2000,
    duration: 500,
    // previous: '6px',
    // next: '12px',
    sectionNav: [{
        id: 1,
        text: '日销售录入',
        cove: '../../image/Sale1.png',
        url: "../salesEntry/salesEntry"
      },
      {
        id: 2,
        text: '我的销售额',
        cove: '../../image/Sale.png',
        url: "../mySales/mySales"
      }
    ],
   
  },
  touchHandler: function(e) {
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function(item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindReplaceInput: function(e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    var left
    if (pos !== -1) {
      // 光标在中间
      left = e.detail.value.slice(0, pos)
      // 计算光标的位置
      pos = left.replace(/11/g, '2').length
    }

    // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }

    // 或者直接返回字符串,光标在最后边
    // return value.replace(/11/g,'2'),
  },
  bindHideKeyboard: function(e) {
    if (e.detail.value === '123') {
      // 收起键盘
      wx.hideKeyboard()
    }
  },
  kantie: function(e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // detail: function (val) {
  //   console.log(val)
  // },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '租户服务'
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
    //周销售额
    // 当前时间戳
    let timestamp = Date.parse(new Date());
    //md5加密sign
    let sign = util.hexMD5(timestamp + 'REEST2A72F53B39C');
    let objuser = wx.getStorageSync('resdata');

    let data = {
      "version": app.globalData.version,
      "timestamp": timestamp,
      "sign": sign,
      "params": {
        "contNo": objuser.contNo,
        "mallId": objuser.mallId
      }
    }
    UserApi.weeklySales(data, (res) => {           
      if (res.code == "0") {
        let salearr1 = res.data.currentWeek
        console.log(salearr1)//本周
        let salearr2 = res.data.lastWeek
        console.log(salearr2)//上周
        //曲线图  
        var windowWidth = '',
          windowHeight = ''; //定义宽高
        try {
          var res = wx.getSystemInfoSync(); //试图获取屏幕宽高数据
          windowWidth = res.windowWidth / 750 * 690; //以设计图750为主进行比例算换
          windowHeight = res.windowWidth / 750 * 400 //以设计图750为主进行比例算换
        } catch (e) {
          console.error('getSystemInfoSync failed!'); //如果获取失败
        }
        lineChart = new wxCharts({ //定义一个wxCharts图表实例
          canvasId: 'lineCanvas', //输入wxml中canvas的id
          type: 'area', //图标展示的类型有:'line','pie','column','area','ring','radar'
          categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], //模拟的x轴横坐标参数
          animation: false, //是否开启动画
          series: [{ //具体坐标数据
            name: '本周',
            color: '#409eff',
            data: salearr1, //数据的数组
            format: function (val, name) { //点击显示的数据注释
              return val + '元';
            }
          }, {
            name: '上周',
            color: '#ee2929',
              data: salearr2,
            format: function (val, name) {
              return val + '元';
            }
          }],
          xAxis: { //是否隐藏x轴分割线
            title: '元',
            disableGrid: true,
          },
          yAxis: { //y轴数据
            title: '', //标题
            format: function (val) { //返回数值
              return val.toFixed(2);
            },
            min: 0, //最小值
            max: 12000, //最大值
            gridColor: '#D8D8D8',
          },
          width: windowWidth, //图表展示内容宽度
          height: windowHeight, //图表展示内容高度
          dataLabel: false, //是否在图表上直接显示数据
          dataPointShape: true, //是否在图标上显示数据点标志
          extra: {
            lineStyle: 'curve' //曲线
          },
        });



      }
    })


   

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