//0 引入 用来发送请求 的 方法
import { request} from "../../request/index.js"

Page({
    data: {
        // 轮播图数组
        swiperList: [],
        //导航 数组
        catesList:[],
        //楼层 数据
        floorList:[],
        
    },
    //options(Object)
    onLoad: function(options) {
        // 发送异步请求获取轮播图数据
     //  wx.request({
     //      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
     //      success: (result) => {
     //         // console.log(result);    
     //         this.setData({
     //             swiperList:result.data.message
     //         })
     //      }
     //  });
         this.getswiperList();
         this.getcatesList();
         this.getfloorList();
     
    },
    //获取轮播图数据
    getswiperList(){
        request({url:"/home/swiperdata"})
        .then(result=>{
            this.setData({
             swiperList:result.data.message
            })
        })
    },
    //获取导航 数据
    getcatesList(){
        request({url:"/home/catitems"})
        .then(result=>{
            this.setData({
             catesList:result.data.message
            })
        })
    },
    //获取楼层 数据
    getfloorList(){
        request({url:"/home/floordata"})
        .then(result=>{
            this.setData({
                floorList:result.data.message
            })
        })
    }
});
  