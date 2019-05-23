// pages/chat/index.js
const {
  globalData
} = getApp()
const { shijing } = require('../../utils/shijing.js')
const imgUrl = '/assets/images/20190424095813'
const { deepCopy } = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shijing,
    loadMore: { // 分页加载
      pageNo: 0,
      pageSize: 20
    },
    contentHeight: 0, // scroll-view高度
    toView: '', // 滚动到指定位置id
    messages: [],  // 消息列表
    totalPages: 10000,
    send: 0,
    scrollBottom: 0,
    isLoadMore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const contentHeight = this.handleClacHeight()
    this.setData({
      contentHeight,
      totalPages: Math.ceil(this.data.shijing.length / this.data.loadMore.pageSize)
    })
    this.queryMessages()
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

  // scroll-view滚动到顶部触发
  handleScrollToupper() {
    if ((this.data.loadMore.pageNo + 1) < this.data.totalPages) {
      const params = {
        loadMore: {
          pageNo: this.data.loadMore.pageNo + 1,
          pageSize: this.data.loadMore.pageSize
        },
        isLoadMore: true
      }
      this.setData(params)
      this.queryMessages()
    }
  },

  // scroll-view滚动
  handleScroll(e) {
    const scrollBottom = e.detail.scrollHeight - e.detail.scrollTop - 445
    this.setData({
      scrollBottom
    })
  },

  // 计算高度
  handleClacHeight(val) {
    const height = val && typeof val === 'number' ? val : 0
    const _dpr = globalData.systemInfo.width / 750
    const _contentHeight = globalData.systemInfo.height - _dpr * (height + 120)
    return _contentHeight
  },

  // 获取聊天消息
  queryMessages() {
    const minLen = this.data.loadMore.pageNo * this.data.loadMore.pageSize
    const maxLen = minLen + this.data.loadMore.pageSize
    const msgs = deepCopy(this.data.messages)
    let toView
    const messages = this.formatMessages(this.data.messages, minLen, maxLen)
    if (this.data.loadMore.pageNo === 0) {
      toView = messages[messages.length - 1].id
    } else {
      toView = msgs[0].id
    }
    this.setData({
      messages,
      isLoadMore: false
    })
    this.setData({
      toView: `ct-${toView}`
    })
  },

  formatMessages(messages, min, max) {
    let direct, index = 0
    for (let i = min; i < max; i++) {
      direct = !(parseInt((Math.random() * 100)) % 2)
      if (this.data.shijing[i]) {
        messages.unshift({
          id: Math.random().toString(36).substr(2),
          message: this.data.shijing[i],
          icon: direct ? `${imgUrl}${index}.png` : '/assets/images/erha.jpg',
          direct,
        })
        index = (index + 1) % 10
      }
    }
    return messages
  },

  handleInput(e) {
    const val = e.detail.value
    this.setData({
      chatMessage: val
    })
  },

  // 发送消息
  handleConfirm() {
    const _this = this
    if (!this.data.chatMessage) {
      wx.showToast({
        icon: 'none',
        title: '请输入内容',
      })
      return
    }
    const messages = this.data.messages
    const id = Math.random().toString(36).substr(2)
    messages.push({
      id,
      message: this.data.chatMessage,
      icon: '/assets/images/erha.jpg',
      direct: false,
    })
    this.setData({
      messages,
      chatMessage: '',
      send: this.data.send + 1,
      toView: `ct-${id}`
    })
  }
})