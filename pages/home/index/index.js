// pages/home/index/index.js
import { Api } from '../../../utils/api.js'
import { Prompt } from '../../../utils/prompt.js'
let api = new Api()
let prompt = new Prompt()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    article: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBanner()
    this.getArticle()
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
  getBanner: function () {
    var that = this
    api.getHomeBanner({
       success: function (res) {
         that.setData({
           banner: res.data.obj.banners
         })
       }
    })
  },

  getArticle: function () {
    var that = this
    api.getHomeArticle({
      success: function (res) {
        that.setData({
          article: res.data.obj.articles
        })
      }
    })
  },

  goArticleDetail: function (e) {
    // var articleId = e.currentTarget.dataset.articleId
    // wx.navigateTo({
    //   url: '/pages/article/detail/detail?articleId=' + articleId,
    // })
    prompt.showToast({
      title: '功能正在开发中 ^_^'
    })
  },

  goPage: function (e) {
    var index = e.currentTarget.dataset.index
    if (index == 0) {
      wx.navigateTo({
        url: '/pages/home/bless/bless',
      })
    }
  }
})