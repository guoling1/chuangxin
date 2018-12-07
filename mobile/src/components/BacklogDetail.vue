<template>
  <div class="main">
    <div class="top">
      <img src="../assets/backlog-tit.png" alt="" class="top_title">
      <div class="date">{{date}}</div>
    </div>
    <p class="name">创鑫华府3号楼2单元403退款申请</p>
    <p class="time">2018-11-24</p>
    <p class="people">提交人：康师傅</p>
    <ul>
      <li>
        <span>小区：</span>
        <span>创鑫华府</span>
      </li>
      <li>
        <span>位置：</span>
        <span>3号楼2单元</span>
      </li>
      <li>
        <span>房号：</span>
        <span>302</span>
      </li>
      <li>
        <span>面积：</span>
        <span>78</span>
      </li>
      <li>
        <span>已收费用：</span>
        <span>1332233</span>
      </li>
      <li>
        <span>退款费用：</span>
        <span>8886</span>
      </li>
      <li>
        <span>备注：</span>
        <span>业主不在租赁，需要退还剩余3个月物业费用</span>
      </li>
    </ul>
    <div class="btnGroup">
      <div class="sure">同意</div>
      <div class="refuse" @click="refuse">拒绝</div>
    </div>
    <loading v-model="a" text="加载中"></loading>
  </div>
</template>

<script>
  export default {
    name: 'Count',
    data() {
      return {
        a: false,
        date: '2018年11月23日 星期五',
        index: 0,
        orderList: []
      }
    },
    created() {
      // this.getData()
    },
    methods: {
      //获取订单列表
      getData() {
        this.$axios.post("/open/api/order/list", {mobile: JSON.parse(localStorage.getItem("userMessage")).mobile})
          .then(res => {
            for (let i = 0; i < res.data.list.length; i++) {
              if (!res.data.list[i].swiperList || res.data.list[i].swiperList.length == 0) {
                res.data.list[i].swiperList = [{url: ''}]
              }
            }
            this.orderList = res.data.list;
          })
          .catch(error => {

          })
      },
      refuse(id) {
        this.$router.push({path: '/backlogSubmit', query: {id: 1, type: 2}})
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
