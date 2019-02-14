//index.js

const app = getApp()

Page({
  user: undefined,
  data: {
    axis: [],
  },

  onChange(event) {

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    
    that.marathon = wx.cloud.database().collection('marathon')
    const key = 'date'
    that.marathon.get().then(res => {
      console.log(res.data)

      wx.cloud.callFunction({
        name: 'db',
        data: {
          attr: key,
          arr: res.data
        },
        success: res => {
          console.log("data: ", res)
          that.setData({
            axis: res.result.data
          })
        },
        fail: err => {
          console.error(err)
        }
      })
    }).catch(err => {
      console.error(err)
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
