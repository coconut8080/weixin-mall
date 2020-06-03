import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    goodsObj:{},
    //商品是否被收藏
    isCollect:false
  },
  //商品对象
  GoodsInfo:{},
  onShow: function () {
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length -1];
    let options = currentPage.options;
    //console.log(options);
    const {goods_id} = options;
    //console.log(goods_id);
    this.getGoodsDetail(goods_id);
    
  },
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url:"/goods/detail",data: {goods_id} });
    this.GoodsInfo = goodsObj;
    console.log(goodsObj);
    // 1 获取缓存中的商品收藏的数组
    let collect = wx.getStorageSync("collect") || [];
    // 2 判断当前商品是否被收藏
    let isCollect = collect.some(v => v.data.message.goods_id === this.GoodsInfo.data.message.goods_id);  
    this.setData({
      goodsObj:{
        goods_price:goodsObj.data.message.goods_price,
        goods_name:goodsObj.data.message.goods_name,
        goods_introduce:goodsObj.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.data.message.pics
      },
      isCollect
    })
  },
  //点击轮播图 放大预览
  handlePrevewImage(e){
    //console.log(e);
    // 1 先构造要预览的图片数据
    const urls = this.GoodsInfo.data.message.pics.map(v => v.pics_mid);
    // 2 接收传递过来的图片url
    const current = e.currentTarget.dataset.url;
    //console.log(current);
    wx.previewImage({
      current,
      urls
    });
  },
  //点击加入购物车
  handleCartAdd(){
    //1 获取缓存中的购物车 数组
    let cart = wx.getStorageSync( "cart" )||[];
    // 2 判断 商品对象是否存在于购物车数组中
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.data.message.goods_id);
    if(index === -1){
      // 3 不存在 第一次添加
      this.GoodsInfo.data.message.num = 1;
      this.GoodsInfo.data.message.checked = true;
      cart.push(this.GoodsInfo.data.message);
    }else{
      cart[index].num++;
 
    }
    // 把购物车重新添加会缓存中
    wx.setStorageSync("cart",cart);
    // 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    });
  },
  //点击 商品收藏图标
  handleCollect(){
    let isCollect=false;
    //1 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync("collect")|| [];
    //2 判断该商品是否被收藏过
    let index = collect.findIndex(v => v.data.message.goods_id === this.GoodsInfo.data.message.goods_id);
    //3 当index!=-1 表示 已经收藏过了
    if(index!==-1){
       // 能找到 已经收藏过了  在数组中删除该商品
       collect.splice(index,1);
       isCollect = false;
       wx.showToast({
         title: '取消成功',
         icon: 'success',
         mask: true
       });
         
    } else{
      //没有 收藏过
      collect.push(this.GoodsInfo);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: false
      });
        
    }
    // 4 把数组存入到缓存中
    wx.setStorageSync("collect", collect);
    // 5 修改data中的属性 isCollect
    this.setData({
      isCollect
    })
  }
})