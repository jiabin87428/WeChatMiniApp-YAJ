// pages/check/firstCheck.js
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 企业ID
    qyid : '',
    // 任务ID
    rwid : '',
    // 是否需要复查
    needReCheck : false,
    // 处理情况
    clqk : '',

    // 基本信息和安全管理信息对象
    baseAndSaftyObj : {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var qyid = options.id
    var rwid = options.rwid
    var clqk = options.clqk
    var sfxfc = Boolean(options.sfxfc)
    this.setData({
      qyid: qyid,
      rwid: rwid,
      clqk: clqk,
      needReCheck: sfxfc
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
    this.getBaseAndSaftyInfo()
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

  // 跳转企业基本信息
  jumpBaseInfo: function () {
    wx.navigateTo({
      url: '../check/baseInfo?data=' + JSON.stringify(this.data.baseAndSaftyObj) + '&qyid=' + this.data.qyid
    })
  },

  // 跳转安全生产管理信息
  jumpSafety: function () {
    wx.navigateTo({ 
      url: '../check/safetyManage?data=' + JSON.stringify(this.data.baseAndSaftyObj) + '&qyid=' + this.data.qyid
    })
  },

  // 跳转设备信息
  jumpDevice: function (e) {
    wx.navigateTo({
      url: '../check/deviceInfo?qyid=' + this.data.qyid
    })
  },

  // 跳转隐患列表
  jumpDangerList: function () {
    wx.navigateTo({
      url: '../danger/dangerCheckList?data=' + JSON.stringify(this.data.baseAndSaftyObj) + '&qyid=' + this.data.qyid
    })
  },

  // 是否需要复查
  switch2Change: function (e) {
    this.setData({
      needReCheck: e.detail.value
    })
  },

  // 跳转输入页面
  jumpInput: function (e) {
    var viewId = e.currentTarget.id;
    var placeholder = ""
    var inputstring = ""
    if (viewId == "clqk") {
      placeholder = "请输入处理情况"
      inputstring = this.data.clqk
    }
    wx.navigateTo({
      url: '../common/inputPage?id=' + viewId + '&placeholder=' + placeholder + '&inputstring=' + inputstring
    })
  },

  // 获取企业基本信息和安全生产管理现状信息
  getBaseAndSaftyInfo: function () {
    var that = this
    //调用接口
    request.requestLoading(config.getBaseAndSaftyInfo + that.data.qyid, null, '正在加载数据', function (res) {
      console.log(res)
      if (res != null) {
        that.setData({
          baseAndSaftyObj: res
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
  },
  // 更新任务信息
  submitClick: function (e) {
    var that = this
    var params = {
      rwid: that.data.rwid,
      sfxfc: that.data.needReCheck,
      clqk: that.data.clqk,
    }
    //调用接口
    request.requestLoading(config.updateRw, params, '正在加载数据', function (res) {
      console.log(res)
      if (res != null) {
        if (res.repCode == '200') {
          wx.showToast({
            title: '保存成功',
            complete: wx.navigateBack({
              delta: 1
            })
          })
        }
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
  },
})