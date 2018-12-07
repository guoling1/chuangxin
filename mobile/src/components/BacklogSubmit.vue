<template>
  <div class="main">
    <div class="top">
      <img src="../assets/backlog-tit.png" alt="" class="top_title">
      <div class="date">{{date}}</div>
    </div>
    <textarea></textarea>
    <div class="btn">提交</div>

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
      toDetail(id) {
        this.$router.push({path: '/orderDetail', query: {id: id, type: 2}})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less" type="text/less">
  .main {
    /*margin: 50px 0;*/
    width: 100%;
    padding-bottom: 50px;

    .top {
      padding: 23px 19px 42px;
      text-align: left;
      font-size: 12px;
      font-weight: bold;

      .top_title {
        width: 100px;
        height: auto;
      }
    }
    textarea{
      width: 80%;
      height: 280px;
      border-radius: 8px;
      border: 1px solid #cbcbcb;
    }
    .btn{
      margin: 60px auto 0;
      width: 85%;
      line-height: 44px;
      background: #105ba7;
      color: #fff;
      border-radius: 8px;
    }
  }
</style>
