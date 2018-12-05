<template>
  <div class="main">
    <ul>
      <li>
        <input v-model="formData.phone" type="number" placeholder="手机号">
      </li>
      <li >
        <input v-model="formData.password" type="password" placeholder="密码(初次登入为注册验证码)">
      </li>
    </ul>
    <div class="buy" @click="login()">登录</div>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg" width="60%"></toast>
  </div>
</template>

<script>
    export default {
        name: "Login",
      data(){
          return {
            formData:{
              phone:'',
              password:'',
            },
            phoneReg:/^1[3|4|5|7|8][0-9]{9}$/,
            showPrompt:false,
            promptMsg:''
          }
      },
      methods:{
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
        },
        login(){
          if(!this.phoneReg.test(this.formData.phone)){
            this.showPrompt = true;
            this.promptMsg = '请输入正确的手机号'
          }else {
            let params = {
              mobile:this.formData.phone,
              password:this.formData.password
            }
            this.$axios.post("/open/oauth/login",params)
              .then(res=>{
                if(res.retCode=='0000'){
                  localStorage.setItem("token",res.data.token);
                  localStorage.setItem("phone",this.formData.phone);
                  if(this.GLOBAL.isKDApp){
                    window.aladdin.navigator.forward({url:'http://www.wojinxin.com/#/my'});
                  }else{
                    this.$router.push("/my")
                  }

                }else {
                  this.showPrompt = true;
                  this.promptMsg = res.retMsg
                }
              })
          }
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
