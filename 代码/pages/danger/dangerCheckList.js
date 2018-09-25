var app = getApp()
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
// pages/danger/dangerCheckList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: 0,
    // 隐患列表
    dangerList: [],
    // 当前选中tab页 0-全部 1-未整改 2-已整改
    currentTab: 0,
    // 项目id
    xmid: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var xmid = options.xmid
    if (xmid != null) {
      that.setData({
        xmid: xmid
      })
    }
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
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
    var that = this
    var params = {
      "userid": app.globalData.userInfo.userid,
      "xmid": that.data.xmid
    }
    if (that.data.currentTab == 1) {
      params["sfyzg"] = "false"
    } else if (that.data.currentTab == 2) {
      params["sfyzg"] = "true"
    }
    this.reqDangerList(params)
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 切换Tab页面
  changeTap: function(e) {
    var that = this
    var viewId = e.currentTarget.id;
    that.setData({
      currentTab: viewId
    })

    var params = {
      "userid": app.globalData.userInfo.userid,
      "xmid": that.data.xmid
    }
    if (that.data.currentTab == 1) {
      params["sfyzg"] = "false"
    } else if (that.data.currentTab == 2) {
      params["sfyzg"] = "true"
    }
    this.reqDangerList(params)
  },
  // 点击查看隐患详情
  getDetail: function (e) {
    wx.navigateTo({
      url: '../danger/dangerDetail?yhid=' + e.currentTarget.dataset.id + '&sfyzg=' + e.currentTarget.dataset.name
    })
  },
  // 获取隐患列表
  reqDangerList: function (searchObj, cb) {
    var that = this
    //调用接口
    request.requestLoading(config.getYhList, searchObj, '正在加载数据', function (res) {
      console.log(res)
      if (res.repYhList != null) {
        that.setData({
          dangerList: res.repYhList
        })
      }else {
        wx.showToast({
          title: res.repMsg,
          icon: 'none'
        })
      }
    }, function () {
      wx.showToast({
        title: '加载数据失败',
        icon: 'none'
      })
    })
  },
})