// pages/activity/index/index.js
import { Api } from '../../../utils/api.js'
import { FormTime } from '../../../utils/formTime.js'
let api = new Api()
let formTime = new FormTime()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageNum: 1,
      pages: 1,
      activity: []
    })
    this.getAllActivity()
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
   * 自定义方法
   */
  goDetail: function () {
    wx.navigateTo({
      url: '/pages/activity/detail/detail'
    })
  },

  goCreateActivity: function () {
    wx.navigateTo({
      url: '/pages/activity/create/create',
    })
  },

  getAllActivity: function () {
    var that = this
    var pageNum = this.data.pageNum
    var pages = this.data.pages
    if (pageNum <= pages) {
      api.getAllActivity({
        data: {
          pageNum: pageNum
        },
        success: function (res) {
          var activities = res.data.obj.activities
          activities.forEach((item) => {
            item.tmBegin = formTime.formatTime(item.tmBegin, 'Y年M月D')
          })
          that.setData({
            activity: that.data.activity.concat(activities),
            pages: res.data.obj.pages,
            pageNum: pageNum + 1
          })
        }
      })
    }
  }
})