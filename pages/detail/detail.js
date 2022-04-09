// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recArr: {},
    useriofo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'useriofo',
      success(res) {
        that.setData({
          useriofo: res.data
        })
      }
    })
    wx.request({
      url: 'http://localhost:8080/api/getProd?id=' + options.id,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          recArr: res.data.data
        })
      }
    })
  },
  contact() {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  goOrder() {
    var that = this
    wx.redirectTo({
      url: '../orderbuy/orderbuy?id=' + that.data.recArr.id + '&userId=' +that.data.useriofo.id,
    })
  },
  goPhopping() {
    wx.redirectTo({
      url: '../Phopping/Phopping',
    })
  },
  goPhoppcard() {
    var that = this;
    let userId = that.data.useriofo.id
    wx.request({
      url: 'http://localhost:8080/api/addCart?prodId=' + this.data.recArr.id + '&userId=' + userId,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
        })
      }
    })
  }
})