<template>
  <div class="main">
    <div class="noScroll">
      <div class="top">
        <img src="../assets/homes-title.png" alt="" class="top_title">
        <div class="date">{{date}} 星期{{week}}</div>
      </div>
      <div class="search">
        <input type="text" placeholder="输入小区名称">
        <input type="text" placeholder="输入单元">
        <span class="searchBtn">查询</span>
      </div>
      <div class="classify">
        房源状态：
        <p><span class="green"></span>已租</p>
        <p><span class="orange"></span>已售</p>
        <p><span class="gray"></span>空置</p>
      </div>
    </div>
    <ul class="scrollCon" ref="conStyle">
      <li @click="toDetail()">
        <img src="../assets/tips.png" alt="" class="tips">
        <p class="name">六号地</p>
        <p class="house">1-1-301</p>
        <p class="area">建筑面积：110m²</p>
        <p class="area">实测面积：110m²</p>
      </li>
      <li>
        <img src="../assets/tips.png" alt="" class="tips">
        <p class="name">六号地</p>
        <p class="house">1-1-301</p>
        <p class="area">建筑面积：110m²</p>
        <p class="area">实测面积：110m²</p>
      </li>
      <li>
        <img src="../assets/tips.png" alt="" class="tips">
        <p class="name">六号地</p>
        <p class="house">1-1-301</p>
        <p class="area">建筑面积：110m²</p>
        <p class="area">实测面积：110m²</p>
      </li>
      <li>
        <img src="../assets/tips.png" alt="" class="tips">
        <p class="name">六号地</p>
        <p class="house">1-1-301</p>
        <p class="area">建筑面积：110m²</p>
        <p class="area">实测面积：110m²</p>
      </li>
      <li>
        <img src="../assets/tips.png" alt="" class="tips">
        <p class="name">六号地</p>
        <p class="house">1-1-301</p>
        <p class="area">建筑面积：110m²</p>
        <p class="area">实测面积：110m²</p>
      </li>
      <li>
        <img src="../assets/tips.png" alt="" class="tips">
        <p class="name">六号地</p>
        <p class="house">1-1-301</p>
        <p class="area">建筑面积：110m²</p>
        <p class="area">实测面积：110m²</p>
      </li>
    </ul>

    <loading v-model="isLoad" text="加载中"></loading>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg" width="60%"></toast>
  </div>
</template>

<script>
  export default {
    name: 'Homes',
    data() {
      return {
        date: '',
        week: '',
        isLoad: false,
        showPrompt: false,
        promptMsg: ''
      }
    },
    created() {
      this.getDate()
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
      toDetail(){
        this.$router.push('/homesDetail')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less" type="text/less">
  .noScroll {
    position: fixed;
    width: 100%;
    background: #fff;
    z-index: 1;
    box-shadow: 0 10px 30px #f4f7ff;
  }
  .scrollCon{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 180px auto 0;
    width: 92%;
    li{
      position: relative;
      margin-bottom: 2px;
      background: #cbcbcb;
      width: 33%;
      color: #fff;

      .tips{
        position: absolute;
        right: 0;
        width: 10px;
        height: 10px;
      }
      p{
        line-height: 16px;
        font-size: 12px;
        font-weight: bold;
        &:nth-child(2){
          padding-top: 4px;
        }
      }
      &.green{
        background: #83c7c9;
      }
      &.orange{
        background: #ffa16d;
      }
      &.gray{
        background: #cbcbcb;
      }
    }
  }
  .red{
    color: #db1919;
  }
  .green{
    color: #59dd8a;
  }

  .main {
    /*margin: 50px 0;*/
    width: 100%;
    padding-bottom: 50px;

    .top {
      padding: 23px 19px 18px;
      text-align: left;
      font-size: 12px;
      font-weight: bold;

      .top_title {
        width: 100px;
        height: auto;
      }
    }

    .search{
      margin: 0 auto;
      width: 92%;
      height: 28px;
      line-height: 28px;
      text-align: left;
      font-size: 12px;
      input{
        padding: 0 6px;
        width: 41%;
        height: 100%;
        border: 1px solid #ccced6;
        border-radius: 3px;
      }
      .searchBtn{
        float: right;
        width: 15%;
        height: 100%;
        background: #105ba7;
        border-radius: 3px;
        color: #fff;
        text-align: center;
      }
    }
    .classify{
      margin: 16px auto;
      width: 92%;
      text-align: left;
      font-size: 12px;
      font-weight: bold;
      p{
        margin-right: 30px;
        display: inline-block;
        font-weight: bold;
        span{
          margin-right: 6px;
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 3px;
          vertical-align: top;
          &.green{
            background: #83c7c9;
          }
          &.orange{
            background: #ffa16d;
          }
          &.gray{
            background: #cbcbcb;
          }
        }
      }
    }
  }
</style>
