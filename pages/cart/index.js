/**
 * 1 获取用户收货地址
 *  1  绑定点击事件
 *  2 调用小程序内置 api 获取用户的收获地址 wx.chooseAddress
 *  
 * 2 获取 用户 对小程序 所授予 获取地址 权限 状态 scope 
 * scope 值 true undefined 直接调用 (authSetting scope.address)
 * 假设scope 值 false 
 * 1 诱导用户 自己打开授权设置页面  当用户重新给与 获取地址权限的时候 
 * 2 获取收货地址
 * 
 * 获取到的收货地址存入到缓存中 
 * 
 * 
 * 
 * 页面加载完毕
 * onLoad onShow
 */

 import { getSetting,chooseAddress,openSetting ,showModal ,showToast} from '../../utils/asyncWx.js'
 import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data:{
    address:{},
    cart:[],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow(){
    //1 获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    //获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart")||[];

    this.setData({address});
    this.setCart(cart);

      
  },
  
  //  点击 收货地址
  async handleChooseAddress() {
   try {
     //获取 权限状态
      const res1=await getSetting();
      const scoprAddress = res1.authSetting["scope.address"];
      // 2 判断权限状态
      if(scoprAddress===false){
        // 诱导用户打开授权页面
        await openSetting();
      }
        //4 调用获取收货地址的 api
        const address = await chooseAddress();
        address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo;
        //5 存入到缓存中 
        wx.setStorageSync("address", address);
          
   } catch (error) {
     console.log(error);
     
   }
  },
  //商品的选中
  handleItemChange(e){
    //1获取被修改的商品id
    const goods_id = e.currentTarget.dataset.id;
   // console.log(goods_id);
    //2 获取购物车数组
    let {cart} = this.data;
    // 3 找到被修改的商品对象
    let index = cart.findIndex(v=>v.goods_id === goods_id);
    //4 选中状态取反
    cart[index].checked=!cart[index].checked;
    
    this.setCart(cart);
  },
  //设置购物车状态 同时 重新计算 
  setCart(cart){
      
    let allChecked = true;
    //总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }else{
        allChecked = false;
      }
    })
    //判断是否为空数组
    allChecked = cart.length!=0?allChecked : false;
    this.setData({
      cart,
      totalPrice,totalNum,allChecked
    });
    wx.setStorageSync("cart", cart);
  },
  //商品全选功能
  handleItemAllCheck(){
    //1 获取data中的数据
    let {cart,allChecked}=this.data;
    //2 修改值
    allChecked = !allChecked;
    //3 循环修改cart数组中 的商品状态
    cart.forEach(v => v.checked = allChecked);
    //4 把修改后的值 填充会data或者缓存中
    this.setCart(cart);
  },
  // 商品数量的编辑功能
    async handleItemNumEdit(e){
    //1 获取传递过来的参数
    const {operation,id} = e.currentTarget.dataset;
    //console.log(operation,id);
    //2 获取购物车数组
    const {cart} = this.data;
    //3 找到需要修改的商品的索引
    const index = cart.findIndex(v => v.goods_id === id);
    //判断是否要删除
    if(cart[index].num ===1 &&operation ===-1){
      //弹窗提示
      const res = await showModal({content:"您是否要删除？"});
      if (res.confirm) {
        cart.splice(index,1);
        this.setCart(cart);
      }
    }else{
      //4 进行修改数量
      cart[index].num += operation;
      // 5 设置回缓存和data中
      this.setCart(cart);
    }
  },
  //点击 结算
  async handlePay(){
    //1 判断收货地址
    const {address,totalNum} = this.data;
    if(!address.userName){
      await showToast({title:"您还没有选择收货地址"});
      return;
    }
    // 2 判断用户有没有选购商品
    if(totalNum ===0){
      await showToast({title:"您还没有选购商品"});
      return;
    }
    //3 跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    });
      
  }
})