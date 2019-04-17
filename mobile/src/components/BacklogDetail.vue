<template>
  <div class="main">
    <div class="top">
      <img src="../assets/count-title1.png" alt="" class="top_title">
      <div class="date">{{date}} 星期{{week}}</div>
    </div>
    <p class="name">{{data.villageName}}{{data.position}}{{data.merchantHouseNumber}}缴费</p>
    <p class="time">{{data.returnPayTimeE}}</p>
    <p class="people">提交人：{{data.username}}</p>
    <ul>
      <li>
        <span>楼盘：</span>
        <span>{{data.villageName}}</span>
      </li>
      <li>
        <span>位置：</span>
        <span>{{data.position}}</span>
      </li>
      <li>
        <span>房号：{{data.merchantHouseNumber}}</span>
        <span></span>
      </li>
      <li>
        <span>面积：</span>
        <span>{{data.area}}m²</span>
      </li>
      <li>
        <span>已收费用：</span>
        <span>{{data.payPrice||0}}元</span>
      </li>
      <li>
        <span>退款费用：</span>
        <span>{{data.returnPrice||0}}元</span>
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
        url: '',
        isLoad: false,
        showPrompt: false,
        promptMsg: '',
      }
    },
    created() {
      if(this.$route.query.type=='sale'){
        this.url = '/show/statistics/salePayment'
      }else if(this.$route.query.type=='leasehold'){
        this.url = '/show/statistics/leaseholdPayment'
      }else if(this.$route.query.type=='fee'){
        this.url = '/show/statistics/feePayment'
      }
      this.getDate();
      this.getData();
    },
    methods: {
      getDate() {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1 > 10 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1);
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
      width: 92%;
      font-size: 16px;
      font-weight: bold;
      word-wrap: break-word;
      margin: 0 auto;
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
      }
      span{
        word-wrap: break-word;
      }
    }
    .btnGroup{
      display: flex;
      justify-content: space-around;
      div{
        margin-top: 20px;
        width: 40%;
        height: 44px;
        line-height: 44px;
        background: #cbcbcb;
        border-radius: 22px;
        color: #fff;
      }
      div.sure{
        background: #105ba7;
      }
    }
  }
</style>
