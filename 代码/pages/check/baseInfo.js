var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否可编辑
    editable: 'true',

    // 企业ID
    qyid: '',

    // 企业名称
    qymc: '',
    // 企业地址
    qydz: '',
    // 占地面积
    zdmj: '',
    // 建筑面积
    jzmj: '',
    // 企业人数
    qyrs: '',
    // 安全管理人数
    aqglrs: '',
    // 产品描述（描述主要产品及产量）
    cpms: '',
    // 设备描述（描述主要设施设备）
    sbms: '',
    // 主要负责人
    zyfzr: '',
    // 主要负责人电话
    zyfzrdh: '',
    // 安全负责人
    aqfzr: '',
    // 安全负责人电话
    aqfzrdh: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var qyid = options.qyid
    var params = JSON.parse(options.data)
    this.setData({
      // 企业ID
      qyid: qyid,
      // 企业名称
      qymc: params.qymc,
      // 企业地址
      qydz: params.qydz,
      // 占地面积
      zdmj: params.zdmj,
      // 建筑面积
      jzmj: params.jzmj,
      // 企业人数
      qyrs: params.qyrs,
      // 安全管理人数
      aqglrs: params.aqglrs,
      // 产品描述（描述主要产品及产量）
      cpms: params.cpms,
      // 设备描述（描述主要设施设备）
      sbms: params.sbms,
      // 主要负责人
      zyfzr: params.zyfzr,
      // 主要负责人电话
      zyfzrdh: params.zyfzrdh,
      // 安全负责人
      aqfzr: params.aqfzr,
      // 安全负责人电话
      aqfzrdh: params.aqfzrdh,
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
    if (this.data.editable == 'false') {
      return
    }
    var viewId = e.currentTarget.id;
    var placeholder = ""
    var inputstring = ""
    if (viewId == "qydz") {
      placeholder = "请输入公司地址"
      inputstring = this.data.qydz
    } else if (viewId == "zdmj") {
      placeholder = "请输入企业占地面积（平方米）"
      inputstring = this.data.zdmj
    } else if (viewId == "jzmj") {
      placeholder = "请输入企业建筑面积（平方米）"
      inputstring = this.data.jzmj
    } else if (viewId == "qyrs") {
      placeholder = "请输入企业人数"
      inputstring = this.data.qyrs
    } else if (viewId == "aqglrs") {
      placeholder = "请输入安全管理人数"
      inputstring = this.data.aqglrs
    } else if (viewId == "cpms") {
      placeholder = "请输入产品描述"
      inputstring = this.data.cpms
    } else if (viewId == "sbms") {
      placeholder = "请输入设备描述"
      inputstring = this.data.sbms
    } else if (viewId == "zyfzr") {
      placeholder = "请输入主要负责人姓名"
      inputstring = this.data.zyfzr
    } else if (viewId == "zyfzrdh") {
      placeholder = "请输入主要负责人电话"
      inputstring = this.data.zyfzrdh
    } else if (viewId == "aqfzr") {
      placeholder = "请输入安全负责人姓名"
      inputstring = this.data.aqfzr
    } else if (viewId == "aqfzrdh") {
      placeholder = "请输入安全负责人电话"
      inputstring = this.data.aqfzrdh
    }
    wx.navigateTo({
      url: '../common/inputPage?id=' + viewId + '&placeholder=' + placeholder + '&inputstring=' + inputstring
    })
  },
  // 保存信息
  submit: function () {
    if (this.validateData() == true) {
      var that = this
      //调用接口
      request.requestLoading(config.updateBaseInfoAndSaftyInfo, that.data, '正在加载数据', function (res) {
        console.log(res)
        if (res != null) {
          if (res.repCode == null || res.repCode != '500') {
            wx.navigateBack({
              delta: 1
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
    }
  },
  // 校验信息是否都填写
  validateData: function () {
    if (this.data.qymc == '') {
      wx.showToast({
        title: '请完善企业名称',
        icon: 'none'
      })
      return false
    } else if (this.data.qydz == ''){
      wx.showToast({
        title: '请完善企业地址',
        icon: 'none'
      })
      return false
    } else if (this.data.zdmj == '') {
      wx.showToast({
        title: '请完善占地面积',
        icon: 'none'
      })
      return false
    } else if (this.data.jzmj == '') {
      wx.showToast({
        title: '请完善建筑面积',
        icon: 'none'
      })
      return false
    } else if (this.data.qyrs == '') {
      wx.showToast({
        title: '请完善企业人数',
        icon: 'none'
      })
      return false
    } else if (this.data.aqglrs == '') {
      wx.showToast({
        title: '请完善安全管理人数',
        icon: 'none'
      })
      return false
    } else if (this.data.cpms == '') {
      wx.showToast({
        title: '请完善产品描述',
        icon: 'none'
      })
      return false
    } else if (this.data.sbms == '') {
      wx.showToast({
        title: '请完善设备描述',
        icon: 'none'
      })
      return false
    } else if (this.data.zyfzr == '') {
      wx.showToast({
        title: '请完善主要负责人',
        icon: 'none'
      })
      return false
    } else if (this.data.zyfzrdh == '') {
      wx.showToast({
        title: '请完善主要负责人电话',
        icon: 'none'
      })
      return false
    } else if (this.data.aqfzr == '') {
      wx.showToast({
        title: '请完善安全负责人',
        icon: 'none'
      })
      return false
    } else if (this.data.aqfzrdh == '') {
      wx.showToast({
        title: '请完善安全负责人电话',
        icon: 'none'
      })
      return false
    }
    return true
  }
})