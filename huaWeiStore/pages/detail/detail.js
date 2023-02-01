import request from "../../util/request/request";
import CheckAuth from "../../util/auth";

// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        info:null,
        current: 0,
        commentList:[]//用户评价
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 接受其他页面传过来的数据options
      console.log(options);
      // 动态设置页面的标题
      wx.setNavigationBarTitle({
        title: options.name,
      })
      this.getDetailInfo(options.myid)
      this.getCommentInfo()
  },
  getDetailInfo(id){
      request({
          url:`/goods/${id}`
      }).then(res=>{
        console.log(res);
          // 更新数据
          this.setData({
            info:res
          })
      })
  },
  handleTap(e){
    console.log(e);
    // 点击全屏预览
    wx.previewImage({
        current:e.currentTarget.dataset.current,//当前显示图片的http链接 
        urls:this.data.info.slides.map(item=>`http://localhost:3000${item}`)//需要预览的图片http链接列表
    })
  },
  handleActive(e){
    console.log(e);
    
        this.setData({
          current:e.currentTarget.dataset.index
        })
  },

  getCommentInfo(){
    request({
      url:'/comments'
    }).then(res=>{
      console.log(res);
      this.setData({
        commentList:res
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 加入购物车
      handleAdd(){


        /*
      1. 判断本地存储是否有手机号信息，如果有直接加入
      2. 没有手机号，判断是否有token信息，如果有，引导调整手机号绑定
      3 没有token授权信息， 我们引导用户授权页面
    */
   CheckAuth(()=>{
     console.log('准备加入购物车');
          let {nickName}=wx.getStorageSync('token')//用户名
          let tel=wx.getStorageSync('tel')//手机号
          var goodId=this.data.info.id //商品id
          console.log(nickName,tel,goodId);
          // 根据 用户名 手机号 商品id 通过接口获取数据
          request({
            url:"/carts",
            data:{
              tel,
              goodId,
              nickName
            }
          }).then(res=>{
            console.log(res);
                // 如果是新添加的商品
                if(res.length ===0){
                  return request({
                    url:'/carts',
                    method:"post",
                    data:{
                      "username": nickName,
                      "tel": tel,
                      "goodId": goodId,
                      "number": 1,//默认为一
                      "checked": false,
                    }
                  })
                }else{
                  // 如果是已经添加过的商品就在数量上number+1
                  return request({
                    url:`/carts/${res[0].id}`,
                    method:"put",
                    data:{
                      // put方法新值会覆盖旧值（原本没有的）
                      ...res[0],//旧数据
                      number:res[0].number+1//新数据
                    }
                  })
                }
          }).then(res=>{
            wx.showToast({
              title: '加入购物车成功',
            })
          })
    })
      },
      handleChange(){
        wx.switchTab({
          url: '/pages/shopcar/shopcar',
        })
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