// pages/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useriofo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getStorage({
      key: 'useriofo',
      success(res) {
        that.setData({
          useriofo: res.data
        })
      }
    })
  },
  goType() {
    wx.redirectTo({
      url: '../type/type',
    })
  },
  goPhopping() {
    wx.redirectTo({
      url: '../Phopping/Phopping',
    })
  },
  gologin() {
    wx.redirectTo({
      url: '../login/login',
    })
  },
  goregistered() {
    wx.redirectTo({
      url: '../registered/registered',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  //跳转首页
  goHome() {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  CopyLink() {
    wx.redirectTo({
      url: '../order/order',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})