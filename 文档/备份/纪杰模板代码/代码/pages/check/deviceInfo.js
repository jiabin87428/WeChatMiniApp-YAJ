// pages/check/deviceInfo.js
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 企业ID
    qyid: '',
    // 设备信息列表
    sbList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var qyid = options.qyid
    this.setData({
      qyid: qyid
    })
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
    this.getDeviceInfo()
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

  // 获取设备信息
  getDeviceInfo: function () {
    var that = this
    //调用接口
    request.requestLoading(config.getSb + that.data.qyid, null, '正在加载数据', function (res) {
      console.log(res)
      if (res.repSbxx != null) {
        that.setData({
          sbList: res.repSbxx
        })
      }
    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  },

  // 跳转设备详情
  jumpDeviceDetail: function (e) {
    var item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../check/deviceDetail?data=' + JSON.stringify(item)
    })
  },

  // 返回上一页
  submit: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },
})