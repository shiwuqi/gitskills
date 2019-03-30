// pages/interview/index/index.js
const { addZero } = require('../../utils/calendar.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sum: 2,
    day: 1,
    month: 1,
    year: 1970,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const now = new Date()
    const year = now.getFullYear()
    const month = addZero(now.getMonth() + 1)
    const day = addZero(now.getDate())
    this.setData({
      year,
      month,
      day,
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

  handleSelectedDay(e) {
    const { year, month, day } = e.detail
    this.setData({
      year,
      month,
      day
    })
  }
})