
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
var amapFile = require('../../libs/amap-wx.js');

var app = getApp()
Page({
  data: {
    /**  
        * 页面配置  
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换    
    currentTab: 0,
    // 用户类型
    yhlx: 0,
    // 顶部统计栏高度
    titleHeight: 144,
    // 地图上的标记
    markers: [],
    latitude: 0,
    longitude: 0,
    // 当前定位地址
    currentLocation: '尚未获得定位信息',

    // MARK:企业用
    // 隐患总数
    yhzs: 0,
    // 已整改隐患数
    yzgyhs: 0,
    // 未整改隐患数
    wzgyhs: 0,

    // MARK:非企业用
    // 法律法规总数
    flfgzs: 0,
    // 隐患库总数
    yhkzs: 0,

  },
  onLoad: function (e) {
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
      url: '../login/chooseLoginType'
    })
  },
  // 点击添加隐患
  addClick: function () {
    if(!this.checkLogin()) {
      wx.navigateTo({
        url: '../login/chooseLoginType'
      })
      return
    }else{
      wx.navigateTo({
        url: '../danger/addDanger'
      })
    }
  },
  // 点击隐患列表
  listClick: function () {
    if(!this.checkLogin()) {
      wx.navigateTo({
        url: '../login/chooseLoginType'
      })
      return
    } else {
      wx.navigateTo({
        url: '../danger/dangerList'
      })
    }
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
        })
        that.getStatistics()
        if (app.globalData.userInfo != null) {
          var callout = {
            content: app.globalData.userInfo.name,
            color: '#FFFFFF',
            bgColor: '#018B0D',
            borderRadius: 5,
            padding: 5,
            display: 'ALWAYS'
          }
          var mark = [{
            iconPath: "../../assets/company_position.png",
            id: 99999,
            latitude: app.globalData.userInfo.mapy,
            longitude: app.globalData.userInfo.mapx,
            width: 30,
            height: 30,
            callout: callout
          }]
          if (app.globalData.userInfo.yhlx == '1') {
            that.setData({
              // longitude: app.globalData.userInfo.mapx,
              // latitude: app.globalData.userInfo.mapy,
              titleHeight: 116,
              markers: mark
            })
          } else {
            that.setData({
              // longitude: app.globalData.userInfo.mapx,
              // latitude: app.globalData.userInfo.mapy,
              currentLocation: app.globalData.userInfo.dep,
              titleHeight: 68,
              markers: mark
            })
          }
        }
        if (that.data.latitude == 0 && that.data.longitude == 0) {
          that.getCurrentLocation()
        }
        console.log(app.globalData.userInfo)
      }, fail: function (res) {
        wx.navigateTo({
          url: '../login/chooseLoginType'
        })
      }
    })
    // if (app.globalData.userInfo) {
    //   return true
    // }
    // return false
  },

  // 获取统计数据
  getStatistics: function () {
    var that = this
    var params = {
      "userid": app.globalData.userInfo.userid
    }
    request.requestLoading(config.getTj, params, '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      console.log(res)
      var markList = that.data.markers

      if (app.globalData.userInfo.yhlx == '1') {
        for (var i = 0; i < res.list.length; i++) {
          var item = res.list[i]
          var callout = {
            content: item.qymc,
            color: '#FFFFFF',
            bgColor: '#5490FF',
            borderRadius: 5,
            padding: 5,
            display: 'ALWAYS'
          }
          var mark = {
            id: item.qyid,
            latitude: item.mapy,
            longitude: item.mapx,
            iconPath: '../../assets/danger_position.png',
            width: 30,
            height: 30,
            callout: callout
          }
          markList.push(mark)
        }
        that.setData({
          markers: markList,
          flfgzs: res.flfgzs,
          yhkzs: res.yhkzs
        })
      } else {
        for (var i = 0; i < res.list.length; i++) {
          var item = res.list[i]
          var color = ''
          if (item.zgzt == '0') {// 已整改
            color = '#0A6BDA'
          } else if (item.zgzt == '1') {// 未整改
            color = '#FF6B2D'
          }else {// 草稿
            color = '#2FD065'
          }
          var icon = ''
          if (item.zgzt == '0') {// 已整改
            icon = '../../assets/danger_done.png'
          } else if (item.zgzt == '1') {// 未整改
            icon = '../../assets/danger_undo.png'
          } else {// 草稿
            icon = '../../assets/danger_draft.png'
          }

          var callout = {
            content: item.yhms,
            color: '#FFFFFF',
            bgColor: color,
            borderRadius: 5,
            padding: 5,
            display: 'ALWAYS'
          }
          var mark = {
            id: i,
            latitude: item.mapy == "" ? 0 : item.mapy,
            longitude: item.mapx == "" ? 0 : item.mapx,
            iconPath: icon,
            width: 30,
            height: 30,
            callout: callout,
            yhid: item.yhid,
            zgzt: item.zgzt
          }
          markList.push(mark)
        }
        that.setData({
          markers: markList,
          yhzs: res.yhzs,
          yzgyhs: res.yzg,
          wzgyhs: res.wzg
        })
      }
    }, function () {
      wx.showToast({
        title: '加载数据失败',
        icon: 'none'
      })
    })
  },
  // 添加隐患
  addClick: function (e) {
    wx.navigateTo({
      url: '../danger/addDanger'
    })
  },
  // 获取当前位置
  getCurrentLocation: function (e) {
    var that = this
    var myAmapFun = new amapFile.AMapWX({ key: 'f28afe6170399e78d1f7e1b672c1fa49' });
    myAmapFun.getRegeo({
      success: function (data) {
        that.setData({
          markers: data
        })
        if (data.length > 0) {
          that.setData({
            latitude: data[0].latitude,
            longitude: data[0].longitude,
            currentLocation: '您正在：' + data[0].name
          })
        }
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
  },
  // maker点击事件
  makertap: function (e) {
    console.log(e)
    // 暂时不加点击事件
    // if (app.globalData.userInfo.yhlx == '1') { // 监管用户
    //   if (e.markerId != '99999') { // 点击的不是监管用户本身
    //     wx.navigateTo({
    //       url: '../application/companyInfoList?qyid=' + e.markerId
    //     })
    //   }
    // }else {// 企业用户
    //   if (e.markerId != '99999') { // 点击的不是企业本身的坐标点
    //     var mark = this.data.markers[e.markerId+1]
    //     this.getDetail(mark.yhid, mark.zgzt)
    //   }
    // }
  },
  // 查看隐患详情
  getDetail: function (dangerId,zgzt) {
    wx.navigateTo({
      url: '../danger/dangerDetail?yhid=' + dangerId + '&zgzt=' + zgzt
    })
  },
})    