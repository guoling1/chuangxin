<template>
  <div class="main">
    <div class="top">
      <img src="../assets/homes-title1.png" alt="" class="top_title">
      <div class="date">{{date}} 星期{{week}}</div>
    </div>
    <p class="name">基本信息</p>
    <ul>
      <li>
        <span>楼盘名称</span>
        <span>{{data.communityName}}</span>
      </li>
      <li>
        <span>楼号单元号</span>
        <span>{{data.position}}-{{data.merchantHouseNumber}}</span>
      </li>
      <li>
        <span>面积</span>
        <span>{{data.area}}m²</span>
      </li>
      <li>
        <span>状态</span>
        <span>{{data.operatingState1}}</span>
      </li>
      <li>
        <span>电表数</span>
        <span>{{data.electricityNumber}}</span>
      </li>
      <li>
        <span>电费价格</span>
        <span>{{data.electricityPriceH}}元</span>
      </li>
      <li>
        <span>水表数</span>
        <span>{{data.waterNumber}}</span>
      </li>
      <li>
        <span>水费价格</span>
        <span>{{data.waterPriceH}}元</span>
      </li>
      <li>
        <span>垃圾清理费</span>
        <span>{{data.domesticWasteDisposalFeeH}}元</span>
      </li>
      <li>
        <span>预租价格</span>
        <span>{{data.prepaidPrice}}元</span>
      </li>
      <li>
        <span>预售价格</span>
        <span>{{data.advancePrice}}元</span>
      </li>
      <li>
        <span>创建时间</span>
        <span>{{data.createTime}}</span>
      </li>
      <li>
        <span>备注</span>
        <span>{{data.remark}}</span>
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
        let month = new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1);
        let date = new Date().getDate() > 9 ? new Date().getDate() : '0' + new Date().getDate();
        this.date = year + '-' + month + '-' + date;
        let week = ['日', '一', '二', '三', '四', '五', '六'];
        this.week = week[new Date().getDay()]
      },
      getData() {
        this.isLoad = true;
        this.$axios.get('/show/house/'+this.$route.query.id,{id: this.$route.query.id})
          .then(res => {
            if(res.data.operatingState=='jyzk1'){
              res.data.operatingState1='已租'
            }else if(res.data.operatingState=='jyzk2'){
              res.data.operatingState1='已售'
            }else if(res.data.operatingState=='jyzk3'){
              res.data.operatingState1='空置'
            }else if(res.data.operatingState=='jyzk4'){
              res.data.operatingState1='租赁到期'
            }
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
