// components/login/login.js
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
    onGetUserInfo: function (e) {
      if (e.detail.userInfo) {
        this.register(
          e.detail.userInfo
        )
        this.triggerEvent('loginSuccess')
      }
    },
    register: function (userInfo) {
      console.log('register')
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
          wx.showToast({
            title: '登陆成功',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '登陆失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    },
  }
})
