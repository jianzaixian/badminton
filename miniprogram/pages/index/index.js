//index.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    logged: 0,
    tabIndex: 2,
    list: [{
        "text": "活动",
        "iconPath": "/images/badminton.svg",
        "selectedIconPath": "/images/badmintonGreen.svg"
      },
      {
        "text": "积分",
        "iconPath": "/images/score.svg",
        "selectedIconPath": "/images/scoreGreen.svg"
      },
      {
        "text": "我",
        "iconPath": "/images/homepage.svg",
        "selectedIconPath": "/images/homepageGreen.svg"
      }
    ]
  },

  tabChange(e) {
    this.setData({tabIndex: e.detail.index})
    console.log('tab change', e)
  },

  onLoad: function () {
    this.init()
  },

  init: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openId = res.result.openid
        this.getUserInfoFromDataBase(app.globalData.openId)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  getUserInfoFromDataBase: function (openId) {
    const that = this;
    const db = wx.cloud.database()
    db.collection('user').where({
      _openid: openId,
    }).get({
      success: function(res) {
        // res.data 是包含以上定义的两条记录的数组
        if (res.data.length > 0) {
          app.globalData.userInfo = res.data[0]
          that.setData({logged: 1, userInfo: app.globalData.userInfo})
        } else {
          that.setData({logged: -1})
        }
      },
      fail: err => {
        that.setData({logged: -1})
      }
    })
  },

  onLoginSuccess: function() {
    this.setData({logged: 1, userInfo: app.globalData.userInfo})
  }
})