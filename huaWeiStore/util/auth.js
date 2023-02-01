// 验证用户信息
function CheckAuth(callback){
    if(wx.getStorageSync('tel')){
        // 处理业务
        callback()
        
    }else{
      // 判断是否有token授权
      if(wx.getStorageSync('token')){
            // 如果有就跳转手机号绑定界面
            wx.navigateTo({
              url: '/pages/telform/telform',
            })
      }else{
        // 如果没有就跳转至授权页面
        wx.navigateTo({
          url: '/pages/auth/auth',
        })
      }
    }
}

export default CheckAuth