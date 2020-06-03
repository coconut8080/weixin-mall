// pages/order/index.js
Page({
  data: {
    Tabs:[
      {
        id:0,
        value:"全部",
        isActive:true
      },
      {
        id:1,
        value:"待付款",
        isActive:false
      },
      {
        id:2,
        value:"待发货",
        isActive:false
      },
      {
        id:2,
        value:"退款/退货",
        isActive:false
      }
    ]
  },
  onShow(options){
    //获取当前小程序的页面栈-数组 长度最大是10页面
    let pages =  getCurrentPages();
    //console.log(pages);
    // 数组中 索引最大的页面就是当前页面
    let currentPage = pages[pages.length -1];
    // 3 获取url上的type参数
    const { type } = currentPage.options;
    //console.log(type); //1
    // 4 激活选中页面标题 当 type=1 index=0 
    this.changeTitleByIndex(type-1);
      
  },
  //根据标题索引来激活选中 标题数组
  changeTitleByIndex(index){
    // 2 修改源数组
    let {Tabs} = this.data;
    Tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false);
    // 3 赋值到data中
    this.setData({
      Tabs    
      })

  },
// 标题点击事件 从子组件传递过来
handleTabsItemChange(e){
  //console.log(e);
  const {index} = e.detail;
  //console.log(index);
  this.changeTitleByIndex(index);
  }
})