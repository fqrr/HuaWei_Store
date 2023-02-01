// pages/shopcar/shopcar.js
import CheckAuth from "../../util/auth";
import request from "../../util/request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideButtons: [{
      type: 'warn',
      text: '删除'
    }],
    cartList:[]
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
    // 查看购物车前检查是否授权
    CheckAuth(()=>{
      console.log('准备加入购物车');
      let {nickName} =wx.getStorageSync('token')
      let tel =wx.getStorageSync('tel')
      request({url:`/carts?_expand=good&username=${nickName}&tel=${tel}`}).then
      (res=>{
        console.log(res);
        this.setData({
          cartList: res
        })
      })
    })
  },
  handleTap(e){
    console.log('gg');
    var item=e.currentTarget.dataset.item
    item.checked=!item.checked //对选择状态进行取反                                            
      this.handleUpdate(item)
  },

  // -处理函数
  handleMinus(e){
    var item=e.currentTarget.dataset.item
          item.number--
          if(item.number==0){
            return
          }
          this.handleUpdate(item)
  },
  // +处理函数
  handleAdd(e){
    var item=e.currentTarget.dataset.item
    item.number++
    this.handleUpdate(item)
  },
  handleUpdate(item){
    console.log(item);
    
      this.setData({
        cartList:this.data.cartList.map(data=>{
          if(data.id=== item.id){
              return item
          }
          return data
        })
      })
            // 更新购物车数据
      request({
        url:`/carts/${item.id}`,
        method:'put',
        data:{
          "username": item.username,
          "tel": item.tel,
          "goodId": item.goodId,
          "number": item.number,
          "checked": item.checked,
        }
      })

  },
  // 左滑删除
  slideButtonTap(e){//点击删除获取当前商品的id
      // console.log(e.currentTarget.dataset.id);
      var id=e.currentTarget.dataset.id
      // 
      this.setData({
        cartList:this.data.cartList.filter(item=>item.id!==id)
      })
      request({
        url:`/carts/${id}`,
        method:"delete"
      })
  },
  handleAllChecked(e){
      // console.log(e.detail.value.length);
      if(e.detail.value.length ===0){
        // 未全选
        this.setData({
          cartList:this.data.cartList.map(item=>({
            ...item,
            checked:false
          }))
        })
      }else{
        // 全选
        this.setData({
          cartList:this.data.cartList.map(item=>({
            ...item,
            checked:true
          }))
        })
      }
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