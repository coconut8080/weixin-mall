// pages/collect/index.js
Page({
  data: {
    Tabs:[
      {
        id:0,
        value:"商品收藏",
        isActive:true
      },
      {
        id:1,
        value:"品牌收藏",
        isActive:false
      },
      {
        id:2,
        value:"店铺收藏",
        isActive:false
      },
      {
        id:3,
        value:"浏览器足迹",
        isActive:false
      }
    ]
  },
  onShow(){
    const collect = wx.getStorageSync("collect");
    this.setData({
      collect
    })
  },
  handleTabsItemChange(e){
    //console.log(e);
    const {index} = e.detail;
    //console.log(index);
    // 2 修改源数组
    let {Tabs} = this.data;
    Tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false);
    // 3 赋值到data中
    this.setData({
      Tabs
    })
  }
})