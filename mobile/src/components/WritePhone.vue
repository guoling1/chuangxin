<template>
  <div class="main">
    <div class="shopMessage">
      <ul>
        <li>
          <span class="attr">订单金额：</span>
          <span class="value">￥6000.00</span>
        </li>
        <li>
          <span class="attr">商品名称：</span>
          <span class="value">平安银行放大镜看的附件是快乐的时间发货</span>
        </li>
      </ul>
    </div>
    <div class="userMessage">
      <ul>
        <li>
          <span>招商银行</span>
          <input type="text">
        </li>
        <li>
          <span>手机号</span>
          <input type="text" placeholder="银行预留手机号">
        </li>
        <li>
          <span>验证码</span>
          <input type="text" placeholder="短信验证码">
          <span class="sendCode">免费获取</span>
        </li>
      </ul>
      <div>
        <img src="../assets/sure.png" alt="">
        <span>接受</span>
        <span class="protocol">银联用户服务协议</span>
      </div>
      <div>
        <img src="../assets/sure.png" alt="">
        <span>记住卡号</span>
      </div>
    </div>
    <div class="button" @click="submit()">开通并付款</div>
  </div>
</template>

<script>
export default {
  name: 'WritePhone',
  data () {
    return {

    }
  },
  methods:{
    submit(){
      if(this.GLOBAL.isKDApp){
        window.aladdin.navigator.forward({url:'http://www.wojinxin.com/#/orderDetail'});
      }else{
        this.$router.push('/orderDetail')
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
.main{
  margin: 50px 0 0;
  background: #e7e7e7;
  font-size: 14px;
  height: 100%;
  width: 100%;
  .shopMessage{
    background: #fff;
    padding: 0 15px;
    text-align: left;
    border-top: 10px solid #eaeaea;
    ul{
      padding:11px 0;
      li{
        height: 28px;
        line-height: 28px;
        font-size:14px;
        .value{
          color: #666;
        }
      }
      li:nth-child(1) .value{
        font-size: 18px;
        font-weight: bold;
        color: #fd255a;
      }
    }
  }
  .userMessage{
    background: #fff;
    padding: 0 15px 14px;
    text-align: left;
    border-top: 10px solid #eaeaea;
    ul{
      margin-bottom: 13px;
      padding-top:18px;
      li{
        font-size: 14px;
        height: 37px;
        line-height: 37px;
        border-bottom: 1px solid #e5e5e5;
        span{
          display: inline-block;
          width: 66px;
        }
        span.sendCode{
          float: right;
          width: auto;
          margin-top: 8px;
          padding: 0 14px;
          height: 20px;
          line-height: 20px;
          border-radius: 5px;
          background: #444c59;
          font-size: 12px;
          color: #fff;
        }
      }
    }
    div{
      height: 30px;
      line-height: 30px;
      img{
        display: inline-block;
        width: 15px;
        height: 15px;
      }
      .protocol{
        color: #009eff;
      }
    }
  }
  .button{
    margin: 0 15px;
    margin-top: 37px;
    height: 48px;
    line-height: 48px;
    color: #fff;
    font-weight: bold;
    background: #fe8d23;
    border-radius: 5px;
  }
}
</style>
