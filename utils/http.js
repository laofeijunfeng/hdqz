import { config } from '../config.js'

class Http {
  constructor() {
    this.baseRestUrl = config.base_rest_url,
    this.appkey = config.appkey
  }

  request(params) {
    var that = this
    wx.request({
      url: this.baseRestUrl + params.url,
      data: params.data,
      method: params.method,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Token": getApp().globalData.userToken,
        "Api-Appkey": this.appkey
      },
      success: function (res) {
        var code = res.statusCode.toString()
        var startChar = code.charAt(0)
        if (startChar == '2' && res.data.code == 0) {
          params.success && params.success(res)
        } else {
          if (startChar == '4') {
            res.data.message = "客户端异常，请重试"
          } else if (startChar != '2' || startChar == '5') {
            res.data.message = "服务器异常，请重试"
          }
          params.error && params.error(res)
        }
      },
      fail: function (err) {
        params.fail && params.fail(err)
      },
      complete: function () {
        params.complete
      }
    })
  }

  sendRequest(params) {
    var that = this
    this.request({
      url: params.url,
      data: params.data ? params.data : {},
      method: params.method,
      success: function (res) {
        if (params.success) {
          params.success && params.success(res)
        }
      },
      error: function (res) {
        var code = res.data.code
        if (code == 999) {
          that.goLogin()
        } else {
          that.showErrMsg(res.data.message)
        }
      },
      fail: function (res) {
        that.showErrMsg("小程序异常，请重试")
      },
      complete: function () {
        if (params.complete) {
          params.complete
        }
      }
    })
  }

  sendGet(params) {
    params.method = 'GET'
    this.sendRequest(params)
  }

  sendPost(params) {
    params.method = 'POST'
    this.sendRequest(params)
  }

  showErrMsg(msg) {
    wx.showToast({
      title: msg,
      icon: 'none'
    })
  }

  goLogin() {
    wx.removeStorage({ key: 'userToken' })
    getApp().globalData.userToken = ''
    wx.showModal({
      title: '提示',
      content: '用户未登录',
      confirmText: '去登录',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/user/login/login',
          })
        }
      }
    })
  }
}

export { Http }