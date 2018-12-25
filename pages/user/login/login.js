// pages/user/login/login.js
import { Api } from '../../../utils/api.js'
let api = new Api()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    userDetail: ''
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
    this.getUserCode()
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
   * 自定义方法
   */
  goBack: function () {
    wx.navigateBack({})
  },

  getUserCode: function () {
    var that = this
    wx.login({
      success: function (res) {
        that.setData({
          code: res.code
        })
      }
    })
  },

  getUserInfo: function (e) {
    var errMsg = e.detail.errMsg;
    if (errMsg == "getUserInfo:ok") {
      this.userLogin(e.detail)
    } else {
      wx.showToast({
        title: '用户登录失败',
        icon: 'none'
      })
    }
  },

  userLogin: function (userDetail) {
    wx.showLoading({
      title: '正在登录',
    })
    var that = this
    api.userLogin({
      data: {
        code: this.data.code,
        encryptedData: userDetail.encryptedData,
        iv: userDetail.iv
      },
      success: function (res) {
        var userToken = res.data.obj.token
        getApp().globalData.userToken = userToken
        wx.setStorage({
          key: 'userToken',
          data: userToken,
        })
        wx.navigateBack({

        })
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  }
})