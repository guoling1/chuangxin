<template>
  <div class="main">
    <swiper :list="swiperList" :aspect-ratio="aspectRatio" :auto="!isMask" :loop="!isMask" dots-position="center" :show-desc-mask="isMask"></swiper>
    <div class="productMessage">
      <p class="name">{{productData.name}}</p>
      <p class="price">现价<span>￥{{productData.price}}</span></p>
      <p class="oldPrice">市场价：￥{{productData.sourcePrice}}</p>
    </div>
    <div class="priceList">
      <div>
        <p>担保金额</p>
        <p class="num">￥{{productData.deposit}}</p>
      </div>
      <div>
        <p>月消费金额</p>
        <p class="num">￥{{productData.consumePrice}}</p>
      </div>
      <div>
        <p>合约期</p>
        <p class="num">{{productData.circle}}月</p>
      </div>
    </div>
    <div class="address">
      <span class="attr">归属地区</span>
      <span class="val">北京</span>
      <!--<span class="val" @click="openAddress()">{{address.name}}</span>-->
    </div>
    <div class="address">
      <span class="attr">手机号</span>
      <span class="val" @click="toSelectPhone()">{{phone}}</span>
    </div>
    <div class="select">
      <span class="attr">颜色</span>
      <span class="val" @click="openFormat()">{{color}}</span>
      <!--<div @click="openFormat()">
        &lt;!&ndash;<span class="selectColor">{{productData.packageList[0].name}}</span>&ndash;&gt;
        <span class="color" >{{color}}</span>
        <img src="../assets/more.png" alt="">
      </div>-->
    </div>
    <div class="bank">
      <!--<div class="top">-->
        <!--<span class="attr">存款银行</span>-->
        <!--<span class="val" @click="selectBank()">请选择</span>-->
      <!--</div>-->
      <div class="bottom">
        <span>总销量：{{productData.sellAmount}}件</span>
        <span>库存：{{stock}}件</span>
      </div>
    </div>
    <div class="detail">
      <div class="subject">
        <i></i>
        <span>图文详情</span>
        <i></i>
      </div>
      <div class="detail" id="content" v-html="productData.content" style="font-size: 0"></div>
      <div class="detail" id="content1" v-html="productData.configDetail" style="font-size: 0"></div>
    </div>
    <div class="end">
      <input type="number" placeholder="推荐人手机号(选填)" v-model="rcdMobile">
      <div class="button" @click="confirm()">确认</div>
    </div>

    <!--选择地区-->
    <div>
      <popup v-model="showAddress" position="right" style="overflow: auto">
        <div style="width:150px;">
          <p v-for="address in addressList" @click="selectAddress(address)" class="addressList">{{address.name}}</p>
        </div>
      </popup>
    </div>
    <!--银行弹框-->
    <div  class="showBank">
      <x-dialog v-model="showBank" class="dialog-demo">
        <div class="top">
          <span>选择银行</span>
          <span @click="showBank=false" class="close"></span>
        </div>
        <ul class="bankUl">
          <li class="active">平安银行</li>
          <li>平安银行</li>
          <li>平安银行</li>
          <li>平安银行</li>
        </ul>
      </x-dialog>
    </div>
    <!--友情提示-->
    <div  class="showBank showTips">
      <x-dialog v-model="showTips" class="dialog-demo">
        <div class="top">
          <span>友情提示</span>
          <span @click="showTips=false" class="close"></span>
        </div>
        <div class="content">
          <p>1.联通黑名单用户不能办理</p>
          <p>2.在联通已经拥有超过5个号码（含5个）不能办理</p>
          <p>3.如不清楚账户状态可拨打10010咨询</p>
        </div>
        <div class="bottom">
          <div @click="showTips = false">取消</div>
          <div @click="confirmTips()">确认</div>
        </div>
      </x-dialog>
    </div>
    <!--登录框-->
    <!--<div  class="showBank showTips">
      <x-dialog v-model="showLogin" class="dialog-demo">
        <div class="top">
          <span>登录</span>
          <span @click="showLogin=false" class="close"></span>
        </div>
        <div class="content" style="padding-top: 4px">
          <ul>
            <li>
              <input v-model="formData.phone" type="number" placeholder="手机号">
            </li>
            <li>
              <input v-model="formData.password" type="password" placeholder="密码(首次登录密码为注册短信验证码)">
            </li>
          </ul>
        </div>
        <router-link to="/regist" style="font-size: 14px;float: right;margin-right: 15px;color: #666;">注册</router-link>
          <div class="buy" @click="toBuy()">立即购买</div>
      </x-dialog>
    </div>-->
    <!--注册框-->
    <div  class="showBank  regist">
      <x-dialog v-model="showLogin" class="dialog-demo">
        <div class="top" >
          <span>登录</span>
          <span @click="showLogin=false" class="close"></span>
        </div>
        <div class="content" style="padding-top: 4px">
          <ul>
            <li>
              <input v-model="formData.phone" type="number" placeholder="输入手机号">
            </li>
            <li>
              <input v-model="formData.validataCode" type="text" placeholder="输入验证码">
              <img :src="imgMsg.img" @click="imgClick()" alt="">
            </li>
            <li>
              <input v-model="formData.messageCode" type="text" placeholder="输入短信验证码">
              <span @click="getCode()">{{count}}</span>
            </li>
          </ul>
        </div>
        <div class="buy" @click="toBuy()">立即购买</div>
      </x-dialog>
    </div>
    <!--选择规格-->
    <div class="showFormat">
      <popup :hide-on-blur="hideBlur" v-model="showFormat" style="overflow: auto">
        <div class="top">
          <img :src="swiperList[0].img" alt="" style="margin-top: 10px">
          <div class="right">
            <p class="price">￥{{productData.price}}</p>
            <p>库存：{{stock}}件</p>
          </div>
        </div>
        <ul>
          <li >
            <div class="subject">机身颜色</div>
            <span :class="color==item.color?'active':''" v-for="item in productData.colorList" @click="selectColor(item)">{{item.color}}</span>
          </li>
        </ul>
        <div class="button" @click="confirmFormat()">确认</div>
      </popup>
    </div>

    <toast v-model="warnText" type="warn" :text=errMsg></toast>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg"></toast>
  </div>
</template>

<script>
  import {Swiper,Popup,TransferDom} from 'vux'
  const TIME_COUNT = 60;
export default {
  name: 'HomeDetail',
  data () {
    return {
      hideBlur:false,
      /*formData:{
        phone:'',
        password:''
      },*/
      formData:{
        phone:'',
        validataCode:'',
        messageCode:''
      },
      id:this.$route.query.id,
      productData:{
        packageList:[{name:''}]
      },
      isMask:false,
      aspectRatio:1,
      swiperList:[{img:''}],
      showAddress:false,
      showBank:false,
      showTips:false,
      showLogin:false,
      showFormat:false,
      addressList:[],
      address:{name:'请选择'},
      colorList:["深空灰","金色","玫瑰金"],
      color:'请选择',
      warnText:false,
      errMsg:'',
      showPrompt:false,
      promptMsg:'',
      count: '获取验证码',
      timer: null,
      stock:"",
      selectPhone:'请选择',
      phoneReg:/^1[3|4|5|7|8][0-9]{9}$/,
      imgMsg:{
        img:''
      },
      messCode:'',
      isImgCode:false,
      rcdMobile:'',
      phone:''
    }
  },
  created(){
    if(this.GLOBAL.isKDApp){
      aladdin.header.config({
        //导航头部背景颜色
        backgroundColor: '#ffffff',
        //是否显示导航头部底部线条
        underlineVisible: false,
        //是否显示左区域按钮
        leftVisible: true,
        //是否显示右区域按钮
        rightVisible: true,
        //导航头部中间区域，
        middle: [{
          //类型（text、image、search等）
          type: 'text',
          //标题 页面title，自定义
          title: '详情',
          //文字颜色
          textColor: '#f37937',
          //文字大小
          fontSize: 18,
          //背景颜色
          backgroundColor: '#ffffff',
          //回调事件
          click: function () {
            //do something
          }
        }],
        //左区域
        left: [{
          //图标
          //icon: '/navBar/images/navBar/scan@2x.png',
          //图标颜色
          //tintColor: '#999999',
          //背景颜色
          //backgroundColor: '#ffffff',
          //是否显示小红点
          //badge: false,
          //回调事件
          click: function () {
            window.aladdin.navigator.back();
          }
        }],
        //右区域
        right: [{
          //图标
          //icon: '/navBar/images/navBar/customer@2x.png',
          //回调事件
          //click: function () {
          //do something
          //}
        }]}, function (err, param) {
        //设置导航栏回调
      });
    }
    window.scrollTo(0,0)
    this.init();
  },
  methods:{
    init(){
      window.scrollTo(0,0)
      if(localStorage.getItem('color')){
        this.color = localStorage.getItem('color')
        localStorage.removeItem('color')
      }
      this.getData();
      if(localStorage.getItem('key')){
        this.$axios.post('/open/api/rcdUser/get',{qrcodeKey:localStorage.getItem('key')})
          .then(res=>{
            this.rcdMobile = res.data.rcdMobile;
          })
      }
      if(localStorage.getItem('selectPhone')){
        this.phone = localStorage.getItem('selectPhone')
      }else {
        this.phone = '请选择'
      }
    },
    toSelectPhone(){
      localStorage.setItem('color',this.color);
      if(this.GLOBAL.isKDApp){
        window.aladdin.navigator.forward({url:'http://www.wojinxin.com/#/selectPhone?id='+this.$route.query.id});
      }else{
        this.$router.push('/selectPhone?id='+this.$route.query.id)
      }
    },
    //获取产品信息
    getData(){
      this.$axios.post("/open/api/product/get",{id:this.$route.query.id})
        .then(res=>{
          this.productData = res.data;
          //轮播图
          var arr=[]
          for(let i=0;i<res.data.swiperList.length;i++){
            arr.push({img:res.data.swiperList[i].url})
          }
          this.swiperList = arr;
          this.stock = res.data.amount;
          /*if(this.productData.content){
            document.getElementById("content").innerHTML = this.productData.content
          }
          if(this.productData.configDetail){
            document.getElementById("content1").innerHTML = this.productData.configDetail
          }*/
        })
        .catch(err=>{
          this.errMsg=err
          this.warnText = true
        })
    },
    //获取地区
    openAddress(){
      var params = {pid:1}
      this.$axios.post("/open/api/area/list",params)
        .then(res=>{
          this.addressList = res.data;
          this.showAddress = true;
        })
        .catch(err=>{
          this.errMsg=err
          this.warnText = true
        })
    },
    //选择规格
    openFormat(){
      this.showFormat = true;
    },
    selectAddress(address){
      this.address = address;
      this.showAddress = false;
    },
    selectColor(color){
      this.color = color.color;
      this.stock = color.amount
    },
    selectBank(){
      //选择银行前先选择区域
      if(this.address.name=="请选择"){
        this.$axios.post("/open/api/area/list",{areaId:this.address.id})
          .then(res=>{
            this.showBank = true;
            this.bankList = res.data;
          })
          .catch(err=>{
            this.errMsg=err
            this.warnText = true
          })
      }else {
        this.showPrompt = true;
        this.promptMsg = '请先选择区域'
      }

    },
    confirm(){
      let formData = {
        addressName:this.address.name,
        // addressId:this.address.id,
        addressId:2,
        color:this.color,
      }
      if(!formData.addressId||this.phone=="请选择"||formData.color=='请选择'){
        this.showPrompt = true;
        this.promptMsg = "请补全信息"
      }else{
        this.showTips = true;
      }
    },
    confirmTips(){
      if(localStorage.getItem("userMessage")){
        let formData = {
          addressName:"北京",
          // addressId:this.address.id,
          addressId:2,
          productName:this.productData.name,
          setMealPrice:this.productData.price,
          setMealName:this.productData.name,
          circle:this.productData.circle,
          price:this.productData.price,
          busiType:this.productData.busiType,
          color:this.color,
          memory:this.productData.memory,
          deposit:this.productData.deposit,
          phone:this.phone,
          id:this.$route.query.id
        }
        this.showTips = false;
        if(this.GLOBAL.isKDApp){
          window.aladdin.navigator.forward({url:'http://www.wojinxin.com/#/shopInfor?addressName=北京&addressId=2&productName='+this.productData.name+'&setMealPrice='+this.productData.price+'&setMealName='+this.productData.name+'&circle='+this.productData.circle+'&price='+this.productData.price+'&busiType='+this.productData.busiType+'&color='+this.color+'&memory='+this.productData.memory+'&deposit='+this.productData.deposit+'&phone='+this.phone+'&id='+this.$route.query.id});
        }else{
          this.$router.push({path:"/shopInfor",query:formData})
        }
      }else {
        this.showTips = false;
        this.showLogin = true;
        this.imgClick()
      }
    },
    confirmFormat(){
      if(this.stock==0){
        this.showPrompt = true;
        this.promptMsg = "暂无库存，请选择其他颜色或内存"
      }else {
        this.showFormat = false;
      }
    },
    toBuy(){
      if(!this.phoneReg.test(this.formData.phone)){
        this.showPrompt = true;
        this.promptMsg = '请输入正确的手机号'
      }else if(this.formData.messageCode==''){
        this.showPrompt = true;
        this.promptMsg = '请输入验证码'
      }else {
        this.$axios.get("/open/validate/verify", {params: {code: this.formData.validataCode, key: this.imgMsg.key}})
          .then(res => {
            if (res.retCode != "0000") {
              this.showPrompt = true;
              this.promptMsg = res.retMsg;
              this.isImgCode = false;
            } else {
              this.isImgCode = true;
              if(!this.isImgCode){
                this.showPrompt = true;
                this.promptMsg = '图形验证码不正确'
              }else {
                let params = {
                  mobile:this.formData.phone,
                  code:this.formData.messageCode
                }
                if(sessionStorage.getItem('bk')==1){
                  this.url = '/open/oauth/rcdLogin'
                }else {
                  this.url = '/open/oauth/smsLogin'
                }
                this.$axios.post("/open/oauth/smsLogin",params)
                  .then(res=>{
                    if(res.retCode=='0000'){
                      localStorage.setItem('userMessage', JSON.stringify(res.data.customer));
                      localStorage.setItem('token', JSON.stringify(res.data.token));
                      localStorage.setItem('sessionid', JSON.stringify(res.data.sessionid));
                      this.$store.commit('LOGIN', res.data.token);
                      this.showLogin = false;
                      let formData = {
                        addressName:"北京",
                        // addressId:this.address.id,
                        addressId:2,
                        productName:this.productData.name,
                        setMealPrice:this.productData.price,
                        setMealName:this.productData.name,
                        circle:this.productData.circle,
                        price:this.productData.price,
                        busiType:this.productData.busiType,
                        color:this.color,
                        memory:this.productData.memory,
                        deposit:this.productData.deposit,
                        phone:this.phone,
                        id:this.$route.query.id
                      }
                      this.showTips = false;
                      if(this.GLOBAL.isKDApp){
                        window.aladdin.navigator.forward({url:'http://www.wojinxin.com/#/shopInfor?addressName=北京&addressId=2&productName='+this.productData.name+'&setMealPrice='+this.productData.price+'&setMealName='+this.productData.name+'&circle='+this.productData.circle+'&price='+this.productData.price+'&busiType='+this.productData.busiType+'&color='+this.color+'&memory='+this.productData.memory+'&deposit='+this.productData.deposit+'&phone='+this.phone+'&id='+this.$route.query.id});
                      }else{
                        this.$router.push({path:"/shopInfor",query:formData})
                      }
                      /*this.$axios.post("/open/api/customer/save",{mobile:this.formData.phone})
                        .then(res=>{
                          localStorage.setItem("phone",this.formData.phone)
                          this.phone = this.formData.phone;
                          this.showLogin = false;
                          let formData = {
                            addressName:"北京",
                            // addressId:this.address.id,
                            addressId:2,
                            productName:this.productData.name,
                            setMealPrice:this.productData.packageList[0].price,
                            setMealName:this.productData.packageList[0].name,
                            circle:this.productData.packageList[0].circle,
                            price:this.productData.price,
                            busiType:this.productData.busiType,
                            color:this.color,
                            memory:this.productData.memory,
                            deposit:this.productData.deposit,
                            phone:this.phone
                          }
                          this.showTips = false
                          this.$router.push({path:"/shopInfor",query:formData})
                        })*/
                    }else {
                      this.showPrompt = true;
                      this.promptMsg = res.retMsg
                    }
                  })
                  .catch(err=>{
                    this.showPrompt = true;
                    this.promptMsg = '系统异常'
                  })
              }}
          })
      }
    },
    //获取验证码
    getCode(){
      this.$axios.post("/open/oauth/smscode",{mobile:this.formData.phone})
        .then(res=>{
          if(res.retCode=='0000'){
            this.messCode = res.data;
            if (!this.timer) {
              this.count = TIME_COUNT;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  this.count = "获取验证码";
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000)
            }
          }
        })
    },
    login(){
      if(!this.phoneReg.test(this.formData.phone)){
        this.showPrompt = true;
        this.promptMsg = '请输入正确的手机号'
      }else if(this.formData.messageCode==''){
        this.showPrompt = true;
        this.promptMsg = '请输入验证码'
      } else {
        this.$axios.get("/open/validate/verify", {params: {code: this.formData.validataCode, key: this.imgMsg.key}})
          .then(res => {
            if (res.retCode != "0000") {
              this.showPrompt = true;
              this.promptMsg = res.retMsg;
              this.isImgCode = false;
            } else {
              this.isImgCode = true;
              if(!this.isImgCode){
                this.showPrompt = true;
                this.promptMsg = '图形验证码不正确'
              }else {
                let params = {
                  mobile:this.formData.phone,
                  code:this.formData.messageCode
                }
                this.$axios.post("/open/api/customer/save",params)
                  .then(res=>{
                    if(res.retCode=='0000'){
                      // localStorage.setItem("token",res.data.token);
                      // localStorage.setItem("phone",this.formData.phone);
                      this.$router.go(-1)
                    }else {
                      this.showPrompt = true;
                      this.promptMsg = res.retMsg
                    }
                  })
                  .catch(err=>{
                    this.showPrompt = true;
                    this.promptMsg = '系统异常'
                  })
              }}
          })
      }

    },
    //点击图片重新获取验证码
    imgClick(){
      this.$axios.post("/open/validate/gcode")
        .then(res=>{
          if(res.retCode=="0000"){
            this.imgMsg = res.data
          }
        })
    },
    //验证图形验证码
    validateCode(){
      this.$axios.get("/open/validate/verify",{params:{code:this.formData.validataCode,key:this.imgMsg.key}})
        .then(res=>{
          if(res.retCode!="0000"){
            this.showPrompt = true;
            this.promptMsg = res.retMsg;
            this.isImgCode = false;
          }else {
            this.isImgCode = true;
          }
        })
    }
  },
  components:{
    Swiper,
    Popup
  },
  watch:{
    '$route.query.reload':function (v) {
      console.log(v)
      if(v && !this._inactive) this.init()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  .priceList{
    margin-bottom: 5px;
    div{
      display: inline-block;
      width: 30%;
      border-right: 1px solid #fe8d23;
      font-size: 12px;
      color: #666;
      .num{
        margin-top: 9px;
        font-size: 13px;
        color: #333;
        font-weight: bold;
      }
    }
    div:nth-child(3){
      border-right: none;
    }

  }
  .regist{
    /*margin: 50px 0;*/
    width: 100%;
    /*padding-bottom: 50px;*/
    .top{
      background: #444c59;
      color:#fff;
      .close{
        background-image: url("../assets/closeWrite.png") !important;
      }
    }
    ul {
      padding: 0 15px;
      text-align: left;
      li {
        height: 55px;
        border-bottom: 1px solid #e5e5e5;
        font-size: 14px;
        color: #666666;

        input {
          margin-top: 23px;
          height: 30px;
          width: 60%;
        }
        img{
          float: right;
          margin-top: 28px;
          display: inline-block;
          height: 20px;
          width: 70px;
          border-radius: 4px;
        }
        span {
          float: right;
          margin-top: 28px;
          display: inline-block;
          padding: 0 5px;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          color: #fff;
          background: #4e4e4e;
          border-radius: 4px;
        }

      }
    }
    .buy {
      margin: 13px 15px;
      height: 43px;
      line-height: 43px;
      background: #fe8d23;
      border-radius: 5px;
      color: #fff;
    }
  }
.main{
  margin: 50px 0 0;
  width: 100%;
  padding-bottom: 50px;
  .productMessage{
    margin-bottom: 20px;
    .name{
      margin: 13px 0;
      font-weight: bold;
    }
    .price{
      font-size: 13px;
      font-weight: bold;
      span{
        font-size: 19px;
        font-weight: bold;
        color: #fe8d23;
      }
    }
    .oldPrice{
      margin: 11px 0;
      font-size: 13px;
      text-decoration: line-through;
    }
  }
  .attr{
    font-size: 15px;

  }
  .val{
    float: right;
    font-size: 15px;
    font-weight: bold;
    color: #fe8d23;
  }
  .address{
    margin: 0 15px;
    height: 40px;
    line-height: 40px;
    text-align: left;
    border-bottom: 1px dashed #d7d7d7;
  }
  .select{
    font-size: 15px;
    margin: 5px 15px 0;
    text-align: left;
    div{
      position: relative;
      display: inline-block;
      width: 85%;
      vertical-align: top;
      img{
        position: absolute;
        right: -13px;
        /*top: 15px;*/
        width: 4px;
        height: 17px;
      }
    }
    .selectColor,.color{
      display: inline-block;
      width: 100%;
      background: #fe8d23;
      border-radius: 3px;
      padding: 0 8px;
      color: #fff;
      font-size: 15px;
      overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
    }
    .color{
      /*margin-left: 30px;*/
      /*background: #fe8d23;*/
      /*border-radius: 3px;*/
      /*padding: 0 8px;*/
      /*color: #fff;*/
      /*font-size: 14px;*/
      width: auto;
    }
  }
  .bank{
    margin: 0 15px;
    text-align: left;
    border-bottom: 1px dashed #d7d7d7;
    .top{
      height: 40px;
      line-height: 40px;
    }
    .bottom{
      margin: 23px 0 14px;
      display: flex;
      justify-content: space-around;
      font-size: 12px;
    }
  }
  .format{
    margin:14px 0 37px;
    .val{
      font-size: 13px;
      color: #999999;
      float: none;
    }
  }

  .detail{
    .subject{
      i{
        display: inline-block;
        width: 40px;
        height: 3px;
        vertical-align: super;
      }
      i:nth-child(1){
        background-image: url("../assets/left.png");
        background-size: 40px 3px;
      }
      i:nth-child(3){
        background-image: url("../assets/right.png");
        background-size: 40px 3px;
      }
    }
  }

  .end{
    position: fixed;
    bottom: 0;
    width: 100%;
    font-size: 14px;
    height: 45px;
    line-height: 45px;
    input{
      width: 70%;
      height: 100%;
      text-align: center;
    }
    .button{
      display: inline-block;
      float: right;
      background: #fe8d23;
      color: #fff;
      width: 30%;
    }
  }

  .showBank{
    color: #444c59;

    .top{
      height: 41px;
      line-height: 41px;
      border-bottom: 1px solid #444c59;
      font-size:18px;
      .close{
        position: absolute;
        top: 14px;
        right: 10px;
        display: inline-block;
        background-image: url("../assets/closeBlack.png");
        background-size: 13px 13px;
        width: 13px;
        height: 13px;
      }
    }
    .bankUl{
      padding: 32px 22px 37px;

      li{
        margin-bottom: 5px;
        height: 29px;
        line-height: 29px;
        font-size: 14px;
        color: #999;
        border: 1px solid #999;
        border-radius: 4px;
      }
      li.active{
        color: #fff;
        background: #444c59;
      }
    }

  }
  .showTips{
    .top{
      background: #444c59;
      color:#fff;
      .close{
        background-image: url("../assets/closeWrite.png");
      }
    }
    .content{
      padding: 15px;
      text-align: left;

      p{
        line-height: 30px;
        font-size: 14px;
      }

      ul{
        li{
          height: 55px;
          border-bottom: 1px solid #e5e5e5;
          font-size: 14px;
          color: #666666;
          input{
            margin-top: 23px;
            height: 30px;
            width: 100%;
          }
          img{
            float: right;
            margin-top: 28px;
            display: inline-block;
            height: 20px;
            width: 70px;
            border-radius: 4px;
          }
          span{
            float: right;
            margin-top: 28px;
            display: inline-block;
            padding: 0 5px;
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            color: #fff;
            background: #4e4e4e;
            border-radius: 4px;
          }
        }
      }
    }
    .buy{
      margin: 30px auto 13px;
      width: 203px;
      height: 43px;
      line-height: 43px;
      background: #fe8d23;
      border-radius: 5px;
      color: #fff;
    }
    .bottom{
      display: flex;
      justify-content: space-around;


      div{
        display: inline-block;
        width: 120px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        background: #999999;
        border-radius: 4px;
        font-size: 14px;
        margin-bottom: 20px;
      }
      div:nth-child(2){
        background: #fe8d23;
      }
    }
  }
  .vux-popup-dialog{
    overflow: inherit;
    background: #fff;
  }
  .showFormat{
    .top{
      border-bottom: 1px solid #d7d7d7;
      text-align:left;
      img{
        display: inline-block;
        margin: -20px 15px 0 10px;
        width: 119px;
        height: 119px;
        border: 1px solid #999999;
        border-radius: 4px;
      }
      .right{
        display: inline-block;
        font-size: 12px;
        p:nth-child(2){
          margin: 18px 0 14px;
        }
        .price{
          font-size: 19px;
          color: #fe8d23;
        }
      }
    }
    ul{
      padding:0 10px;
      text-align: left;
      li{
        .subject{
          margin: 14px 0 0;
          font-size: 14px;
        }
        span{
          display: inline-block;
          margin-top: 14px;
          text-align: center;
          width: 82px;
          height: 25px;
          line-height: 25px;
          background: #f6f6f6;
          font-size: 12px;
          margin-right: 15px;
          border-radius: 4px;
        }
        span.active{
          background: #fe8d23;
          color: #fff;
        }
      }
      .taocan span{
        width: auto;
        padding: 0 10px;
      }
    }
    .button{
      width: 100%;
      margin-top: 46px;
      height: 44px;
      line-height: 44px;
      background: #fe8d23;
      color: #fff;
    }
  }
  .addressList{
    height: 30px;
    line-height: 30px;
    font-size: 14px
  }

}
</style>
