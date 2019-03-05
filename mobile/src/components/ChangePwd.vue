<template>
  <div class="main">
    <!--<img src="../assets/logo.png" alt="" class="login">-->
    <ul>
      <li >
        <input v-model="formData.password" type="password" placeholder="请输入新密码">
      </li>
    </ul>
    <div class="btn-group">
      <div class="submit" @click="login()">确认</div>
    </div>
    <!--<p class="name">邯郸创鑫房地产租售管理系统</p>-->
    <!--<loading v-model="isLoad" text="登陆中"></loading>-->
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg" width="60%"></toast>
  </div>
</template>

<script>
    export default {
        name: "Login",
      data(){
          return {
            formData:{
              password:'',
            },
            phoneReg:/^1[3|4|5|6|7|8][0-9]{9}$/,
            showPrompt:false,
            promptMsg:'',
            isLoad:false
          }
      },
      created(){
      },
      methods:{
        login(){
          if(!this.formData.password){
            this.showPrompt = true;
            this.promptMsg = '请填写密码'
          }
          // this.isLoad = true;
          this.$axios.post("/sys/usersChangePas",this.formData)
            .then(res=>{
              if(res.code=='200'){
                this.showPrompt = true;
                this.promptMsg = '修改成功，请重新登录！';
                let _this = this;
                setTimeout(function () {
                  _this.$router.push('/login')
                },1000)
              }else {
                this.isLoad = false;
                this.showPrompt = true;
                this.promptMsg = res.msg
              }
            })
            .catch(err=>{
              this.isLoad = false
              this.showPrompt = true;
              this.promptMsg = err
            })
        }
      }
    }
</script>

<style scoped type="text/less" lang="less">
  .main{
    margin-top: 50px;
    width: 100%;
    height: 100%;
    /*background: url("../assets/bg.png") no-repeat bottom;*/
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
        width: 80%;
        line-height: 44px;
        font-size: 16px;
        border-radius: 22px;
        background: #cbcbcb;
        color: #fff;
      }
      div.submit{
        margin: 0 auto;
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
