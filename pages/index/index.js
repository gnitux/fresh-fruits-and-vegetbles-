// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    cardCur: 0,
    recArr: [],
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F285cf2a44557674f81b113e3011fd5153fb03d371306e-dmZ47X_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620115984&t=ce0d24b9dd18ae170a46f51ac8e6558f'
    }, {
      id: 1,
      type: 'image',
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01153f5c385794a8012090dbdc57b5.jpg%402o.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620115984&t=a0312843cc077c3fb5f9d9829f4bc7c8',
    }, {
      id: 2,
      type: 'image',
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01c30d5af953f7a8012160454b4cb2.png%401280w_1l_2o_100sh.png&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620115984&t=277b418a2abcce5d07f3f8160030d28a'
    }, {
      id: 3,
      type: 'image',
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01aa3d5c6a872fa801213f262ca0f7.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620115984&t=c29f953de37e27578eed23e954c57ef6'
    }, {
      id: 4,
      type: 'image',
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01cbe85c20c77fa8012029ac3c0e1c.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620115984&t=9d942c9aa8f20bb52a38b93d7888f9b5'
    }, {
      id: 5,
      type: 'image',
      url: 'https://img2.baidu.com/it/u=1767065434,2523139564&fm=26&fmt=auto&gp=0.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01e84c5c20c776a80121df90e5c15b.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620115984&t=901fc820e468f001484ab10e938bcf65'
    }],
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    this.towerSwiper('swiperList');
    this.getRec();
  },

  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  goMy() {
    wx.redirectTo({
      url: '../my/my',
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
  details: function (e) {
    var id = e.currentTarget.dataset.detailid;
    console.log(e.currentTarget.dataset)
    wx.redirectTo({
      url: '../detail/detail?id=' + id,
    })
  },
  // 获取推荐
  getRec() {
    let _this = this;
    wx.request({
      url: 'http://localhost:8080/api/getRec', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        _this.setData({
          recArr: res.data.data
        })
      }
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
})
