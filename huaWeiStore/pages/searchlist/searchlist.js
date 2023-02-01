// pages/searchlist/searchlist.js
import request from '../../util/request/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      goodList:[]
  },
      priceOrder:true,
      commentOrder:true,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
console.log(options);
       // 动态设置页面的标题
       wx.setNavigationBarTitle({
        title: options.name,
      })
      this.getList(options.id)
  },
  getList(id){
    console.log(id);
    
      request({
        url:`/categories/${id}?_embed=goods`
      }).then(res=>{
        console.log(res);
          this.setData({
            goodList:res.goods
          })
      })
  },
  handleTap(e){
    wx.navigateTo({
      url: `/pages/detail/detail?myid=${e.currentTarget.dataset.id}&name=${e.currentTarget.dataset.name}`
    })
  },
  handlePrice(){
    console.log('hh');
    this.priceOrder =!this.priceOrder
    //价格排序
    this.setData({
      goodList:this.priceOrder?this.data.goodList.sort((item1,item2)=>item1.price-item2.price):this.data.goodList.sort((item1,item2)=>item2.price-item1.price)
    })
  },
  handleComment(){
    console.log('hhggg');
    this.commentOrder =!this.commentOrder
    this.setData({
      // parseInt(item2.goodcomment)) 因为是百分比所以要取整
      goodList:this.commentOrder?this.data.goodList.sort((item1,item2)=>parseInt(item1.goodcomment)-parseInt(item2.goodcomment)):this.data.goodList.sort((item1,item2)=>parseInt(item2.goodcomment)-parseInt(item1.goodcomment))
    })
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