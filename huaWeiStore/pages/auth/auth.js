// pages/auth/auth.js
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
  // 获取用户信息。页面产生点击事件（例如 button 上 bindtap 的回调中）
  // 后才可调用，每次请求都会弹出授权窗口，用户同意后返回 userInfo。
  handleAuth(){
    wx.getUserProfile({
      desc:'用于完善会员资料',
      success:(res)=>{
        console.log(res);
        // 用户信息存储到本地
        wx.setStorageSync('token', res.userInfo)
        // 授权完跳转至手机绑定页面
        wx.navigateTo({
          url: '/pages/telform/telform',
        })
        // this.setData({
        //   userInfo:res.userInfo,//用户信息对象
        //   hasUserInfo:true
        // })
      }
    })
  }
})