// pages/tab/index.js
const tabItems = [
  {
    id: 1,
    name: '食品饮料'
  },
  {
    id: 2,
    name: '美妆大咖'
  },
  {
    id: 3,
    name: '精品个护'
  },
  {
    id: 4,
    name: '生活家电'
  },
  {
    id: 5,
    name: '纸品清洁'
  },
  {
    id: 6,
    name: '家居日用'
  },
  {
    id: 7,
    name: '时尚装备'
  }
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabItems,
    tabSelected: 1,
    scrollSelected: ''
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

  handleTab(e) {
    const { id, index } = e.currentTarget.dataset
    let scrollSelected = ''
    if (index) {
      scrollSelected = `a${this.data.tabItems[index - 1].id}`
    }
    this.setData({
      tabSelected: id,
      scrollSelected,
    })
  }
})