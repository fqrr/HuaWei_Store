// pages/telform/telform.js
import request from '../../util/request/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tel:''
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
  // 获取手机号
  formInputChange(e){
    console.log(e.detail.value);
      this.setData({
        // 更新数据
        tel:e.detail.value
      })
  },
  // 确定
  submitForm(){
        // 手机号存储到本地
        wx.setStorageSync('tel', this.data.tel)

        request({
          // wx.getStorageSync('token').nickName 数据已经存储到本地
          url:`/users?tel=${this.data.tel}&nickName=${wx.getStorageSync('token').nickName}`
        }).then(res=>{
          console.log(res)
      if(res.length===0){
        request({
          url:"/users",
          method:"post",
          data:{
            ...wx.getStorageSync('token'),
            tel:this.data.tel
          }
        }).then(res=>{
          wx.navigateBack({
            delta: 2,
          })
        })
      }else{
        wx.navigateBack({
          delta: 2,
        })
      }
    })
  }
})