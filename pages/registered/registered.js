// pages/registered/registered.js
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
  phone: function (event) {
    this.setData({ phone: event.detail.value });
  },
  addr: function (event) {
    this.setData({ addr: event.detail.value });
  },
  submite() {
    var that = this
    // 注册： /register 传参  userName / phone / addr（收货地址） /password
    wx.request({
      url: 'http://localhost:8080/api/register?userName=' + this.data.user + '&password=' + this.data.pwd + '&phone=' + this.data.phone + '&addr=' + this.data.addr,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.setStorageSync('newsCollect', res.data.data);
        wx.showToast({
          title: '注册成功',
          icon: 'success',
        })
        wx.redirectTo({
          url: '../login/login',
        })
      }
    })
  }
})