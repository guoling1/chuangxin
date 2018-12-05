<template>
  <div class="main">
    <div class="shopMessage">
      <ul>
        <li>
          <span class="attr">订单金额：</span>
          <span class="value">￥{{orderMsg.deposit}}</span>
        </li>
        <li>
          <span class="attr">商品名称：</span>
          <span class="value">{{orderMsg.productName}}</span>
        </li>
      </ul>
    </div>
    <div class="directSubject">
      <span>直接付款(免登录)</span>
      <span class="right">支持银行</span>
    </div>
    <!--<div class="direct">-->
      <!--<div>-->
        <!--<span>银行卡号</span>-->
        <!--<input type="text" placeholder="信用卡/储蓄卡/中银通卡">-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="other">-->
      <!--<div>-->
        <!--<p>其他方式付款</p>-->
        <!--<input type="text" placeholder="登陆银行账户付款">-->
      <!--</div>-->
    <!--</div>-->
    <div class="button" @click="submit()">下一步</div>
  </div>
</template>

<script>
export default {
  name: 'PayMethod',
  data () {
    return {
      orderMsg:{}
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
          title: '支付',
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
    this.getData()
  },
  methods:{
    getData(){
      this.$axios.post("/open/api/order/detail/get",{id:this.$route.query.id})
        .then(res=>{
          this.orderMsg = res.data;
        })
    },
    submit(){
      let koudai;
      if(this.GLOBAL.isKDApp){
        koudai=1;
      }else {
        koudai=0;
      }
      this.$axios.post("/open/api/aotoLoginURL",{orderNo:this.$route.query.orderNo,koudai:koudai})
        .then(res=>{
          window.location.href=res.data;
        })
      // this.$router.push("/writePhone")
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
  padding-bottom: 50px;
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
  .directSubject{
    text-align: left;
    height: 54px;
    line-height: 54px;
    padding: 0 13px;
    background: #eaeaea;
    .right{
      float: right;
      color: #fd255a;
    }
  }
  .direct{
    padding: 25px 13px;
    background: #fff;
    text-align: left;
    div{
      height: 46px;
      line-height: 46px;
      border-bottom: 1px solid #eaeaea;
      input{
        height: 80%;
        margin-left: 10px;
      }
    }
  }
  .other{
    padding: 25px 13px;
    margin-top: 10px;
    background: #fff;
    text-align: left;
      div{
        /*height: 46px;*/
        /*line-height: 46px;*/
        border-bottom: 1px solid #eaeaea;
      input{
        height: 39px;
        line-height: 39px;
        /*margin-left: 10px;*/
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
