import { request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧 的菜单数据
    leftMeusList:[],
    // 右侧 的商品数据
    rightContent:[],
    //被点击的菜单名称
    currentIndex:0,
    // // 右侧内容的滚动条距离顶部的距离
    scrollTop:0
  },
  // 接口的返回数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getcates();

    //  1 获取本地存储中的数据  (小程序中也是存在本地存储 技术)
    const Cates = wx.getStorageSync("cates");
    //2 判断
    if(!Cates){
       // 不存在  发送请求获取数据
      this.getcates();
    }else{
      // 有旧的数据 定义过期时间  10s 改成 5分钟
      if(Date.now() - Cates.time > 1000 * 10){
        //重新发送请求
        this.getcates();
      }else{
        // 可以使用旧的数据
      this.Cates = Cates.data;
      let leftMenuList = this.Cates.map(v => v.cat_name);
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMeusList,
        rightContent
        })
      }
    }
  },
  getcates(){
    request({ url:"/categories" })
    .then(res =>{
      this.Cates = res.data.message;

      // 把接口的数据存入到本地存储中
      wx.setStorageSync("cates",{ time:Date.now(),data: this.Cates });

      //构造左侧的大菜单数据
      let leftMeusList = this.Cates.map(v =>v.cat_name);
      //构造右侧的商品数据
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMeusList,
        rightContent
      })
    })
  },
  handleItemTap(e){
    //console.log(e);
    //console.log(e.currentTarget.dataset);
    let {index} = e.currentTarget.dataset;

    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop:0
    })
    
  }
})