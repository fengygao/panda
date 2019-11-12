// pages/other/other.js
var wxCharts = require("../../utils/wxcharts.js")
var lineChart = null;
var lineChart2 = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sectionNav: [
      {
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
  touchHandler: function (e) {
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  touchHandler2: function (e) {
    lineChart2.showToolTip(e, {
      // background: '#7cb5ec',
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  kantie: function (e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '经营'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#d7004b'
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
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '经营'
    })
    wx.setNavigationBarColor({ 
      frontColor:'#ffffff',
      backgroundColor: '#d7004b',
    })
    var windowWidth = '', windowHeight = '';    //定义宽高
    try {
      var res = wx.getSystemInfoSync();    //试图获取屏幕宽高数据
      windowWidth = res.windowWidth / 750 * 690;   //以设计图750为主进行比例算换
      windowHeight = res.windowWidth / 750 * 400    //以设计图750为主进行比例算换
    } catch (e) {
      console.error('getSystemInfoSync failed!');   //如果获取失败
    }

    // 曲线
    lineChart = new wxCharts({     //定义一个wxCharts图表实例
      canvasId: 'lineCanvas',     //输入wxml中canvas的id
      type: 'line',       //图标展示的类型有:'line','pie','column','area','ring','radar'
      categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],    //模拟的x轴横坐标参数
      animation: false,  //是否开启动画
      series: [{   //具体坐标数据
        name: '本周',  //名字
        color: '#409eff',
        data: [100, 2000, 7000, 5000],  //数据点
        format: function (val, name) {  //点击显示的数据注释
          return val + '元';
        }
      }, {
        name: '上周',
        color: '#ee2929',
        data: [200, 1500, 6800, 6000,],
        format: function (val, name) {
          return val + '元';
        }
      }
      ],
      xAxis: {   //是否隐藏x轴分割线
        title: '元',
        disableGrid: true,
      },
      yAxis: {      //y轴数据
        title: '',  //标题
        format: function (val) {  //返回数值
          return val.toFixed(2);
        },
        min: 0,   //最小值
        max: 12000,   //最大值
        gridColor: '#D8D8D8',
      },
      width: windowWidth,  //图表展示内容宽度
      height: windowHeight,  //图表展示内容高度
      dataLabel: false,  //是否在图表上直接显示数据
      dataPointShape: true, //是否在图标上显示数据点标志
      extra: {
        lineStyle: 'curve'  //曲线
      },
    });
     lineChart = new wxCharts({     //定义一个wxCharts图表实例
      canvasId: 'lineCanvas',     //输入wxml中canvas的id
      type: 'area',       //图标展示的类型有:'line','pie','column','area','ring','radar'
      categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],    //模拟的x轴横坐标参数
      animation: true,  //是否开启动画
      series: [{   //具体坐标数据
        name: '本周',  //名字
        color: '#409eff',
        data: [100, 2000, 7000, 5000],  //数据点
        format: function (val, name) {  //点击显示的数据注释
          return val + '元';
        }
      }, {
        name: '上周',
        color: '#ee2929',
        data: [200, 1500, 6800, 6000,],
        format: function (val, name) {
          return val + '元';
        }
      }
      ],
      xAxis: {   //是否隐藏x轴分割线
        title: '元',
        disableGrid: true,
      },
      yAxis: {      //y轴数据
        title: '',  //标题
        format: function (val) {  //返回数值
          return val.toFixed(2);
        },
        min: 0,   //最小值
        max: 12000,   //最大值
        gridColor: '#D8D8D8',
      },
      width: windowWidth,  //图表展示内容宽度
      height: windowHeight,  //图表展示内容高度
      dataLabel: false,  //是否在图表上直接显示数据
      dataPointShape: true, //是否在图标上显示数据点标志
      extra: {
        lineStyle: 'curve'  //曲线
      },
    });

//柱状

    lineChart2 = new wxCharts({     //定义一个wxCharts图表实例
      canvasId: 'lineCanvas2',     //输入wxml中canvas的id
      type: 'column',       //图标展示的类型有:'line','pie','column','area','ring','radar'
      categories: ['截止昨日销售额'],    //模拟的x轴横坐标参数
      animation: true,  //是否开启动画
      series: [{   //具体坐标数据
        name: ['今年本月'],  //名字
        color: '#409eff',
        data: [7650],  //数据点
        format: function (val, name) {  //点击显示的数据注释
          return val + '元';
        }
      }, {
          name: '去年本月',
        color: '#ee2929',
        data: [6420],
        format: function (val, name) {
          return val + '元';
        }
      }
      ],
      xAxis: {   //是否隐藏x轴分割线
        title: '元',
        disableGrid: false,
        type: 'calibration'
      },
      yAxis: {      //y轴数据
        title: '',  //标题
        format: function (val) {  //返回数值
          return val.toFixed(2);
        },
        min: 0,   //最小值
        max: 12000,   //最大值
        gridColor: '#D8D8D8',
      },
      width: windowWidth,  //图表展示内容宽度
      height: windowHeight,  //图表展示内容高度
      extra: {
        column: {
          width: 20
        }
      },
    });


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