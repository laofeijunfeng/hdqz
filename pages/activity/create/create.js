// pages/activity/create/create.js
import { Api } from '../../../utils/api.js'
import { config } from '../../../config.js'
import { Prompt } from '../../../utils/prompt.js'
let api = new Api()
let prompt = new Prompt()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    title: '',
    description: '',
    tmAvtivityBegin: '2019-01-01',
    tmSignBegin: '2019-01-01',
    tmSignEnd: '2019-01-01',
    address: null,
    userName: '',
    userPhone: '',
    userInfo: null
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
  chooseImage: function (e) {
    var that = this
    var type = e.currentTarget.dataset.type
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.showLoading({
          title: '正在上传',
          mask: true
        })
        that.uploadImage(res.tempFilePaths[0], function (key) {
          that.setData({
            avatar: config.image_url + key
          })
          wx.showToast({
            title: '上传成功',
          })
        })
      }
    })
  },

  uploadImage: function (image, callback) {
    api.getUploadToken({
      success: function (res) {
        wx.uploadFile({
          url: config.qiniu_upload_host,
          filePath: image,
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData: {
            token: res.data.obj.token,
          },
          success: function (res) {
            var data = JSON.parse(res.data)
            callback(data.key)
          },
          fail: function (res) {
            wx.showToast({
              title: '上传失败，请重试',
              icon: 'none'
            })
          }
        })
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },

  bindDateChange: function (e) {
    let tmType = e.currentTarget.dataset.tmType
    this.setData({
      [`${tmType}`]: e.detail.value
    })
  },

  chooseLocation: function () {
    var that = this
    wx.chooseLocation({
      success: function(res) {
        that.setData({
          address: res
        })
      },
      fail: function (res) {
        if (res.errMsg == 'chooseLocation:fail auth deny') {
          prompt.showModal({
            title: '提示',
            content: '亲，需要您同意获取地址噢',
            confirmText: '去设置',
            confirm: function () {
              wx.openSetting({})
            }
          })
        }
      }
    })
  },

  bindInput: function (e) {
    let inputType = e.currentTarget.dataset.inputType
    this.setData({
      [`${inputType}`]: e.detail.value
    })
  },

  createActivity: function () {
    if (this.data.avatar.length > 0) {
      if (this.data.title.length > 0) {
        if (this.data.description.length > 0) {
          if (this.data.address != null) {
            var that = this
            prompt.showModal({
              content: '是否确定发起活动',
              confirm: function () {
                wx.showLoading({
                  title: '创建中',
                })
                var data = {}
                data.avatar = that.data.avatar
                data.title = that.data.title
                data.description = that.data.description
                data.address = JSON.stringify(that.data.address)
                data.signupBegin = that.data.tmSignBegin
                data.signupEnd = that.data.tmSignEnd
                data.tmBegin = that.data.tmAvtivityBegin
                if (that.data.userName.length > 0) {
                  data.userName = that.data.userName
                }
                if (that.data.userPhone.length > 0) {
                  data.userPhone = that.data.userPhone
                }
                api.publishActivity({
                  data: data,
                  success: function (res) {
                    wx.hideLoading()
                    prompt.showModal({
                      title: '提示',
                      content: '发起活动成功！赶快去分享活动，让小伙伴们都参加吧！',
                      showCancel: 'none',
                      confirmText: '去分享',
                      confirm: function () {
                        wx.switchTab({
                          url: '/pages/activity/index/index',
                        })
                      }
                    })
                  },
                  complete: function () {
                    wx.hideLoading()
                  }
                })
              }
            })
          } else {
            prompt.showToast({
              title: '请选择活动地址'
            })
          }
        } else {
          prompt.showToast({
            title: '活动描述不能为空'
          })
        }
      } else {
        prompt.showToast({
          title: '活动标题不能为空'
        })
      }
    } else {
      prompt.showToast({
        title: '请上传活动头像'
      })
    }
  },

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

  goLogin: function () {
    wx.navigateTo({
      url: '/pages/user/login/login',
    })
  }
})