<template>
  <div class="main">
    <div class="shopMessage">
      <p>恭喜你，您的订单信息已提交成功。我们将会第一时间审核您的资料信息，并且通过手机短信通知您受理结果。</p>
      <ul>
        <li>
          <span class="attr">订单编号：</span>
          <span class="value">{{orderMsg.orderNo}}</span>
        </li>
        <li>
          <span class="attr">创建时间：</span>
          <span class="value">{{orderMsg.createTime|formatDate}}</span>
        </li>
        <li>
          <span class="attr">托管金额：</span>
          <span class="value">{{orderMsg.deposit}}元</span>
        </li>
        <li>
          <span class="attr">银行：</span>
          <span class="value">{{orderMsg.bank}}</span>
        </li>
      </ul>
    </div>
    <div class="userMessage">
      <div class="subject">商品信息</div>
      <ul>
        <li>
          <span class="attr">商品名称：</span>
          <span class="value">{{orderMsg.productName}}</span>
        </li>
        <li>
          <span class="attr">商品规格：</span>
          <span class="value">{{productData.productMemory}}{{productData.productColor}}</span>
        </li>
        <li>
          <span class="attr">手机号码：</span>
          <span class="value">{{orderMsg.productMobile}}</span>
        </li>
        <li>
          <span class="attr">套餐名称：</span>
          <span class="value">{{productData.packageName}}</span>
        </li>
        <li>
          <span class="attr">价格：</span>
          <span class="value">{{orderMsg.productPrice}}</span>
        </li>
        <li>
          <span class="attr">所在地区：</span>
          <span class="value">{{orderMsg.region}}</span>
        </li>
      </ul>
    </div>
    <div class="userMessage">
      <div class="subject">客户信息</div>
      <ul>
        <li>
          <span class="attr">客户姓名：</span>
          <span class="value">{{orderMsg.customerName}}</span>
        </li>
        <li>
          <span class="attr">收货地址：</span>
          <span class="value">{{orderMsg.address}}</span>
        </li>
        <li>
          <span class="attr">身份证号：</span>
          <span class="value">{{orderMsg.idcard}}</span>
        </li>
        <li>
          <span class="attr">手机号码：</span>
          <span class="value">{{orderMsg.mobile}}</span>
        </li>
        <li>
          <span class="attr">邮箱：</span>
          <span class="value">{{orderMsg.email}}</span>
        </li>
      </ul>
    </div>
    <div class="button" @click="submit()">订单支付</div>
    <div class="showSubmit">
      <x-dialog v-model="showSubmit" class="dialog-demo">
        <div class="top">
          <span>支付方式</span>
        </div>
        <p>恭喜你，您的订单信息已提交成功。您可以通过银行柜台或手机网银转账到您的托管账户完成支付。</p>
        <ul>
          <li>
            <span class="attr">订单编号：</span>
            <span class="value" style="width: 60%;height: 70%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
 display: inline-block;">{{orderMsg.orderNo}}</span>
          </li>
          <li>
            <span class="attr">创建时间：</span>
            <span class="value">{{orderMsg.createTime|formatDate}}</span>
          </li>
          <li>
            <span class="attr">托管金额：</span>
            <span class="value">{{orderMsg.deposit}}</span>
          </li>
          <li>
            <span class="attr">订单状态：</span>
            <span class="value">{{orderMsg.payStatus}}</span>
          </li>
        </ul>
        <div class="bottom" @click="pay()">在线支付</div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
  import {XDialog} from "vux"
export default {
  name: 'OrderSubmit',
  data () {
    return {
      showSubmit:false,
      orderMsg:{},
      productData:JSON.parse(localStorage.getItem("productMessage"))
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
          title: '提交订单',
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
      this.showSubmit = true;
    },
    pay(){
      if(this.GLOBAL.isKDApp){
        window.aladdin.navigator.forward({url:'http://www.wojinxin.com/#/payMethod?orderNo='+this.orderMsg.orderNo+'&id='+this.$route.query.id});
      }else{
        this.$router.push({path:"/payMethod",query:{orderNo:this.orderMsg.orderNo,id:this.$route.query.id}})
      }
    }
  },
  components:{
    XDialog
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
.main{
  margin: 50px 0;
  padding-bottom: 50px;
  width: 100%;
ul{

  margin-bottom:15px;
li{
  height: 34px;
  line-height: 34px;
  margin-top: -1px;
  border: 1px solid #e7e7e7;
.attr{
  text-align: center;
  display: inline-block;
  margin-right: 10px;
  height: 100%;
  width: 72px;
  font-size: 12px;
  color: #fff;
  background: #444c59;
}
.value{
  font-size: 14px;
}
}
}
.subject{
  height: 52px;
  line-height: 52px;
}
  .shopMessage{
    padding: 0 15px;
    text-align: left;
    p{
      line-height: 30px;
      margin-bottom: 23px;
    }
  }
  .userMessage{
    padding: 0 15px;
    text-align: left;
    border-top: 10px solid #eaeaea;
  }
  .button{
    /*margin-top: 37px;*/
    height: 48px;
    line-height: 48px;
    color: #fff;
    font-weight: bold;
    background: #fe8d23;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .showSubmit{

    .top{
      height: 45px;
      line-height: 45px;
      background: #444c59;
      color: #fff;
    }
    p{
      text-align: left;
      padding: 0 15px;
      color: #444c59;
      line-height: 30px;
      margin-bottom: 23px;
    }
    ul{
      padding: 0 15px;
      text-align: left;
      li .attr{
        margin-right: 0;
      }
    }
    .bottom{
      margin: 15px auto;
      width: 189px;
      height: 40px;
      line-height: 40px;
      color: #fff;
      border-radius: 4px;
      background: #fe8d23;
    }
  }
}
</style>
