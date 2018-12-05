<template>
  <div class="main">
    <!--注册框-->
    <div  class="showBank  regist">
      <x-dialog v-model="showLogin" class="dialog-demo">
        <div class="top" >
          <span>登录</span>
          <span @click="close()" class="close"></span>
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
        <div class="buy" @click="login()">登录</div>
      </x-dialog>
    </div>

    <toast v-model="warnText" type="warn" :text=errMsg></toast>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg"></toast>
  </div>
</template>

<script>
  import {Popup,TransferDom} from 'vux'
  const TIME_COUNT = 60;
export default {
  name: 'Home',
  data () {
    return {
      formData:{
        phone:'',
        validataCode:'',
        messageCode:''
      },
      showLogin:true,
      warnText:false,
      errMsg:'',
      showPrompt:false,
      promptMsg:'',
      count: '获取验证码',
      timer: null,
      phoneReg:/^1[3|4|5|7|8][0-9]{9}$/,
      imgMsg:{},
      messCode:'',
      isImgCode:false,
      url:''
    }
  },
  created(){
    this.imgClick()
  },
  methods:{
    //获取验证码
    getCode(){
      let params = new URLSearchParams;
      params.append('mobile',this.formData.phone)
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
                      this.showLogin = false;
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
    },
    close(){
      this.$emit("child-close",false)
    }
  },
  components:{
    Popup
  },
  watch:{
    '$route.query.reload':function (v) {
      if(v && !this._inactive) this.init()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  .regist{
    margin: 50px 0;
    width: 100%;
    padding-bottom: 50px;
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
  margin: 50px 0;
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
    font-size: 13px;

  }
  .val{
    float: right;
    font-size: 13px;
    color: #fe8d23;
  }
  .address{
    margin: 0 15px;
    height: 40px;
    line-height: 40px;
    text-align: left;
    border-bottom: 1px dashed #d7d7d7;
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
