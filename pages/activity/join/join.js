// pages/activity/join/join.js
import { Api } from '../../../utils/api.js'
import { Prompt } from '../../../utils/prompt.js'
let api = new Api()
let prompt = new Prompt()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    name: '',
    phone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activityId: options.activityId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.checkUserIsLogin()
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
   * 自定义方法
   */
  checkUserIsLogin: function () {
    if (this.data.userInfo == null) {
      var that = this
      api.getUserInfo({
        success: function (res) {
          that.setData({
            userInfo: res.data.obj
          })
        }
      })
    }
  },

  bindInput: function (e) {
    var inputType = e.currentTarget.dataset.inputType
    this.setData({
      [`${inputType}`]: e.detail.value
    })
  },

  joinActivity: function () {
    var that = this
    api.joinActivity({
      data: {
        activityId: this.data.activityId,
        userName: this.data.name,
        userPhone: this.data.phone
      },
      success: function(res) {
        prompt.showToast({
          title: '报名成功',
          icon: 'success'
        })
        var pages = getCurrentPages()
        var prevPage = pages[pages.length - 2]
        prevPage.setData({
          [`activity.numOfUser`]: prevPage.data.activity.numOfUser + 1
        })
        setTimeout(function () {
          wx.navigateBack({})
        }, 1500)
      }
    })
  }
})