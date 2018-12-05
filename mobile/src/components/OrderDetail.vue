<template>
  <div class="main">
    <div class="order">
      <div class="orderTitle">订单信息</div>
      <div class="content">
        <p>订单状态：{{orderMsg.payStatus}}</p>
        <p>订单编号：{{orderMsg.orderNo}}</p>
        <p>创建时间：{{orderMsg.createTime | formatDate}}</p>
      </div>
    </div>
    <div class="person">
      <div class="orderTitle">购买人信息</div>
      <div class="content">
        <div class="top">
          <span class="name">{{orderMsg.name}}</span>
          <span class="phone">{{orderMsg.mobile}}</span>
        </div>
        <p class="address">{{orderMsg.address}}</p>
      </div>
    </div>
    <div class="shop">
      <div class="orderTitle">商品信息</div>
      <div class="top">
        <div class="time">{{orderMsg.productName}}</div>
        <div class="price">￥{{orderMsg.productPrice}}</div>
      </div>
      <div class="content">
        <div class="left">
          <img :src="orderMsg.swiperList[0].url" alt="">
        </div>
        <div class="right">
          <p class="color">机身颜色：{{orderMsg.productColor}}</p>
          <p class="memory">内存：{{orderMsg.productMemory}}</p>
          <p class="address">归属地：{{orderMsg.region}}</p>
          <p class="bank">开户行：{{orderMsg.bank}}</p>
          <p class="package">合约套餐：{{orderMsg.packageName}}</p>
        </div>
      </div>
    </div>
    <div class="button" @click="submit()" v-if="isPay">立即付款</div>

    <toast v-model="warnText" type="warn" :text=errMsg></toast>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg"></toast>
  </div>
</template>

<script>
  import {Popup} from 'vux'
  export default {
    name: 'OrderDetail',
    data() {
      return {
        orderMsg:{},
        isPay:false,
        warnText: false,
        errMsg: '',
        showPrompt: false,
        promptMsg: ''
      }
    },
    created() {
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
            title: '订单详情',
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
      this.$axios.post("/open/api/order/detail/get", {id: this.$route.query.id})
        .then(res => {
            if(!res.data.swiperList){
              res.data.swiperList=[{url:''}]
            }
          this.orderMsg = res.data;
          if(this.orderMsg.payStatus=='待支付'&&(this.$route.query.type==2)){
            this.isPay = true
          }
        })
    },
    methods:{
      submit(){
        this.$axios.post("/open/api/order/detail/get", {id: this.$route.query.id})
          .then(res => {
            this.orderMsg = res.data;
            if(this.orderMsg.status=='已取消'){
              this.showPrompt = true;
              this.promptMsg = '订单已取消，请重新下单'
            }else {
              let koudai;
              if(this.GLOBAL.isKDApp){
                koudai=1;
              }else {
                koudai=0;
              }
              this.$axios.post("/open/api/aotoLoginURL",{orderNo:this.orderMsg.orderNo,koudai:koudai})
                .then(res=>{
                  window.location.href=res.data;
                })
              // this.$router.push("/writePhone")
            }
          })
      }
    },
    components: {
      Popup
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  .main {
    /*margin: 50px 0;*/
    width: 100%;
    padding-bottom: 50px;
    text-align: left;

    .orderTitle {
      padding-left: 10px;
      height: 30px;
      line-height: 30px;
      background: #f4f4f4;
      font-size: 13px;
      font-weight: bold;
      text-align: left;
    }

    .order {

      .content {
        padding: 16px 10px;
        font-size: 13px;
        color: #999;

        p {
          height: 27px;
          line-height: 27px;
        }

      }
    }

    .person {

      .content {
        padding: 0 10px 15px;

        .top {
          height: 45px;
          line-height: 45px;
          font-weight: bold;

          .phone {
            float: right;
          }

        }
        .address {
          font-size: 14px;
          line-height: 20px;
        }

      }
    }
    .shop {

      .top {
        padding: 0 10px;
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid #d7d7d7;

        .time {
          float: left;
          font-size: 11px;
        }

        .price {
          float: right;
          font-size: 14px;
          color: #fd255a;
        }

      }
      .content {
        padding: 15px 10px;
        font-size: 14px;
        text-align: left;
        display: flex;

        .left {
          display: inline-block;

          img {
            width: 114px;
            height: 114px;
            border: 1px solid #d7d7d7;
            margin-right: 15px;
            border-radius: 3px;
          }

        }
        .right {
          display: inline-block;

          p {
            margin-bottom: 11px;
          }

        }

      }
    }
    .button{
      margin: 15px ;
      /*width: 203px;*/
      text-align: center;
      height: 43px;
      line-height: 43px;
      background: #fe8d23;
      border-radius: 5px;
      color: #fff;
    }

  }
</style>
