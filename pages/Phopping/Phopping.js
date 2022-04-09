// pages/Phopping/Phopping.js
Page({
  onShareAppMessage() {
    return {
      title: 'checkbox',
      path: 'page/component/pages/checkbox/checkbox'
    }
  },

  data: {
    items: [],
    selectAll: false,
    sumPrice: '',
  },
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'useriofo',
      success(res) {
        that.setData({
          useriofo: res.data
        })
        that.datas(res.data)
      }
    })


  },
  datas(e) {
    var that = this
    wx.request({
      url: 'http://localhost:8080/api/getCart?userId=' + e.id,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          items: res.data.data.carts,
          sumPrice: res.data.data.sumPrice
        })
      }
    })
  },

  contact() {
    var that = this
    wx.redirectTo({
      url: '../orderbuy/orderbuy?recode=' + that.data.useriofo.id
    })
  }
})