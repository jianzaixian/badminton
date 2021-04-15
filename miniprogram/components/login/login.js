// components/login.js
const app = getApp()
Component({
  /**
   * Component properties
   */
  properties: {

  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    getUserProfile: function () {
      console.log('profile')
      const that = this;
      wx.getUserProfile({
        desc: '用于完善会员资料', 
        success: (res) => {
          app.globalData.userInfo = res.userInfo
          that.register(app.globalData.userInfo)
          console.log(res)
        },
        fail: err => {
          console.log('fail')
        }
      })
    },
  
    register: function (userInfo) {
      const that = this;
      const db = wx.cloud.database()
      db.collection('user').add({
        data: {
          ...userInfo,
          score: 1000,
          role: 1
        },
        success: res => {
          console.log('register success')
          app.globalData.userInfo = userInfo
          console.log(userInfo)
          wx.showToast({
            title: '登陆成功',
          })
          that.triggerEvent('loginSuccess')
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '登陆失败'
          })
        }
      })
    },
  }
})
