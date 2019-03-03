<template>
  <div class="main">
    <div class="noScroll">
      <div class="top">
        <img src="../assets/backlog-tit.png" alt="" class="top_title">
        <div class="date">
          <span>{{date}} 星期{{week}}</span>
          <router-link to="/backlogHistory" class="history" >历史消息</router-link>
        </div>
      </div>
      <tab :line-width="2" :active-color="'#105ba7'" :default-color="'#000'" :bar-active-color="'#105ba7'">
        <tab-item selected @on-item-click="switchTabItem(5)">物业</tab-item>
        <tab-item @on-item-click="switchTabItem(2)">招商</tab-item>
        <tab-item @on-item-click="switchTabItem(1)">销售</tab-item>
        <tab-item @on-item-click="switchTabItem(3)">水</tab-item>
        <tab-item @on-item-click="switchTabItem(4)">电</tab-item>
      </tab>
    </div>
    <div class="scrollCon">
      <ul class="scrollUl" ref="conStyle">
        <li class="clear" v-for="item in dataList">
          <div class="status">
            <span></span>
          </div>
          <div class="right clear">
            <p class="name">{{item.communityName}}{{item.positionE}}{{item.merchantHouseNumber}}退款申请</p>
            <p class="date">{{item.returnPayTimeE}}</p>
            <div class="detail" @click="toDetail(item.eId,item.examineType)">查看详情</div>
            <!--<p class="detail"></p>-->
          </div>
        </li>
      </ul>
    </div>


    <loading v-model="isLoad" text="加载中"></loading>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg" width="60%"></toast>
  </div>
</template>

<script>
  export default {
    name: 'Backlog',
    data() {
      return {
        date: '',
        week: '',
        examineType: 5,
        page: 1,
        rows: 10,
        dataList: [],
        isLoad: false,
        showPrompt: false,
        promptMsg: '',
      }
    },
    created() {
      this.getDate();
      this.getData();
      window.addEventListener('scroll', this.onScroll);
    },
    mounted(){
      // this.$refs.conStyle.style.marginTop=(document.querySelector('.noScroll').clientHeight)+"px";
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
        if (this.page == 1) {
          this.dataList = [];
        }
        let params = {
          examineFlag: 2,
          examineType: this.examineType,
          page: this.page,
          rows: this.rows
        }
        this.$axios.post("/show/statistics/examine", params)
          .then(res => {
            this.count = res.data.total;
            this.dataList = this.dataList.concat(res.data.rows);
            this.isLoad = false;
          })
          .catch(error => {
            this.showPrompt = true;
            this.promptMsg = error;
            this.isLoad = false;
          })
      },
      switchTabItem(num) {
        this.examineType = num;
        this.page = 1;
        this.getData()
      },
      onScroll() {
        //可滚动容器的高度
        let innerHeight = document.querySelector('.scrollUl').clientHeight;                    //屏幕尺寸高度
        let outerHeight = document.documentElement.clientHeight - (document.documentElement.clientHeight - document.querySelector('.noScroll').clientHeight - 100);                    //可滚动容器超出当前窗口显示范围的高度
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;                    //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
        if (innerHeight - (outerHeight + scrollTop)) {                        //加载更多操作
          if (this.count > this.page * this.rows) {
            console.log("loadmore");
            this.page++;
            this.getData()
          }
        }
      },
      toDetail(id,type) {
        this.$router.push({path: '/backlogDetail', query: {id: id,type:type}})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less" type="text/less">
  .noScroll{
    position: fixed;
    width: 100%;
    background: #fff;
    z-index: 1;
  }
  .scrollCon{
    margin-top: 125px;
  }
  .main {
    /*margin: 50px 0;*/
    width: 100%;
    padding-bottom: 50px;
    min-height: 100%;
    background: #f9f9f9;

    .top {
      padding: 23px 19px 18px;
      text-align: left;
      font-size: 12px;
      font-weight: bold;

      .top_title {
        width: 100px;
        height: auto;
      }

      .history{
        float: right;
        color: #333;
        font-weight: bold;
      }
    }

    .scrollCon{
      margin-top: 128px;
      ul{
        padding: 30px 0;
        background: #f9f9f9;
      }
      li{
        margin: 0 auto 28px;
        padding: 24px 15px 9px 7px;
        width: 90%;
        background: #fff;
        border-radius: 8px;
        .status{
          float: left;
          span{
            margin-top: 24px;
            display: inline-block;
            width: 10px;
            height: 10px;
            background: #fb2b5c;
            border-radius: 50%;
          }
        }
        .right{
          margin-left: 24px;
          text-align: left;
          color: #666;
          font-size: 14px;
          .name{
            font-size: 16px;
            font-weight: bold;
            color: #000;
          }
          .date{
            margin: 13px 0 18px;
          }
          .detail{
            float: right;
            color: #105ba7;
            font-size: 12px;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
<style>

  .dp-header .dp-item.dp-right {
    color: #105ba7 !important;
  }

  .vux-tab-wrap {
    font-weight: bold;
    border-top: 1px solid #e4e4e4;
    z-index: 1;
    box-shadow: 0 10px 30px #f4f7ff;
  }

  .vux-table {
    margin-top: -1px;
  }

  .vux-tab .vux-tab-item {
    background: #fff !important;
  }

  .vux-table td:before, .vux-table th:before {
    border-bottom: none !important;
  }
  .scrollable .vux-tab-item {
    -ms-flex: 0 0 20% !important;
    flex: 0 0 20% !important;
  }
</style>
