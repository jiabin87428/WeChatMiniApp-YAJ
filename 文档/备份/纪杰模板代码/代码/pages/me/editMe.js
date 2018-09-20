// pages/me/editMe.js
var app = getApp()
var config = require('../../utils/config.js')
var request = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否可编辑
    editable: 'true',
    // 是否企业用户
    isqy: 'false',
    // 用户类型
    yhlx: 0,
    // 用户ID
    userid: '',
    // 修改的参数

    // 电话
    phone: '联系电话',
    // 手机
    mobile: '联系手机',
    // 邮箱
    email: '邮箱',

    // 监管用户显示
    // 姓名
    name: '姓名',
    // 性别
    sex: '性别',
    // 岗位
    job: '岗位',

    // 检查人显示
    // 职称
    jobTitle: '职称',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkLogin()
    var editable = options.editable
    if (editable != null) {
      this.setData({
        editable: editable
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
    if (this.data.editable == 'false') {
      return
    }
    var viewId = e.currentTarget.id;
    var placeholder = ""
    var inputstring = ""
    if (viewId == "companyName") {
      placeholder = "请输入企业名称"
      inputstring = this.data.companyName
    } else if (viewId == "contact") {
      placeholder = "请输入联系人"
      inputstring = this.data.contact
    } else if (viewId == "phone") {
      placeholder = "请输入联系方式"
      inputstring = this.data.phone
    } else if (viewId == "email") {
      placeholder = "请输入邮箱"
      inputstring = this.data.email
    } else if (viewId == "address") {
      placeholder = "请输入企业地址"
      inputstring = this.data.address
    } else if (viewId == "name") {
      placeholder = "请输入姓名"
      inputstring = this.data.name
    } else if (viewId == "sex") {
      placeholder = "请输入性别"
      inputstring = this.data.sex
    } else if (viewId == "job") {
      placeholder = "请输入岗位"
      inputstring = this.data.job
    } else if (viewId == "dep") {
      placeholder = "请输入所在部门"
      inputstring = this.data.dep
    } else if (viewId == "jgEmail") {
      placeholder = "请输入邮箱"
      inputstring = this.data.email
    } else if (viewId == "mobile") {
      placeholder = "请输入联系手机"
      inputstring = this.data.mobile
    }
    wx.navigateTo({
      url: '../common/inputPage?id=' + viewId + '&placeholder=' + placeholder + '&inputstring=' + inputstring
    })
  },
  // 跳转单选列表
  jumpRadio: function (e) {
    if (this.data.editable == 'false') {
      return
    }
    var that = this
    var viewId = e.currentTarget.id;
    var sourceData = null
    var selected = null
    if (viewId == "companyPlace") {
      selected = this.data.companyPlace
      //调用应用实例的方法获取全局数据
      app.getCompanyPlace(null, function (companyPlace) {
        sourceData = companyPlace
        that.jumpRadioPage(viewId, sourceData, selected)
      })
    } else if (viewId == "companyType1") {
      selected = null
      //调用应用实例的方法获取全局数据
      app.getCompanyType(null, function (companyType) {
        sourceData = companyType
        that.jumpRadioPage(viewId, sourceData, selected)
      })
    }
  },
  jumpRadioPage: function (viewId, sourceData, selected) {
    wx.navigateTo({
      url: '../common/selectRadioList?id=' + viewId + '&data=' + JSON.stringify(sourceData) + '&selected=' + JSON.stringify(selected)
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
          isqy: 'false',
          yhlx: app.globalData.userInfo.yhlx,
          userid: app.globalData.userInfo.userid,
          // 姓名
          name: app.globalData.userInfo.name == null ? '' : app.globalData.userInfo.name,
          // 性别
          sex: app.globalData.userInfo.sex == null ? '' : app.globalData.userInfo.sex,
          // 职称
          jobTitle: app.globalData.userInfo.title == null ? '' : app.globalData.userInfo.title,
          // 岗位
          job: app.globalData.userInfo.job == null ? '' : app.globalData.userInfo.job,
          // 联系电话
          phone: app.globalData.userInfo.phone == null ? '' : app.globalData.userInfo.phone,
          // 联系手机
          mobile: app.globalData.userInfo.mobile == null ? '' : app.globalData.userInfo.mobile,
          // 邮箱
          email: app.globalData.userInfo.email == null ? '' : app.globalData.userInfo.email
        })
        console.log(app.globalData.userInfo)
      }, fail: function (res) {
        wx.navigateTo({
          url: '../login/login'
        })
      }
    })
  },
  // 提交按钮
  submit: function (e) {
    var that = this
    var params = {
      "userid": this.data.userid,
      "name": this.data.name,
      "sex": this.data.sex,
      "title": this.data.jobTitle,
      "job": this.data.job,
      "phone": this.data.phone,
      "mobile": this.data.mobile,
      "email": this.data.email
    }


    request.requestLoading(config.updateQyxx, params, '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      console.log(res)
      if (res.repCode == '200') {
        wx.showToast({
          title: '修改成功',
          complete: wx.navigateBack({
            delta: 1
          })
        })
        wx.setStorage({
          key: "userInfo",
          data: res
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
  // 跳转地图坐标选择
  jumpLocation: function (e) {
    wx.navigateTo({
      url: '../common/chooseLocation?longitude=' + this.data.longitude + '&latitude=' + this.data.latitude
    })
  }
})