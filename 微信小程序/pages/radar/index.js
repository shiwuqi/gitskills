// pages/radar/index.js
import * as echarts from '../../ec-canvas/echarts.min.js'

let chart = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      // 如果想要禁止触屏事件，以保证在图表区域内触摸移动仍能滚动页面，就将 disableTouch 设为 true
      disableTouch: true,   // 禁止触屏事件, 解决滑动空白问题
      onInit: function (canvas, width, height) {
        chart = echarts.init(canvas, null, {
          width: width,
          height: height
        })
        canvas.setChart(chart)
        return chart
      }
    },
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
    const _this = this
    setTimeout(_this.getChartData, 1000)
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

  // 雷达图渲染
  getChartData() {
    chart.setOption({
      backgroundColor: "#ffffff",
      color: ["#37A2DA", "#FF9F7F"],
      tooltip: {},
      xAxis: {
        show: false
      },
      yAxis: {
        show: false
      },
      radar: {
        // shape: 'circle',
        indicator: [{
          name: '食品',
          max: 500
        },
        {
          name: '玩具',
          max: 500
        },
        {
          name: '服饰',
          max: 500
        },
        {
          name: '绘本',
          max: 500
        },
        {
          name: '医疗',
          max: 500
        },
        {
          name: '门票',
          max: 500
        }
        ]
      },
      series: [{
        name: '预算 vs 开销',
        type: 'radar',
        data: [
          {
            value: [430, 340, 500, 300, 490, 400],
            name: '预算',
            areaStyle: {
              normal: {
                color: '#45C8DC'
              }
            }
          },
        ]
      }]
    })
  }
})