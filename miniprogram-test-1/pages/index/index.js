// pages/contest/contest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    imageIndexUrl: "cloud://marathon-f4f2b4.6d61-marathon-f4f2b4/imageIndex/",
    background: [
      {
        name: "demo-text-1",
        imageid: "image1"
      },
      {
        name: "demo-text-2",
        imageid: "image2"
      },
      {
        name: "demo-text-3",
        imageid: "image3"
      }
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    imageCardUrl: "cloud://marathon-f4f2b4.6d61-marathon-f4f2b4/image/",
    imageFormat: ".jpg",
    marathonData: []
  },

  onChange(event) {
    //切换标签
    wx.showToast({
      title: '切换到标签 ${event.detail.index + 1}',
      icon: 'none'
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.marathon = wx.cloud.database().collection('marathon')
    that.marathon.limit(10).get({
      success(res) {
        console.log("data", res.data)
        that.setData({
          marathonData: res.data
        })
      }
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