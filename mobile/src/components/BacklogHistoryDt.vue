<template>
  <div class="main" style="padding-top: 30px">
    <p class="name">{{data.communityName}}{{data.positionE}}{{data.merchantHouseNumber}}退款申请</p>
    <p class="time">{{data.returnPayTimeE}}</p>
    <p class="people">提交人：{{data.returnUserId}}</p>
    <ul>
      <li>
        <span>小区：</span>
        <span>{{data.communityName}}</span>
      </li>
      <li>
        <span>位置：</span>
        <span>{{data.positionE}}</span>
      </li>
      <li>
        <span>房号：</span>
        <span>{{data.merchantHouseNumber}}</span>
      </li>
      <li>
        <span>面积：</span>
        <span>{{data.area}}m²</span>
      </li>
      <li>
        <span>退费类型：</span>
        <span>{{examineType}}</span>
      </li>
      <li>
        <span>收费时间：</span>
        <span>{{data.changeTime}}</span>
      </li>
      <li>
        <span>已收费用：</span>
        <span>{{data.changeMoneyE}}元</span>
      </li>
      <li>
        <span>退款费用：</span>
        <span>{{data.changeReturnMoneyE}}元</span>
      </li>

      <li>
        <span>退费备注：</span>
        <span>{{data.saleReturnRemarkE}}</span>
      </li>
      <li>
        <span>审核时间：</span>
        <span>{{data.examinePayTimeE}}</span>
      </li>
      <li>
        <span>审核人员：</span>
        <span>{{data.examineUserId}}</span>
      </li>
      <li>
        <span>审核备注：</span>
        <span>{{data.saleExamineRemarkE}}</span>
      </li>
    </ul>
    <loading v-model="isLoad" text="加载中"></loading>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg" width="60%"></toast>
  </div>
</template>

<script>
  export default {
    name: 'BacklogHistoryDt',
    data() {
      return {
        isLoad: false,
        url: '',
        data: [],
        showPrompt: false,
        promptMsg: '',
      }
    },
    created() {
      let type = this.$route.query.type;
      switch (Number(type)) {
        case 1:
          this.url = '/show/statistics/examine/sale';
          this.examineType = "销售";
          break;
        case 2:
          this.url = '/show/statistics/examine/leasehold';
          this.examineType = "租赁";
          break;
        case 3:
          this.url = '/show/statistics/examine/water';
          this.examineType = "水";
          break;
        case 4:
          this.url = '/show/statistics/examine/ectricity';
          this.examineType = "电";
          break;
        case 5:
          this.url = '/show/statistics/examine/fee';
          this.examineType = "物业";
          break;
      }
      this.getData();
    },
    methods: {
      //获取订单列表
      getData() {
        this.isLoad = true;
        this.$axios.get(this.url+"/"+this.$route.query.id)
          .then(res => {
            this.data = res.data;
            this.isLoad = false;
          })
          .catch(error => {
            this.showPrompt = true;
            this.promptMsg = error;
            this.isLoad = false;
          })
      }
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
