//index.js
const app = getApp()

Page({
  data: {
    logged: 0,
    tabIndex: 2,
    list: [{
        "text": "活动"
      },
      {
        "text": "积分"
      },
      {
        "text": "我"
      }
    ]
  },

  tabChange(e) {
    this.setData({tabIndex: e.detail.index})
    console.log('tab change', e)
  },

  onLoad: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo
              this.setData({
                userInfo: res.userInfo,
                logged: 1,
              })
            }
          })
        } else {
          this.setData({
            logged: -1
          })
        }
      }
    })
    console.log(app.globalData)
  },

  onLoginSuccess: function (e) {
    this.setData({logged: 1})
  },

  
})