// pages/user/index/index.js
import { Api } from '../../../utils/api.js'
import { Prompt } from '../../../utils/prompt.js'
let api = new Api()
let prompt = new Prompt()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
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
    if (this.data.userInfo == null) {
      this.getUserInfo()
    }
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
  getUserInfo: function () {
    var that = this
    api.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.data.obj
        })
      }
    })
  },

  logout: function () {
    var that = this
    prompt.showModal({
      title: '提示',
      content: '是否确定退出登录',
      confirmText: '退出',
      confirm: function () {
        wx.showLoading({
          title: '正在退出',
        })
        that.setData({
          userInfo: null
        })
        wx.removeStorageSync('userToken')
        getApp().globalData.userToken = ''
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
      }
    })
  },

  login: function () {
    wx.navigateTo({
      url: '/pages/user/login/login',
    })
  },

  goMyJoin: function () {
    wx.navigateTo({
      url: '/pages/activity/myJoin/myJoin',
    })
  },

  goMyPublish: function () {
    wx.navigateTo({
      url: '/pages/activity/myPublish/myPublish',
    })
  },

  goMyCard: function () {
    prompt.showToast({
      title: '功能正在开发中 ^_^'
    })
  }
})