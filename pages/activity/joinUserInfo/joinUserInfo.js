// pages/activity/joinUserInfo/joinUserInfo.js
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
    user: null
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
    this.getUserSignInfo()
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
  getUserSignInfo: function () {
    var that = this
    api.getUserSignInfo({
      data: {
        activityId: this.data.activityId
      },
      success: function (res) {
        var user = res.data.obj.user
        user.tmCreate = formTime.formatTime(user.tmCreate, 'Y-M-D h:m')
        that.setData({
          user: user
        })
      }
    })
  },

  cancelSignUp: function () {
    var that = this
    prompt.showModal({
      content: '是否确认删除',
      confirm: function () {
        api.cancelSignUp({
          data: {
            activityId: that.data.activityId
          },
          success: function () {
            prompt.showToast({
              title: '取消成功',
              icon: 'success'
            })
            setTimeout(function () {
              wx.navigateBack({})
            }, 1500)
          }
        })
      }
    })
  }
})