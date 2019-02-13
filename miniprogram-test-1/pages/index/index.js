//index.js
const app = getApp()

Page({
  user: undefined,
  data: {
    axis: [],
    inputShowed: false,
    inputVal: ""
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.marathon = wx.cloud.database().collection('user')
    that.marathon.where({
      _openid: 'o1vJn5J5SrlyNdkkgGdFCt9gnjyU'
    }).get().then(res => {
      console.log(res.data)
      that.setData({
        axis: res.data
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

  },


  /**
   * Search Bar
   */
  showInput: function () {
      this.setData({
          inputShowed: true
      });
  },
  hideInput: function () {
      this.setData({
          inputVal: "",
          inputShowed: false
      });
  },
  clearInput: function () {
      this.setData({
          inputVal: ""
      });
  },
  inputTyping: function (e) {
      this.setData({
          inputVal: e.detail.value
      });
  }

})
