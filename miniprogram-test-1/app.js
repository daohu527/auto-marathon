//app.js
App({
  globalData : {
    userid: undefined,
    db: undefined,
    userInfo: undefined
  },

  onLaunch: function () {
    var that = this

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })

      // 读取user id
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          that.globalData.openid = res.result.openid
          console.log("openid: ", that.globalData.openid)

          // 读取收藏列表
          that.globalData.db = wx.cloud.database()
          that.globalData.db.collection('user').where({
            _openid: that.globalData.openid
          }).get({
            success(res) {
              // res.data 包含该记录的数据
              // console.log(res)

              // 由于openid无法作为key? 长度超过要求？
              that.globalData.userInfo = res.data[0]
              console.log('userinfo', that.globalData.userInfo.favorites)
             
            },
            fail(err) {
              console.log(err)
            }
          })
        },
        fail: err => {
          console.error(err)
        }
      })
    }
  }
})
