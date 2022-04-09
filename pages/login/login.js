// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pwd: '',
    user: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  user: function (event) {
    this.setData({ user: event.detail.value });
  },
  pwd: function (event) {
    this.setData({ pwd: event.detail.value });
  },
  submite() {
    var that = this
    // /login userName password
    wx.request({
      url: 'http://localhost:8080/api/login?userName=' + this.data.user + '&password=' + this.data.pwd,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.setStorage({
          key: "useriofo",
          data: res.data.data
        })
        wx.showToast({
          title: '登录成功',
          icon: 'success',
        })
        wx.redirectTo({
          url: '../my/my',
        })
      }
    })
  }
})