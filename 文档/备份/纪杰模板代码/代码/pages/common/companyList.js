var app = getApp()
// pages/common/selectRadioList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜否需要搜索栏
    needSearch: true,
    // 搜索栏高度
    searchHeight: 40,
    // 列表高度
    scrollHeight: 0,
    // 数据源
    sourceList: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = options.data
    this.setData({
      sourceList: JSON.parse(data)
    })

    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight - that.data.searchHeight
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
  /**
   * 选中企业，跳转隐患列表
   */
  chooseCompany: function (e) {
    wx.navigateTo({
      url: '../danger/dangerCheckList'
    })
  },
  // 搜索
  searchClick: function (e) {
    var that = this
    app.getCompanyName({ "companyName": e.detail.value }, function (companyName) {
      that.setData({
        sourceList: companyName
      })
    })
  },
  
})