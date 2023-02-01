
function request(params,isHeader=false){
  // 显示loading
      return new Promise((resolve,rejects)=>{
        wx.showLoading({
          title: '正在加载中',
        })
            wx.request({
              // 把传过来的对象解构
              ...params,
              url:'http://localhost:3000'+params.url,
              success:(res)=>{
                  if(isHeader){
                    resolve({
                     list:res.data,
                     total:res.header["X-Total-Count"]
                    })
                  }else{
                resolve(res.data);
              }

              },
              fail:(err)=>{
                  rejects(err)
              },
              // 无论请求成功还是失败都会返回
              complete:()=>{
                // 隐藏loading
                wx.hideLoading({
                  title: '加载完毕...',
                })
              }
            })
      })
}

export default request