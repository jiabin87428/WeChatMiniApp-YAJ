// pages/me/companyEdit.js
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: "",

    qyid: "",
    longitude: 0,
    latitude: 0,
    address: "",

    // 企业名称
    qymc: "",
    // 主要负责人
    zyfzr: "",
    // 主要负责人电话
    zyfzrdh: "",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userid = options.userid
    that.setData({
      userid: userid,
    })

    if (options.item == null) {
      return
    }
    var item = JSON.parse(options.item)
    if (item != null) {
      that.setData({
        qyid: item.id,
        qymc: item.name,
        longitude: item.mapx,
        latitude: item.mapy,
        address: item.qydz,
        zyfzr: item.zyfzr,
        zyfzrdh: item.zyfzrdh,
      })
    }
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
  // 跳转输入页面
  jumpInput: function (e) {
    var viewId = e.currentTarget.id;
    var placeholder = ""
    var inputstring = ""
    if (viewId == "qymc") {
      placeholder = "请输入企业名称"
      inputstring = this.data.qymc
    } else if (viewId == "zyfzr") {
      placeholder = "请输入主要负责人姓名"
      inputstring = this.data.zyfzr
    } else if (viewId == "zyfzrdh") {
      placeholder = "请输入主要负责人电话"
      inputstring = this.data.zyfzrdh
    }
    wx.navigateTo({
      url: '../common/inputPage?id=' + viewId + '&placeholder=' + placeholder + '&inputstring=' + inputstring
    })
  },
  // 跳转地图坐标选择
  jumpLocation: function (e) {
    wx.navigateTo({
      url: '../common/chooseLocation'
    })
  },
  // 保存
  saveClick: function (e) {
    var that = this
    var params = {
      "userid": that.data.userid,
      "qyid": that.data.qyid,
      "qymc": that.data.qymc,
      "zyfzr": that.data.zyfzr,
      "zyfzrdh": that.data.zyfzrdh,
      "qydz": that.data.address,
      "mapx": that.data.longitude,
      "mapy": that.data.latitude
    }
    request.requestLoading(config.editCompany, params, '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      console.log(res)
      if (res.repCode == '200') {
        wx.showToast({
          title: res.repMsg,
          complete: setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        })
      } else {
        wx.showToast({
          title: res.repMsg,
          icon: 'none'
        })
      }
    }, function () {
      wx.showToast({
        title: '编辑失败',
      })
    })
  },
})