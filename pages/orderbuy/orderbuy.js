// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodity: {},
    useriofo: {},
    order: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'useriofo',
      success(res) {
        that.setData({
          useriofo: res.data
        })
      }
    })
    let url ="";
    let type=""
    if (options.recode) {
      url = 'http://localhost:8080/api/checkOutCart?userId=' + options.recode;
      type = "2"
    } else {
      url = 'http://localhost:8080/api/buyNow?prodId=' + options.id + '&userId=' + options.userId
      type = "1"
    }
    that.datas(url,type)

    // 立即订购：/buyNow  prodId user
  },
  datas(url, type) {
    var that = this;
    wx.request({
      url: url,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
      
        if (type=="2"){
          that.setData({
            commodity: res.data.data.shopCartList,
            order: res.data.data
          })
        }else{
          that.setData({
            commodity: res.data.data.pred,
            order: res.data.data.order
          })
        }
        
      }
    })
  },
  contact() {
    wx.redirectTo({
      url: '../order/order',
    })
  }
})