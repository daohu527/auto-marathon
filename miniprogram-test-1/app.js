//app.js
App({
  onLaunch: function () {

    this.globalData = {
      db: undefined,
    }
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })

      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log("openid: ", res.result.openid)
          this.globalData.openid = res.result.openid
        },
        fail: err => {
          console.error(err)
        }
      })

      this.globalData.db = wx.cloud.database()
    }
  }
})
