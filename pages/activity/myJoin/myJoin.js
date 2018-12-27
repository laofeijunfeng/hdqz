// pages/activity/myJoin/myJoin.js
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
      activities: [],
      pageNum: 1,
      pageSize: 6,
      pages: 1
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
    this.getMyJoinActivity()
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
    this.getMyJoinActivity()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 自定义方法
   */
  getMyJoinActivity: function () {
    var that = this
    var pageNum = this.data.pageNum
    var pageSize = this.data.pageSize
    var pages = this.data.pages
    if (pageNum <= pages) {
      api.getMyJoinActivity({
        data: {
          pageNum: pageNum,
          pageSize: pageSize
        },
        success: function (res) {
          var activities = res.data.obj.activities
          activities.forEach(item => {
            item.activity.tmBegin = formTime.formatTime(item.activity.tmBegin, 'M-D h:m')
            if (item.isCancel == 1) {
              item.cancel = '【已退出】'
            } else {
              item.cancel = ''
            }
          })
          that.setData({
            activities: that.data.activities.concat(activities),
            pages: res.data.obj.pages,
            pageNum: pageNum + 1
          })
        }
      })
    }
  }
})