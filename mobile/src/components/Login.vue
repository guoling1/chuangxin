<template>
  <div class="main">
    <img src="../assets/logo.png" alt="" class="login">
    <ul>
      <li>
        <input v-model="formData.phone" type="number" placeholder="输入手机号">
      </li>
      <li >
        <input v-model="formData.password" type="password" placeholder="输入密码">
      </li>
    </ul>
    <div class="btn-group">
      <div class="submit" @click="login()">登陆</div>
      <div class="cancel">清除</div>
    </div>
    <p class="name">邯郸创鑫房地产租售管理系统</p>
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
    margin-top: 50px;
    width: 100%;
    height: 100%;
    background: url("../assets/bg.png") no-repeat bottom;
    background-size: 100% auto;
    .login{
      margin-top: 80px;
      width: 130px;
      height: auto;
    }
    ul {
      padding: 0 15px;
      text-align: left;
      li {
        height: 55px;
        border-bottom: 1px solid #e5e5e5;

        input {
          margin-top: 23px;
          height: 30px;
          width: 100%;
          font-size: 14px;
          font-weight: bold;
          color: #333;
        }
      }
    }
    .btn-group{
      padding: 59px 15px 0;
      display: flex;
      justify-content: space-between;
      div{
        width: 45%;
        line-height: 44px;
        font-size: 16px;
        border-radius: 22px;
        background: #cbcbcb;
        color: #fff;
      }
      div.submit{

        background: #105ba7;
      }
    }
    .name{
      position: fixed;
      bottom: 10px;
      width: 100%;
      font-size: 12px;
    }
  }
</style>
