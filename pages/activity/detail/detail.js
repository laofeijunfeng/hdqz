// pages/activity/detail/detail.js
import { Api } from '../../../utils/api.js'
import { FormTime } from '../../../utils/formTime.js'
import { Prompt } from '../../../utils/prompt.js'
let api = new Api()
let formTime = new FormTime()
let prompt = new Prompt()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showShareMenu: 0,
    isJoin: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var scene = options.scene
    this.setData({
      activityId: scene == undefined || scene == 'undefined' ? options.activityId : scene
    })
    this.getActivityDetail(options.activityId)
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
    this.getUserStatus()
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
    var that = this
    return {
      title: this.data.activity.user.nickname + '想和你一起参加 | ' + this.data.activity.title,
      path: '/pages/activity/detail/detail?activityId=' + this.data.activity.id + '&shareId=' + this.data.shareId,
      imageUrl: this.data.activity.avatar,
      success: function (res) {
        if (res.errMsg == 'shareAppMessage:ok') {
          that.setData({
            showShareMenu: 0
          })
        }
      }
    }
  },

  /**
   * 自定义方法
   */
  goLogin: function () {
    wx.navigateTo({
      url: '/pages/user/login/login'
    })
  },

  goHome: function () {
    wx.switchTab({
      url: '/pages/home/index/index',
    })
  },

  getActivityDetail: function (activityId) {
    var that = this
    api.getActivityDetail({
      data: {
        activityId: activityId
      },
      success: function (res) {
        var activity = res.data.obj.activity
        activity.signupBeginDate = formTime.formatTime(activity.signupBegin, 'M月D日')
        activity.signupEndDate = formTime.formatTime(activity.signupEnd, 'M月D日')
        activity.beginDate = formTime.formatTime(activity.tmBegin, 'M月D日')
        activity.nowTime = Date.parse(new Date())
        activity.address = JSON.parse(activity.address)
        that.setData({
          activity: activity
        })
      }
    })
  },

  getUserStatus: function () {
    var that = this
    api.getUserStatus({
      data: {
        activityId: this.data.activityId
      },
      success: function (res) {
        that.setData({
          isJoin: res.data.obj.isJoin
        })
      }
    })
  },

  seeActivityUser: function () {
    wx.navigateTo({
      url: '/pages/activity/joinUser/joinUser?activityId=' + this.data.activityId,
    })
  },

  checkSignUpInfo: function () {
    wx.navigateTo({
      url: '/pages/activity/joinUserInfo/joinUserInfo?activityId=' + this.data.activityId,
    })
  },

  shareActivity: function () {
    var that = this
    api.shareActivity({
      data: {
        activityId: this.data.activityId
      },
      success: function (res) {
        that.setData({
          shareId: res.data.obj.shareId,
          showShareMenu: 1
        })
      }
    })
  },

  closeShareMenu: function () {
    this.setData({
      showShareMenu: 0
    })
  },

  goJoin: function (e) {
    wx.navigateTo({
      url: '/pages/activity/join/join?activityId=' + e.currentTarget.dataset.activityId,
    })
  },

  goPoster: function () {
    prompt.showToast({
      title: '功能正在开发中 ^_^'
    })
  },

  doNothing: function () {

  }
})