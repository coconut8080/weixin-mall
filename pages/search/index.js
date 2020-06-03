import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    goods:[],
    isFocus:false
  },
  TimeId:-1,
  handleInput(e){
    //console.log(e);
    //1 获取输入框的值
    const {value} = e.detail;
    //console.log(value);
    //2 检测合法性
    if(!value.trim()){
      this.setData({
        goods:[],
        // 取消 按钮 是否显示
        isFocus:false,
        // 输入框的值
        inpValue:""
      })
      //值不合法
      return;
    }
    this.setData({
      isFocus:true
    })
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout( () => {
      this.qsearch(value);
    },1000)
  },
  //发送请求获取搜索建议 数据
  async qsearch(query){
    const res = await request({ url:"/goods/search", data:{query} });
    console.log(res.data.message.goods);
    this.setData({
      goods:res.data.message.goods
    })
  },
  //点击取消按钮
  handleCancel(){
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
    })
  }
})