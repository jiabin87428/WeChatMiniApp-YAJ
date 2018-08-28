var app = getApp()
Page({
  data: {
    /**  
    * 页面配置  
    */
    winWidth: 0,
    winHeight: 0,
    // 是否企业用户
    isqy: true,
    // 用户类型
    yhlx: 0,
    // tab切换    
    currentTab: 0,
    //用户名
    userName: "请登录"
  },
  onLoad: function () {
    var that = this;

    /**  
     * 获取系统信息  
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  /**
   *  监听页面显示，
   *    当从当前页面调转到另一个页面
   *    另一个页面销毁时会再次执行
   */
  onShow: function () {
    this.checkLogin()
  },
  // 点击用户头像
  userClick: function () {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  // 点击添加隐患
  addClick: function () {
    wx.navigateTo({
      url: '../check/firstCheck'
    })
  },
  // 点击隐患列表
  listClick: function () {
    // wx.navigateTo({
    //   url: '../danger/dangerCheckList'
    // })

    var sourceData = null
    //调用应用实例的方法获取全局数据
    app.getCompanyName(null, function (companyName) {
      sourceData = companyName
      wx.navigateTo({
        url: '../common/companyList?data=' + JSON.stringify(sourceData)
      })
    })
  },

  // 判断是否登录
  checkLogin: function () {
    if (app.globalData.userInfo) {
      return true
    }
    return false
  },
  // 判断是否登录
  checkLogin: function () {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        app.globalData.userInfo = res.data
        that.setData({
          yhlx: app.globalData.userInfo.yhlx
          // yhlx: 4
        })
        if (app.globalData.userInfo.repIsqy == 'false') {
          that.setData({
            isqy: false
          })
        } else {
          that.setData({
            isqy: true
          })
        }
      }, fail: function (res) {
        wx.navigateTo({
          url: '../login/login'
        })
      }
    })
  },
})    