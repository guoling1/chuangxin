<template>
  <div class="main">
    <div class="top">
      <img src="../assets/homes-title1.png" alt="" class="top_title">
      <div class="date">{{date}} {{week}}</div>
    </div>
    <p class="name">基本信息</p>
    <ul>
      <li>
        <span>楼盘名称</span>
        <span>{{data.communityName}}</span>
      </li>
      <li>
        <span>商户姓名</span>
        <span>{{data.positionE}}</span>
      </li>
      <li>
        <span>联系电话</span>
        <span>{{data.merchantHouseNumber}}</span>
      </li>
      <li>
        <span>楼号单元号</span>
        <span>{{data.area}}m²</span>
      </li>
      <li>
        <span>地名办位置</span>
        <span>{{data.changeMoneyE}}元</span>
      </li>
      <li>
        <span>房源的状态</span>
        <span>{{data.changeReturnMoneyE}}元</span>
      </li>
      <li>
        <span>单价递增比</span>
        <span>{{data.saleReturnRemarkE}}</span>
      </li>
      <li>
        <span>租赁周期</span>
        <span>{{data.saleReturnRemarkE}}</span>
      </li>
      <li>
        <span>已交租期限</span>
        <span>{{data.saleReturnRemarkE}}</span>
      </li>
      <li>
        <span>应交保证金</span>
        <span>{{data.saleReturnRemarkE}}</span>
      </li>
      <li>
        <span>合同总价</span>
        <span>{{data.saleReturnRemarkE}}</span>
      </li>
      <li>
        <span>支付方式</span>
        <span>{{data.saleReturnRemarkE}}</span>
      </li>
      <li>
        <span>交租日期</span>
        <span>{{data.saleReturnRemarkE}}</span>
      </li>
      <li>
        <span>合同类型</span>
        <span>{{data.saleReturnRemarkE}}</span>
      </li>
    </ul>
    <loading v-model="isLoad" text="加载中"></loading>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg" width="60%"></toast>
  </div>
</template>

<script>
  export default {
    name: 'Count',
    data() {
      return {
        date:'',
        week:'',
        data: [],
        isLoad: false,
        showPrompt: false,
        promptMsg: '',
      }
    },
    created() {
      this.getDate();
      this.getData();
    },
    methods: {
      getDate() {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1 > 10 ? new Date().getMonth() + 1 : '0' + new Date().getMonth() + 1;
        let date = new Date().getDate() > 10 ? new Date().getDate() : '0' + new Date().getDate();
        this.date = year + '-' + month + '-' + date;
        let week = ['日', '一', '二', '三', '四', '五', '六'];
        this.week = week[new Date().getDay()]
      },
      getData() {
        this.isLoad = true;
        this.$axios.post(this.url+"/"+this.$route.query.id,{id: this.$route.query.id})
          .then(res => {
            this.data = res.data;
            this.isLoad = false;
          })
          .catch(error => {
            this.isLoad = false;
            this.showPrompt = true;
            this.promptMsg = error;

          })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less" type="text/less">
  .main {
    /*margin: 50px 0;*/
    width: 100%;
    /*padding-bottom: 50px;*/

    .top {
      padding: 23px 19px 40px;
      text-align: left;
      font-size: 12px;
      font-weight: bold;

      .top_title {
        width: 100px;
        height: auto;
      }
    }
    .name{
      font-size: 16px;
      font-weight: bold;
    }
    .time{
      margin: 13px 0;
      font-size: 12px;
      color: #666;
    }
    .people{
      font-size: 14px;
      font-weight: bold;
    }
    ul{
      padding: 20px;
      text-align: left;
      font-size: 14px;

      li{
        font-weight: bold;
        line-height: 26px;
        span:first-child{
          width: 100px;
          display: inline-block;
        }
      }
    }
  }
</style>
