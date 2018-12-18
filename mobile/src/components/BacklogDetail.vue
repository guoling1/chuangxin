<template>
  <div class="main">
    <div class="top">
      <img src="../assets/backlog-tit.png" alt="" class="top_title">
      <div class="date">{{date}}</div>
    </div>
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
        <span>已收费用：</span>
        <span>{{data.changeMoneyE}}元</span>
      </li>
      <li>
        <span>退款费用：</span>
        <span>{{data.changeReturnMoneyE}}元</span>
      </li>
      <li>
        <span>备注：</span>
        <span>{{data.saleReturnRemarkE}}</span>
      </li>
    </ul>
    <div class="btnGroup">
      <div class="sure" @click="agree()">同意</div>
      <div class="refuse" @click="refuse()">拒绝</div>
    </div>
    <loading v-model="isLoad" text="加载中"></loading>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg" width="60%"></toast>
    <confirm v-model="agreeShow"
             title="确认"
             @on-confirm="onConfirm">
      <p style="text-align:center;">同意退款吗？</p>
    </confirm>
  </div>
</template>

<script>
  export default {
    name: 'Count',
    data() {
      return {
        date:'',
        week:'',
        url: '',
        data: [],
        isLoad: false,
        agreeShow: false,
        showPrompt: false,
        promptMsg: '',
      }
    },
    created() {
      let type = this.$route.query.type;
      switch (Number(type)) {
        case 1:
          this.url = '/show/statistics/examine/sale';
          break;
        case 2:
          this.url = '/show/statistics/examine/leasehold';
          break;
        case 3:
          this.url = '/show/statistics/examine/water';
          break;
        case 4:
          this.url = '/show/statistics/examine/ectricity';
          break;
        case 5:
          this.url = '/show/statistics/examine/fee';
          break;
      }
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
        this.$axios.get(this.url+"/"+this.$route.query.id)
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
      agree(){
        this.agreeShow = true;
      },
      onConfirm(){
        this.isLoad = true;
        let params = {
          eId: this.data.eId,
          peId: this.data.peId,
          examineType: this.data.examineType,
          examineFlag: 4,
        }
        this.$axios.post("/sys/examine",params)
          .then(res=>{
            if(res.code=='200'){
              this.isLoad = false;
              this.showPrompt = true;
              this.promptMsg = res.msg;
              let _this = this;
              setTimeout(function () {
                _this.$router.go(-1)
              },1000)
            }else {
              this.showPrompt = true;
              this.promptMsg = res.msg
            }
          })
          .catch(err=>{
            this.isLoad = false
            this.showPrompt = true;
            this.promptMsg = err;
          })
      },
      refuse() {
        this.$router.push({path: '/backlogSubmit', query: {eId: this.data.eId, peId: this.data.peId,examineType: this.data.examineType, examineFlag: this.data.examineFlag}})
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
<style>
  .weui-dialog__btn{
    line-height: 48px !important;
  }
</style>
