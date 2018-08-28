var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: 0,
    // 任务列表数据
    missionList : [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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
    this.getMissionList()
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

  // 跳转任务页面
  jumpMission: function (e) {
    // wx.navigateTo({
    //   url: '../danger/danger'
    // })
    var idx = e.currentTarget.dataset.index
    var item = e.currentTarget.dataset.item
    var qyid = item.qyid
    wx.navigateTo({
      url: '../check/firstCheck?id=' + qyid + '&rwid=' + item.rwid + '&sfxfc=' + item.sfxfc + '&clqk=' + item.clqk
    })
  },

  // 获取任务列表
  getMissionList: function () {
    var userid = app.globalData.userInfo.userid
    var that = this
    //调用接口
    request.requestLoading(config.getRw + 'userid=' + userid + '&clzt!=已完成', null, '正在加载数据', function (res) {
      console.log(res)
      if (res.repRwxx != null) {
        that.setData({
          missionList: res.repRwxx
        })
      } else {
        wx.showToast({
          title: res.repMsg,
        })
      }
    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  }
})