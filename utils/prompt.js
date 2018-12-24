class Prompt {
  showModal(params) {
    wx.showModal({
      title: params.title,
      content: params.content,
      confirmText: params.confirmText,
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
}

export { Prompt }