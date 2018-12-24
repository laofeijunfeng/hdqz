//app.js
App({
  onLaunch: function () {
    var that = this
    wx.getStorage({
      key: 'userToken',
      success(res) {
        that.globalData.userToken = res.data
      }
    }) 
  },
  globalData: {
    userToken: ''
  }
})