// pages/me/me.js
var app = getApp()
var config = require('../../utils/config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否企业用户
    isqy: 'false',
    // 用户类型
    yhlx: 0,
    // 用户ID
    userid: '',
    // 用户头像链接
    logo: '',
    roleName:'企业用户',
    // 企业用户显示
    // 企业全称
    showCompanyName: '企业名称',
    // 企业属地
    showCompanyPlace: null,
    // 企业类型
    showCompanyType: '企业类型',
    // 联系人
    showContact: '企业联系人',
    // 联系方式
    showPhone: '联系方式',
    // 邮箱
    showEmail: '邮箱',
    // 企业地址
    showAddress: '企业地址',

    // 监管用户显示
    // 姓名
    name: '姓名',
    // 性别
    sex: '性别',
    // 岗位
    job: '岗位',
    // 所在部门
    dep: '所在部门',
    // 联系手机
    mobile: '联系手机',
    // 邮箱
    email: '邮箱',

    longitude: '0',
    latitude: '0',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    this.checkLogin()
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

  // 用户点击换头像
  changeLogo: function (e) {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      success: function (res) {
        that.setData({
          logo: res.tempFilePaths[0]
        })
        app.uploadDIY('?qyid=' + that.data.userid, [that.data.logo], 0, 0, 0, 1, function (resultCode) {
          if (resultCode == '200') {
            that.checkLogin()
          }
        })
      }
    })
  },
  // 退出登录
  loginOut: function () {
    var that = this
    wx.removeStorage({
      key: 'userInfo',
      success: function (res) {
        app.checkLogin()
      }
    })
  },
  // 判断是否登录
  checkLogin: function () {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        app.globalData.userInfo = res.data
        that.setData({
          yhlx: app.globalData.userInfo.yhlx,
          userid: app.globalData.userInfo.userid
        })
        if (app.globalData.userInfo.yhlx == 2) {// 检查用户
          that.setData({
            isqy: 'false',
            roleName: '检查人',
            logo: config.logoImg + app.globalData.userInfo.repRecordid,
            showCompanyName: app.globalData.userInfo.name,
            longitude: app.globalData.userInfo.mapx,
            latitude: app.globalData.userInfo.mapy,
          })
        } else if (app.globalData.userInfo.yhlx == 3) {// 管理者
          that.setData({
            isqy: 'false',
            roleName: '管理者',
            logo: config.logoImg + app.globalData.userInfo.repRecordid,
            showCompanyName: app.globalData.userInfo.name,
            longitude: app.globalData.userInfo.mapx,
            latitude: app.globalData.userInfo.mapy,
          })
        } else if (app.globalData.userInfo.yhlx == 4) {// 政府
          that.setData({
            isqy: 'false',
            roleName: '政府',
            logo: config.logoImg + app.globalData.userInfo.repRecordid,
            showCompanyName: app.globalData.userInfo.name,
            longitude: app.globalData.userInfo.mapx,
            latitude: app.globalData.userInfo.mapy,
          })
        }
        console.log(app.globalData.userInfo)
      }, fail: function (res) {
        wx.navigateTo({
          url: '../login/login'
        })
      }
    })
  },
  // 跳转设置页面
  jumpSetting: function (e) {
    wx.navigateTo({
      url: '../me/editMe?longitude=' + this.data.longitude + '&latitude=' + this.data.latitude
    })
  },

  // MARK：检查人（工程师）页面方法
  // 跳转已完成项目页面
  jumpFinish: function (e) {
    wx.navigateTo({
      url: '../me/taskInMe?state=' + '已完成'
    })
  },
  // 跳转任务排班页面
  jumpPlan: function (e) {
    wx.navigateTo({
      url: '../me/taskInMe?state=' + '未完成'
    })
  },
  // 跳转报告管理页面
  jumpManage: function (e) {
    wx.navigateTo({
      url: '../me/taskInMe?state=' + '未完成'
    })
  },

})