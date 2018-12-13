<template>
  <div class="main">
    <img src="../assets/logo.png" alt="" class="login">
    <ul>
      <li>
        <input v-model="formData.loginName" type="text" placeholder="请输入用户名">
      </li>
      <li >
        <input v-model="formData.password" type="password" placeholder="请输入密码">
      </li>
    </ul>
    <div class="btn-group">
      <div class="submit" @click="login()">登陆</div>
      <div class="cancel" @click="clear">清除</div>
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
              loginName:'',
              password:'',
            },
            phoneReg:/^1[3|4|5|6|7|8][0-9]{9}$/,
            showPrompt:false,
            promptMsg:''
          }
      },
      created(){
          console.log(localStorage.getItem('loginUser'))
        if(localStorage.getItem('loginUser')){
          this.formData.loginName = JSON.parse(localStorage.getItem('loginUser')).loginName
        }
      },
      methods:{
        login(){
          if(!this.formData.loginName||!this.formData.password){
            this.showPrompt = true;
            this.promptMsg = '请填写用户名和密码'
          }
          this.$axios.post("/loginH5",this.formData)
            .then(res=>{
              if(res.code=='200'){
                // localStorage.setItem("token",res.data.token);
                localStorage.setItem("loginUser",JSON.stringify(this.formData));
                this.showPrompt = true;
                this.promptMsg = res.msg;
                let _this = this;
                setTimeout(function () {
                  _this.$router.push('/home')
                },1000)
              }else {
                this.showPrompt = true;
                this.promptMsg = res.msg
              }
            })
        },
        clear(){
          this.formData = {
            loginName:'',
            password:'',
          }
          localStorage.removeItem('loginUser')
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
