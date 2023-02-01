const {
  default: request
} = require("../../util/request/request")


// pages/search/search.js
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
    this.setData({
      search: this.search.bind(this)
    })
  },
  search: function (value) {
    console.log(value);
    
    return Promise.all([
      request({
        url: `/categories?title_like=${value}`
      }),
      request({
        url: `/goods?title_like=${value}`
      })
    ]).then(res => {
      return [...res[0].map(item => ({
        ...item,
        text: item.title,
        type: 1
      })), ...res[1].map(item => ({
        ...item,
        text: item.title,
        type: 2
      }))]
    })
  },
  selectresult:function(e){
    console.log('select result',e.detail.item);
    if(e.detail.item.type ===1){
      console.log('搜索列表');
        console.log(e);
        wx.navigateTo({
          url: `/pages/searchlist/searchlist?id=${e.detail.item.id}&name=${e.detail.item.title}`
        })
    }else{
      console.log('详情列表');  
      console.log(e);
      wx.navigateTo({
        url: `/pages/detail/detail?myid=${e.detail.item.id}&name=${e.detail.item.title}`
      })
      
    }
    
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

  }
})