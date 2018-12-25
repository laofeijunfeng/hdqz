// pages/activity/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: [
      {
        'tmBegin': '12月18号',
        'week': '星期二',
        'avatar': '/images/test/avatar.jpg',
        'title': '冬至吃汤圆报名啦！！！',
        'logo': '/images/test/logo.jpg'
      },
      {
        'tmBegin': '12月18号',
        'week': '星期二',
        'avatar': '/images/test/avatar.jpg',
        'title': '冬至吃汤圆报名啦！！！冬至吃汤圆报名啦！！！冬至吃汤圆报名啦！！！',
        'logo': '/images/test/logo.jpg'
      }
    ]
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
  }
})