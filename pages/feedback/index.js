// pages/feedback/index.js
Page({
  data: {
    Tabs:[
      {
        id:0,
        value:"体验问题",
        isActive:true
      },
      {
        id:1,
        value:"商品、商家投诉",
        isActive:false
      }
    ],
    //被选中的图片的路径 数组
    chooseImages:[],
    //被选中的图片路径 数组
    textVal:""
  },
  //外网的图片的路径数组
  UpLoadImgs:[],
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
  },
  //点击 " + "  选择图片
  handleChooseImg(){
    wx.chooseImage({
      // 图片的数量
      count: 9,
      // 图片的格式 原图 压缩
      sizeType: ['original', 'compressed'],
      // 图片的来源 相册 照相机
      sourceType: ['album', 'camera'],
      success: (result) => {
        //console.log(result.tempFilePaths);
       this.setData({
        // chooseImages:result.tempFilePaths
        chooseImages:[...this.data.chooseImages,...result.tempFilePaths]
       })
      }
    });
  },
  //点击  自定义图片组件
  handleRemoveImg(e){
    //获取 被点击的组件的索引
    const {index} = e.currentTarget.dataset;
    //获取data中的图片数组
    let { chooseImages } = this.data;
    //删除元素
    chooseImages.splice(index,1);
    this.setData({
      chooseImages
    })
  },
  //文本域的输入事件
  handleTextInput(e){
   // console.log(e);
   const {value} = e.detail;
   //console.log(value);
   this.setData({
     textVal:value
   })
  },
  //提交按钮的点击
  hanleFormSubmit(){
    //1 获取文本域的内容 图片数组
    const {textVal , chooseImages } = this.data ;
    //2 合法性的验证
    if(!textVal.trim()){
      //不合法
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true
      });
        return;
    }
    //准备上传图片 到专门的图片服务器
    // 上传文件的 api 不支持 多个文件同时上传  遍历数组 挨个上传 
    // 显示正在等待的图片
    wx.showLoading({
      title: '正在上传中',
      mask: true
    });
    // 判断有没有需要上传的图片数组
    if(chooseImages.length != 0){
      chooseImages.forEach((v,i) => {
        wx.uploadFile({
          // 图片要上传到哪里
          url: 'https://pic.xiaojianjian.net/',
          // 被上传的文件的路径
          filePath: v,
          name: "file" ,
          //顺带的文本信息
          formData: {},
          success: (result) => {
            console.log(result);
            let url = JSON.parse(result.data).url;
            this.UpLoadImgs.push(url);

            //所有的图片都上传完毕了才触发
            if ( i === chooseImages.length -1 ){
              wx.hideLoading();

              console.log("把文本的内容和外网的图片数组 提交到后台中");
              //  提交都成功了
              // 重置页面
              this.setData({
                textVal:"",
                chooseImages:[]
              })
              //返回上一个页面
              wx.navigateBack({
                delta: 1
              });
                
            }
          }
        });
          
      })
    }else{
      wx.hideLoading();
      
      console.log("只是提交了文本");
      wx.navigateBack({
        delta: 1
      });
        
    }
  }
})