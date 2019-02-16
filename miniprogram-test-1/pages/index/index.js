// pages/contest/contest.js
var app = getApp()
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
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    imageCardUrl: "cloud://marathon-f4f2b4.6d61-marathon-f4f2b4/image/",
    imageFormat: ".jpg",
    marathonData: [],
    pageindex: 0,
    pagenum: 5,
    ispageend: false,
  },

  // 更新收藏
  checkAndPush (arr, value) {
    // var favorites = JSON.parse(arr)
    var favorites = arr
    var index = favorites.indexOf(value)

    console.log("checkAndPush", index)

    if (index >= 0) {
      favorites.splice(index, 1)
    } else {
      favorites.push(value)
    }
    
    console.log(favorites)

    return favorites
  },

  updateUserData: function (id, key, value) {
    var that = this
    that.user = wx.cloud.database().collection('user')
    that.user.doc(id).update({
      data: {
        key: value
      },
      success(res) {
        console.log("updateUserData", res.data)
      }
    })
  },

  onIconClick(event) {
    console.log(event)
    var that = this

    var index = parseInt(event.target.id)
    var _id = that.data.marathonData[index]._id
    var _value = app.globalData.userInfo.favorites
    _value = that.checkAndPush(_value, _id)

    app.globalData.userInfo.favorites = _value

    that.updateUserData(app.globalData.openid, "favorites", _value)

    var key = "that.data.marathonData["+index+"].isFavorites"; 
    var value = !that.data.marathonData[index].isFavorites
    
    console.log(key, value)

    that.setData({
      [key]: value
    })
  },
  
  // 切换tab
  onChange(event) {
    //切换标签
    wx.showToast({
      title: '切换到标签 ${event.detail.index + 1}',
      icon: 'none'
    });

  },

  setFavorites(marathonData) {
    var favorites =JSON.parse( app.globalData.userInfo.favorites )
    app.globalData.userInfo.favorites = favorites
    console.log(favorites)
    marathonData.forEach( (m) => {
      // console.log("load index", m._id)
      var exist = favorites.includes(m._id)
      if (exist) {
        m["isFavorite"] = true
      } else {
        m["isFavorite"] = false
      }
    })
  },

  getMarathonData: function (tablename, skipindex) {
    var that = this
    that.marathon = wx.cloud.database().collection(tablename)
    that.marathon.skip(skipindex * that.data.pagenum)
    .limit(that.data.pagenum).get({
      success(res) {
        console.log("res data", res.data)
        // 页尾
        if (res.data.length === 0) {
          that.data.ispageend = true
        }
        
        // 设置收藏
        that.setFavorites(res.data)

        // 分页加载
        if (skipindex === 0) {
          that.setData({
            marathonData: res.data
          })
        } else {
          var tmp = that.data.marathonData
          tmp = tmp.concat(res.data)
          console.log("add data", tmp)
          that.setData({
            marathonData: tmp
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.data.pageindex = 0

    // 延时读取userid
    setTimeout(function () {
      that.getMarathonData('marathon', 0)
    }, 1000)

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
    //切换标签
    var that = this

    if (!that.data.ispageend) {
      that.data.pageindex += 1
      that.getMarathonData('marathon', that.data.pageindex)
    } else {
      wx.showToast({
        title: '到底了',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})