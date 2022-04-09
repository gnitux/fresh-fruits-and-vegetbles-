var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    useriofo: {},
    commodity: [{
        value: 1,
        name: "大闸蟹"
      },
      {
        value: 2,
        name: "大闸蟹"
      }
    ]
  },
  onLoad: function (opertiom) {
    var that = this;
    wx.getStorage({
      key: 'useriofo',
      success(res) {
        console.log(res.data)
        that.datas(res.data.id)
      }
    })

  },
  datas(id) {
    var that = this
    // 获取用户订单 / getUserOrder userId
    wx.request({
      url: 'http://localhost:8080/api/getUserOrder?userId=' + id,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.data)
        // foreach
        res.data.data.forEach((item) => {
          if (item.status == 0){
            item.status ="未支付"
            
          } else if (item.status == 1){
            item.status = "已下单"
          } else if (item.status == 2) {
            item.status = "已审核"
          } else if (item.status == 3) {
            item.status = "已发货"
          } else if (item.status == 4) {
            item.status = "已收货"
          }
        })
        that.setData({
          commodity: res.data.data
        });
      }
    })
  },
});