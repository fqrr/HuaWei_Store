// pages/home/home.js
// 引入ulti
import request from '../../util/request/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
        loopList:[]//轮播图
        ,goodList:[]
      },

      current:1,
        total:0 ,//数据总长度
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
              this.renderSwiper();
              this.renderGoods()
  },
        renderSwiper(){
            request({
              url:'/recommends'
            }).then(res=>{
              console.log(res);
                // 更新数据到data中
                this.setData({
                  loopList:res
                })
            })
        },
        renderGoods(){
            request({
              url:`/goods?_page=${this.current}&_limit=5`
            },true).then(res=>{
              // total 是字符串
              console.log(res);
              
              this.total=Number(res.total),
              console.log(this.total);
              
                this.setData({
                  // 更新数据 此时应该是插入数据
                  goodList:[...this.data.goodList,...res.list]
                  // [...this.data.goodList,...res.list] //...res新的数据补充到goodList数组中
                })
            })
        },
        // 搜索框处理函数
        handleEvent(){
        wx.navigateTo({
          url: '/pages/search/search',
        })            
        },
        // 跳转详情页面回调函数
        handleChangePage(e){
          // wx.redirectTo 没有返回直接回到首页
          // wx.navigateTo 不能跳转至tabbar页面
          // wx.switchTab 可以跳转至tabbar页面
          console.log(e.currentTarget.dataset.id);
          var id=e.currentTarget.dataset.id
          var name=e.currentTarget.dataset.name
            wx.navigateTo({
              url:`/pages/detail/detail?myid=${id}&name=${name}`
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
   * 页面相关事件处理函数--监听用户[下拉动作]
   */
  onPullDownRefresh: function () {
    this.renderSwiper();
    this.renderGoods()
              setTimeout(()=>{
                      wx.stopPullDownRefresh({});
                    },5000)
              
  },

  /**
   * 页面[上拉触底事件]的处理函数
   */
  onReachBottom: function () {
    if(this.data.goodList.length === this.total){
      return
    }
      this.current++;
      console.log(this.current);
      // 此时renderGoods里面的页数page+1
      this.renderGoods();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
 
})