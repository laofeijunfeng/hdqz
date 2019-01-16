// pages/home/bless/bless.js
import { Api } from '../../../utils/api.js'
let api = new Api()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    imagePath: '',
    posterBgImage: '',
    posterUserAvatar: ''
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
    this.checkUserIsLogin()
    this.downBgImage()
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
  checkUserIsLogin() {
    if (this.data.userInfo == null) {
      var that = this
      api.getUserInfo({
        success: function (res) {
          that.setData({
            userInfo: res.data.obj
          })
          wx.showLoading({
            title: '求签中...'
          })
          that.waitForDownFile()
          that.downUserAvatar(res.data.obj.avatar)
        }
      })
    }
  },

  downBgImage: function () {
    var that = this
    api.getNewYearWish({
      success: function (res) {
        that.downloadFile(res.data.obj.wish.url, function (tempFilePath) {
          that.setData({
            posterBgImage: tempFilePath
          })
        })
      }
    })
  },

  downUserAvatar: function (avatar) {
    var that = this
    this.downloadFile(avatar, function (tempFilePath) {
      that.setData({
        posterUserAvatar: tempFilePath
      })
    })
  },

  waitForDownFile: function () {
    var that = this
    let interval = null
    interval = setInterval(function () {
      if (that.data.posterBgImage.length > 0 && that.data.posterUserAvatar.length > 0) {
        clearInterval(interval)
        that.createPoster()
      }
    }, 100)
  },

  createPoster: function () {
    var that = this;
    var context = wx.createCanvasContext('mycanvas');

    context.setFillStyle("#ffffff")
    context.fillRect(0, 0, 1228, 1980)

    context.drawImage(this.data.posterBgImage, 0, 0, 1228, 1980)

    context.setFontSize(40)
    context.setFillStyle('#000000')
    context.setTextAlign('center')
    context.fillText('|', 150, 570)
    context.stroke()

    context.setFontSize(40)
    context.setFillStyle('#000000')
    context.setTextAlign('center')
    var name = this.data.userInfo.nickname
    for (var i=0; i<name.length; i++) {
      context.fillText(name.charAt(i), 150, 630 + i * 50)
      context.stroke()
    }

    context.arc(1040, 1595, 65, 0, 2 * Math.PI)
    context.strokeStyle = "#ffe200"
    context.clip()
    context.drawImage(this.data.posterUserAvatar, 975, 1530, 130, 130)

    context.draw(false, function () {
      wx.canvasToTempFilePath({
        destHeight: 3960,
        destWidth: 2456,
        canvasId: 'mycanvas',
        success: function (res) {
          that.setData({
            imagePath: res.tempFilePath
          })
        },
        fail: function (res) {
          console.log(res)
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    })
  },

  downloadFile: function (url, callback) {
    wx.downloadFile({
      url: url,
      success(res) {
        callback(res.tempFilePath)
      },
      fail(res) {
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '网络较差，图片下载失败，请重进来求签吧！',
          showCancel: false,
          complete: function () {
            wx.navigateBack({})
          }
        })
      }
    })
  },

  savePoster: function () {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.imagePath,
      success: function (res) {
        wx.showToast({
          title: '保存成功'
        })
      },
      fail: function (res) {
        if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny"
          || res.errMsg === "saveImageToPhotosAlbum:fail:auth denied") {
          wx.openSetting({
            success: function (res) {
              if (res.authSetting["scope.writePhotosAlbum"]) {
                console.log("获取权限成功，再次点击图片保存到相册")
              } else {
                console.log("获取权限失败")
                wx.showToast({
                  title: '获取权限失败',
                  icon: 'none'
                })
              }
            },
            fail: function (res) {
              if (res.errMsg === "openSetting:fail can only be invoked by user TAP gesture.") {
                wx.showModal({
                  title: '提示',
                  content: '亲，需要您的授权才能使用此功能',
                  confirmText: '去设置',
                  success: function (res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: function (res) {

                        },
                        fail: function (res) {
                          wx.showToast({
                            title: '打开设置失败，请手动打开',
                            icon: 'none'
                          })
                        }
                      })
                    }
                  }
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: '存储失败，请重试',
            icon: 'none'
          })
        }
      }
    })
  },

  refreshPoster: function () {
    wx.showLoading({
      title: '求签中...'
    })
    this.setData({
      posterBgImage: ''
    })
    this.downBgImage()
    this.waitForDownFile()
  }
})