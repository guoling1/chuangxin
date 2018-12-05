<template>
  <div class="main">
    <div class="myTop">
      <img src="../assets/tx.png" alt="">
      <div class="right">
        <p class="welcome">欢迎您，</p>
        <p class="phone">手机号：{{phone}}</p>
      </div>
    </div>
    <ul class="list">
      <li @click="toOrder()">
        <img src="../assets/orderIcon.png" alt="">
        <span>我的订单</span>
      </li>
      <li @click="toCustomOrder()" v-if="isHide">
        <img src="../assets/orderIcon.png" alt="">
        <span>客户订单</span>
      </li>
      <li @click="toCommission()" v-if="isHide">
        <img src="../assets/bag.png" alt="" style="width: 20px;height: 19px">
        <span>我的佣金</span>
      </li>
      <li @click="isShowCode()" v-if="isHide">
        <img src="../assets/code.png" alt="" style="width: 17.5px;height: 17.5px">
        <span>我的二维码</span>
      </li>
      <li @click="signOut()" v-if="isLogin">
        <img src="../assets/退出登录.png" alt="" style="width: 20px">
        <span>退出登录</span>
      </li>
      <!--<li @click="toChangePwd()" v-if="isLogin">
        &lt;!&ndash;<img src="../assets/orderIcon.png" alt="">&ndash;&gt;
        <span>修改密码</span>
      </li>
      <li v-if="!isLogin" @click="toLogin()">
        &lt;!&ndash;<img src="../assets/orderIcon.png" alt="">&ndash;&gt;
        <span >登录</span>
      </li>
      <li v-if="!isLogin" @click="toRegist()">
        &lt;!&ndash;<img src="../assets/orderIcon.png" alt="">&ndash;&gt;
        <span >注册</span>
      </li>-->
    </ul>

    <!--登录框-->
    <login-mask v-if="showLogin" v-on:child-close="listenClose"></login-mask>

    <!--推广码-->
    <div class="showCode">
      <x-dialog v-model="showCode" class="dialog-demo">
        <span class="close" @click="showCode = false">
          <img src="../assets/closeWrite.png" alt="">
        </span>
        <img :src="codeUrl" alt="" class="qrcode">
        <!--<div id="qrcode" class="qrcode"></div>-->
      </x-dialog>
    </div>

    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg"></toast>
  </div>
</template>

<script>
  import LoginMask from './loginMask'
  // import QRCode from 'qrcodejs2'
  const TIME_COUNT = 60;
  export default {
    name: 'My',
    data() {
      return {
        formData:{
          phone:'',
          validataCode:'',
          messageCode:''
        },
        phone:'',
        showLogin: false,
        count: '获取验证码',
        timer: null,
        imgSrc:'http://www.wojinxin.com/wofinance/servlet/validateCodeServlet',
        isLogin:false,
        showCode:false,
        showPrompt:false,
        promptMsg:'',
        codeUrl:'',
        isHide:false
      }
    },
    created(){
      if(localStorage.getItem("userMessage")){
        this.phone = JSON.parse(localStorage.getItem("userMessage")).mobile
        this.isLogin =true
      }
      if(sessionStorage.getItem('bk')==1){
        this.isHide = true
      }
    },
    mounted(){
      // this.qrcode()
    },
    methods: {
      listenClose(val){
        this.showLogin = val
      },
      // qrcode () {
      //   let qrcode = new QRCode('qrcode', {
      //     width: 150,
      //     height: 150, // 高度
      //     text: '56663159' // 二维码内容
      //     // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
      //     // background: '#f0f'
      //     // foreground: '#ff0'
      //   })
      // },
      isShowCode(){
        if(this.isLogin){

          this.$axios.post('/open/api/rcdRrcode/get',{rcdMobile:this.phone})
            .then(res=>{
              console.log(res)
              if(res.retCode=='0000'){
                this.showCode = true;
                this.codeUrl = res.data;
              }else {
                this.showPrompt = true;
                this.promptMsg = res.retMsg
              }
            })
        }else {
          this.showLogin = true
        }

      },
      toLogin(){
        if(this.GLOBAL.isKDApp){
          window.aladdin.navigator.forward({url:'http://www.wojinxin.com/#/login'});
        }else{
          this.$router.push("/login")
        }

      },
      toRegist(){
        if(this.GLOBAL.isKDApp){
          window.aladdin.navigator.forward({url:'http://www.wojinxin.com/#/regist'});
        }else{
          this.$router.push("./regist")
        }
      },
      toOrder() {
        if(this.GLOBAL.isKDApp){
          window.aladdin.navigator.forward({url:'http://www.wojinxin.com/#/order'});
        }else{
          this.$router.push("/order")
        }
      },
      toCustomOrder() {
        if(this.GLOBAL.isKDApp){
          window.aladdin.navigator.forward({url:'http://www.wojinxin.com/#/customOrder'});
        }else{
          this.$router.push("/customOrder")
        }
      },
      toChangePwd(){
        if(this.GLOBAL.isKDApp){
          window.aladdin.navigator.forward({url:'http://www.wojinxin.com/#/changePwd'});
        }else{
          this.$router.push("/changePwd")
        }
      },
      toCommission(){
        if(this.GLOBAL.isKDApp){
          window.aladdin.navigator.forward({url:'http://www.wojinxin.com/#/commission'});
        }else{
          this.$router.push("/commission")
        }
      },
      signOut(){
        this.phone = ""
        localStorage.clear();
        this.isLogin = false
        this.$store.commit('LOGOUT')

      },
      login(){
        // this.validateCode()
        this.$axios.post("/open/api/customer/save",{mobile:this.formData.phone})
          .then(res=>{
            localStorage.setItem("phone",this.formData.phone)
            this.phone = this.formData.phone;
            this.isLogin = true;
            this.showLogin = false;
          })
      },
      //点击图片重新获取验证码
      imgClick(){
        this.imgSrc = "http://www.wojinxin.com/wofinance/servlet/validateCodeServlet?"+Math.random();
      },
      //验证图形验证码
      validateCode(){
        this.$axios.get("/servlet/validateCodeServlet",{params:{validateCode:this.formData.validataCode}})
          .then(res=>{
            console.log(res)
          })
      },
      //获取验证码
      getCode(){
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
    },
    components: {
      LoginMask
    },
    watch:{
      '$store.state.login.isLogin'(cur){
        location.reload()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  .showCode{
    .close{
      position: absolute;
      top: -50px;
      right: -50px;
      display: inline-block;
      width: 100px;
      height: 100px;
      background: #fe8d23;
      border-radius: 50%;
      img{
        width: 20px;
        height: 20px;
        margin-top: 60px;
        margin-left: -36px;
      }
    }
    .qrcode{
      margin: 31px 0;
      width: 80%;
    }
  }
  .main {
    /*margin: 50px 0;*/
    width: 100%;
    padding-bottom: 50px;

    .myTop {
      margin: 19px 15px 30px;
      height: 92px;
      background: #f4f4f4;
      border-radius: 5px;
      text-align: left;
      box-shadow: 0 3px 12px #f4f4f4;

      img {
        margin-top: 14px;
        margin-left: 28px;
        display: inline-block;
        width: 63px;
        height: 63px;
        border: 1px solid #fff;
        border-radius: 50%;
      }

      .right {
        display: inline-block;
        margin-left: 30px;
        vertical-align: top;
        font-size: 14px;

        .welcome {
          margin: 28px 0 16px;
          font-size: 12px;
          color: #666;
        }

      }
    }
    .list {
      border-top: 10px solid #e7e7e7;
      padding: 10px 15px;
      text-align: left;

      li {
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid #e5e5e5;

        img {
          display: inline-block;
          margin-right: 5px;
          vertical-align: middle;
          width: 15px;
          height: 19px;
        }

        span {
          display: inline-block;
        }

      }
    }
    .showLogin {

      .top {
        height: 41px;
        line-height: 41px;
        font-size: 18px;
        background: #444c59;
        color: #fff;

        .close {
          position: absolute;
          top: 14px;
          right: 10px;
          display: inline-block;
          background-image: url("../assets/closeWrite.png");
          background-size: 13px 13px;
          width: 13px;
          height: 13px;
        }

      }
      .content {
        padding: 15px;
        text-align: left;

        ul {

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
      }
      .buy {
        margin: 13px auto;
        width: 203px;
        height: 43px;
        line-height: 43px;
        background: #fe8d23;
        border-radius: 5px;
        color: #fff;
      }
    }
  }
</style>
