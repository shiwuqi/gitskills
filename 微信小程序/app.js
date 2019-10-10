//app.js
App({
  onLaunch: function () {

    // 获取系统信息: 微信版本 高度 宽度
    wx.getSystemInfo({
      success: res => {
        // 微信基础版本不能低于1.1
        if (!res.SDKVersion || (res.SDKVersion.split('.')[1] < 1 && res.SDKVersion.split('.')[0] <= 1)) {
          wx.showModal({
            title: '警告',
            content: '您的微信版本过低！严重影响您的使用体验，建议及时升级',
            showCancel: false,
            confirmText: '知道了'
          })
        }
        // 将宽高、微信版本号写入全局
        this.globalData.systemInfo = {
          width: res.windowWidth,
          height: res.windowHeight,
          pixelRatio: res.pixelRatio,
          SDKVersion: res.SDKVersion,
          system: res.platform
        }
      }
    }),

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    systemInfo: {}, // 系统基本信息
  }
})