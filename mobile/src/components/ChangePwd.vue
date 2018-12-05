<template>
  <div class="main">
    <ul>
      <li>
        <input v-model="formData.phone" type="number" placeholder="手机号">
      </li>
      <li>
        <input v-model="formData.password" type="password" placeholder="输入密码">
      </li>
      <li>
        <input v-model="formData.password1" type="password" placeholder="确认密码">
      </li>
    </ul>
    <div class="buy" @click="changePwd()">修改密码</div>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg" width="60%"></toast>
  </div>
</template>

<script>
    export default {
        name: "ChangePwd",
      data(){
          return {
            formData:{
              phone:'',
              password:''
            },
            phoneReg:/^1[3|4|5|7|8][0-9]{9}$/,
            showPrompt:false,
            promptMsg:''
          }
      },
      methods:{
        changePwd(){
          if(!this.phoneReg.test(this.formData.phone)){
            this.showPrompt = true;
            this.promptMsg = '请输入正确的手机号'
          }else if(this.formData.password!=this.formData.password1){
            this.showPrompt = true;
            this.promptMsg = '密码不一致'
          }else {
            let params = {
              mobile:this.formData.phone,
              password:this.formData.password
            }
            this.$axios.post("/open/api/customer/updatePwd",params)
              .then(res=>{
                if(res.retCode=='0000'){
                  this.showPrompt = true;
                  this.promptMsg = "修改成功,请重新登录";
                  localStorage.clear()
                  let _this = this;
                  setTimeout(function () {
                    _this.$router.push("/login")
                  },1000)

                }else {
                  this.showPrompt = true;
                  this.promptMsg = res.retMsg
                }
              })
              .catch(err=>{
                this.showPrompt = true;
                this.promptMsg = '系统异常'
              })
          }
        },
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
