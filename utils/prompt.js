class Prompt {
  showModal(params) {
    wx.showModal({
      title: params.title ? params.title : '提示',
      content: params.content,
      showCancel: params.showCancel === 'none' ? false : true,
      confirmText: params.confirmText ? params.confirmText : '确定',
      confirmColor: '#005BAC',
      success: function (res) {
        if (res.confirm) {
          params.confirm && params.confirm()
        } else if (res.cancel) {
          params.cancel && params.cancel()
        }
      }
    })
  }

  showToast(params) {
    wx.showToast({
      title: params.title,
      icon: params.icon ? params.icon : 'none'
    })
  }
}

export { Prompt }