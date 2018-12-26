// pages/activity/joinUser/joinUser.js
import { Api } from '../../../utils/api.js'
import { FormTime } from '../../../utils/formTime.js'
let api = new Api()
let formTime = new FormTime()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activityId: options.activityId,
      users: [],
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
    this.getActivityUser()
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
    this.getActivityUser()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 自定义方法
   */
  checkUserIsLogin() {
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

  getActivityUser: function () {
    var that = this
    var pageNum = this.data.pageNum
    var pageSize = this.data.pageSize
    var pages = this.data.pages
    if (pageNum <= pages) {
      api.getActivityUser({
        data: {
          activityId: this.data.activityId,
          pageNum: pageNum,
          pageSize: pageSize
        },
        success: function (res) {
          var users = res.data.obj.users
          users.forEach(item => {
            item.tmCreate = formTime.formatTime(item.tmCreate, 'M-D h:m')
          })
          that.setData({
            isLogin: 1,
            users: that.data.users.concat(users),
            pages: res.data.obj.pages,
            pageNum: pageNum + 1,
            total: res.data.obj.total
          })
        }
      })
    }
  }
})