// pages/remove/index.js
const { names, texts } = require('../../utils/config.js')
const imgUrl = `/assets/images/20190424095813`

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [],  // 列表数据
    startX: 0,  // 初始化向左滑动距离
    delBtnWidth: 140, // 删除按钮宽度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const lists = []
    for(var i = 0; i < 10; i++) {
      lists.push({
        id: i,
        name: names[i],
        text: texts[i],
        avatar: `${imgUrl}${i}.png`,
        removeInfo: '删除'
      })
    }
    this.setData({
      lists
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

  // 触摸开始
  touchStart(e) {
    const index = e.currentTarget.dataset.index
    const lists = this.data.lists
    const touchTarget = e.touches[0]
    lists[index].right = 0
    lists[index].removeInfo = '删除'
    this.setData({
      startX: touchTarget.clientX,
      lists
    })
  },

  // 触摸滑动
  touchMove(e) {
    const index = e.currentTarget.dataset.index
    const touchTarget = e.touches[0]
    const disX = this.data.startX - touchTarget.clientX
    const lists = this.data.lists
    if (disX < 100) {
      lists[index].right = disX
    } else {
      lists[index].right = 100

    }
    if (disX >= 20) {
      lists[index].right = disX
    } else {
      lists[index].right = 0
    }
    this.setData({
      lists
    })
  },

  // 触摸结束
  touchEnd(e) {
    const index = e.currentTarget.dataset.index
    const lists = this.data.lists
    if (lists[index].right >= this.data.delBtnWidth / 2) {
      lists[index].right = this.data.delBtnWidth
    } else {
      lists[index].right = 0
    }
    this.setData({
      lists
    })
  },

  // 删除
  handleRemove(e) {
    const { index, id } = e.currentTarget.dataset
    let lists = this.data.lists
    if (lists[index].removeInfo === '删除') {
      lists[index].removeInfo = '确认删除'
      this.setData({
        lists,
      })
    } else {
      lists.splice(index, 1)
      this.setData({
        lists
      })
      wx.showToast({
        icon: 'none',
        title: '删除成功',
      })
    }
  }
})