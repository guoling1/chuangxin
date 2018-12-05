<template>
  <div class="main">
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
    <div class="buy" @click="login()">登录</div>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg" width="60%"></toast>
  </div>
</template>

<script>
  const TIME_COUNT = 60;
    export default {
        name: "Regist",
      data(){
          return {
            formData:{
              phone:'',
              validataCode:'',
              messageCode:''
            },
            count: '获取验证码',
            phoneReg:/^1[3|4|5|7|8][0-9]{9}$/,
            showPrompt:false,
            promptMsg:'',
            timer: null,
            imgMsg:{},
            messCode:'',
            isImgCode:false
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
              title: '登录',
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
          this.imgClick()
      },
      methods:{
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
              } else {
                this.showPrompt = true;
                this.promptMsg = res.retMsg
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
                    if(sessionStorage.getItem('bk')==1){
                      this.url = '/open/oauth/rcdLogin'
                    }else {
                      this.url = '/open/oauth/smsLogin'
                    }
                    this.$axios.post(this.url,params)
                      .then(res=>{
                        if(res.retCode=='0000'){
                          localStorage.setItem('userMessage', JSON.stringify(res.data.customer));
                          localStorage.setItem('token', JSON.stringify(res.data.token));
                          localStorage.setItem('sessionid', JSON.stringify(res.data.sessionid));
                          this.$store.commit('LOGIN', res.data.token);
                          if(this.GLOBAL.isKDApp){
                            window.aladdin.navigator.back();
                          }else{
                            if(this.GLOBAL.isKDApp){
                              window.aladdin.navigator.back();
                            }else{
                              this.$router.go(-1)
                            }

                          }

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
      }
    }
</script>

<style scoped type="text/less" lang="less">
  .main{
    margin: 50px 0;
    width: 100%;
    padding-bottom: 50px;
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
</style>
