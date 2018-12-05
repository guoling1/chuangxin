<template>
  <div class="main">
    <div class="top">
      <img src="../assets/bg.png" alt="">
      <div class="card">
        <p>账户余额（元）</p>
        <p class="price">{{totalPrice}}</p>
        <div @click="tixian()">提现</div>
        <!--<router-link to="/commissionSub"><div>提现</div></router-link>-->
      </div>
    </div>
    <div>
      <tab :line-width="1" custom-bar-width="60px" bar-active-color="#fe8d23">
        <tab-item  @on-item-click="onItemClick">提现明细</tab-item>
        <tab-item selected @on-item-click="onItemClick">收入明细</tab-item>
      </tab>
    </div>
    <ul v-if="tab==0" class="withdraw">
      <!--<li>
        <div class="top">
          <span class="left">提现</span>
          <span class="right">-150</span>
        </div>
        <div class="bottom">
          <span class="left">2018-06-21</span>
          <span class="right">待审核</span>
        </div>
      </li>
      <li>
        <div class="top">
          <span class="left">提现</span>
          <span class="right">-150</span>
        </div>
        <div class="bottom">
          <span class="left">2018-06-21</span>
          <span class="right">待审核</span>
        </div>
      </li>
      <li>
        <div class="top">
          <span class="left">提现</span>
          <span class="right">-150</span>
        </div>
        <div class="bottom">
          <span class="left">2018-06-21</span>
          <span class="right">待审核</span>
        </div>
      </li>-->
    </ul>
    <table v-if="tab==1" class="income">
      <tr>
        <th>名称</th>
        <th>银行订单号</th>
        <th>冻结金额</th>
        <th>推荐金</th>
      </tr>
      <tr v-for="item in incomeData">
        <td>{{item.name}}</td>
        <td>{{item.bankOrderNo}}</td>
        <td>{{item.deposit}}</td>
        <td>{{item.money}}</td>
      </tr>
    </table>

    <!--<toast v-model="warnText" type="warn" :text=errMsg></toast>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg"></toast>-->
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg"></toast>
  </div>
</template>

<script>
  import { Tab, TabItem,Popup } from 'vux'
export default {
  name: 'commisson',
  data () {
    return {
      tab:1,
      showPrompt:false,
      promptMsg:'',
      totalPrice:0,
      incomeData:[]
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
          title: '中国联通',
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
    this.getIncome()
    this.getPrice()
  },
  methods:{
    onItemClick(index){
      this.tab = index
    },
    getPrice(){
      this.$axios.post('/open/api/rcdcash/balance',{mobile:JSON.parse(localStorage.getItem('userMessage')).mobile})
        .then(res=>{
          this.totalPrice = res.data
        })
    },
    getIncome(){
      this.$axios.post('/open/api/rcdcash/list',{mobile:JSON.parse(localStorage.getItem('userMessage')).mobile})
        .then(res=>{
          this.incomeData = res.data.list
        })
    },
    tixian(){
      this.showPrompt = true;
      this.promptMsg = '暂未开放'
    }
  },
  components: {
    Tab,
    TabItem
  },
  watch:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';
.main{
  margin: 50px 0;
  width: 100%;
  padding-bottom: 50px;

  .top{
    position: relative;
    height: 210px;
    img{
      width: 100%;
    }
    .card{
      padding: 25px 0 20px;
      position: absolute;
      top: 35px;
      left: 5%;
      width: 90%;
      background: #fff;
      border-radius: 5px;
      font-size: 11px;
      color: #a6b0ca;
      .price{
        margin: 7px 0 29px;
        font-size: 22px;
        color: #333;
      }
      div{
        margin: 0 auto;
        height: 36px;
        width: 225px;
        line-height: 36px;
        border-radius: 18px;
        font-size: 16px;
        color: #fe8d23;
        border: 1px solid #fe8d23;

      }
    }

  }
  .withdraw{
    padding: 0 15px;
    li{
      padding: 5px 0;
      /*height: 30px;*/
      text-align: left;
      border-bottom: 1px solid #f0f0f0;
    }
    .top{
      font-size: 14px;
      height: 22px;
    }
    .bottom{
      font-size: 12px;
      .left{
        color: #999999;
      }
    }
    .right{
      float: right;
    }
  }
  .income{
    width: 100%;
    font-size: 12px;
    th{
      font-weight: bold;
      height: 32px;
      line-height: 32px;
    }
    td{
      height: 40px;
      line-height: 40px;
    }
  }

  .vux-popup-dialog{
    overflow: inherit;
    background: #fff;
  }
  .vux-tab .vux-tab-item.vux-tab-selected {
    color: #fe8d23;
    border-bottom: 3px solid #fe8d23 ;
  }
  .vux-tab-ink-bar .vux-tab-bar-inner{
    width: 520px !important;
    background-color: #fe8d23 !important;
  }
}
</style>
