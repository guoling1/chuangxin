<template>
  <div class="main">
    <div class="noScroll">
      <div class="top">
        <img src="../assets/count-tit.png" alt="" class="top_title">
        <div class="date">{{date}} 星期{{week}}</div>
      </div>
      <div class="select_time">
        <datetime
          v-model="startTime"
          :end-date="endDate"
          @on-confirm="onConfirmStart"></datetime>
        ~
        <datetime
          v-model="endTime"
          :start-date="startDate"
          @on-confirm="onConfirmEnd"></datetime>
        <img src="../assets/calendar.png" alt="">
      </div>
      <div class="select_status">
        <div class="name">筛选条件：</div>
        <div class="status" @click="changeStatus(0)">
          <p><i v-if="status=='0'"></i></p>已收款
        </div>
        <div class="status" @click="changeStatus(1)">
          <p><i v-if="status=='1'"></i></p>已退款
        </div>
      </div>
      <tab v-model="index" :line-width="2" :active-color="'#105ba7'" :default-color="'#000'"
           :bar-active-color="'#105ba7'"
           custom-bar-width="62px" prevent-default @on-before-index-change="switchTabItem">
        <tab-item selected>物业</tab-item>
        <tab-item>租赁</tab-item>
        <tab-item>销售</tab-item>
      </tab>
    </div>
    <div class="scrollCon" ref="conStyle">
      <x-table :cell-bordered="false" :content-bordered="false">
        <thead>
        <tr>
          <th>时间</th>
          <th>小区</th>
          <th v-if="status=='0'">收益</th>
          <th v-if="status=='0'">同比</th>
          <th v-if="status=='1'">退款</th>
          <th v-if="status=='1'">同比</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in dataList">
          <td>{{item.date}}</td>
          <td>{{item.villageName}}</td>
          <td v-if="status=='0'">{{item.thisFeePrice}}</td>
          <td v-if="status=='0'" :class="item.numStatus?'red':'green'">{{item.numStatus?'↑':'↓'}}{{item.feeTb}}%</td>
          <td v-if="status=='1'">{{item.thisFeePrice1}}</td>
          <td v-if="status=='1'" :class="item.numStatus1?'red':'green'">{{item.numStatus1?'↑':'↓'}}{{item.feeTb1}}%</td>
        </tr>
        </tbody>
      </x-table>
    </div>

    <loading v-model="isLoad" text="加载中"></loading>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg" width="60%"></toast>
  </div>
</template>

<script>
  export default {
    name: 'Count',
    data() {
      return {
        date: '',
        week: '',
        startTime: '选择开始时间',
        startDate: '1970-01-01',
        endTime: '选择截止时间',
        endDate: '2222-12-31',
        page: 1,
        rows: 10,
        index: 0,
        status: 0,
        dataList: [],
        isLoad: false,
        showPrompt: false,
        promptMsg: '',
        url:'/show/statistics/fee'
      }
    },
    created() {
      this.getDate();
      this.getData()
      window.addEventListener('scroll', this.onScroll);
    },
    mounted() {
      // this.$refs.conStyle.style.marginTop = (document.querySelector('.noScroll').clientHeight) + "px";
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
        let formTime, ToTime;
        if (this.startTime == "选择开始时间") {
          formTime = this.date;
        } else {
          formTime = this.startTime;
        }
        if (this.endTime == "选择截止时间") {
          ToTime = this.date;
        } else {
          ToTime = this.endTime;
        }
        if (this.page == 1) {
          this.dataList = [];
        }
        let params = {
          fromTime: formTime,
          ToTime: ToTime,
          page: this.page,
          rows: this.rows
        }
        this.$axios.post(this.url, params)
          .then(res => {
            this.count = res.data.total;
            for (let i = 0; i < res.data.rows.length; i++) {
              res.data.rows[i].date = formTime + '至' + ToTime;
              if(res.data.rows[i].feeTb<0){
                res.data.rows[i].feeTb=res.data.rows[i].feeTb.replace('-','');
                res.data.rows[i].numStatus=false
              }else {
                res.data.rows[i].numStatus=true
              }
              if(res.data.rows[i].feeTb1<0){
                res.data.rows[i].feeTb1=res.data.rows[i].feeTb1.replace('-','');
                res.data.rows[i].numStatus1=false
              }else {
                res.data.rows[i].numStatus1=true
              }
            }
            this.dataList = this.dataList.concat(res.data.rows);
            this.isLoad = false;
          })
          .catch(error => {
            this.showPrompt = true;
            this.promptMsg = error;
            this.isLoad = false;
          })
      },
      changeStatus(ind) {
        this.status = ind;
        this.page = 1;
        this.getData()
      },
      onConfirmStart(val) {
        this.page = 1;
        this.startDate = this.startTime
        this.startTime = val;
        this.getData()
      },
      onConfirmEnd(val) {
        this.page = 1;
        this.endDate = this.endTime
        this.endTime = val;
        this.getData()
      },
      switchTabItem(index) {
        // this.isLoad = true;
        if (index == 0) {
          this.url="/show/statistics/fee";
        } else if (index == 1) {
          this.url="/show/statistics/leasehold";
        } else if (index == 2) {
          this.url="/show/statistics/sale";
        }
        this.page = 1;
        this.index = index;
        this.getData()
      },
      onScroll() {
        //可滚动容器的高度
        let innerHeight = document.querySelector('.vux-table').clientHeight;                    //屏幕尺寸高度
        let outerHeight = document.documentElement.clientHeight - (document.documentElement.clientHeight - document.querySelector('.noScroll').clientHeight - 100);                    //可滚动容器超出当前窗口显示范围的高度
        let scrollTop = document.documentElement.scrollTop;                    //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
        if (innerHeight - (outerHeight + scrollTop) < 70) {                        //加载更多操作
          if (this.count > this.page * this.rows) {
            console.log("loadmore");
            this.page++;
            this.getData()
          }
        }
      }
    },
    destroyed() {
      window.removeEventListener('scroll', this.onScroll)
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
  }
  .scrollCon{
    margin-top: 202px;
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

    .select_time {
      margin: 0 auto;
      width: 80%;
      height: 31px;
      background: #f9f9f9;
      border: 1px solid #e4e4e4;
      border-radius: 16px;
      font-size: 14px;

      img {
        float: right;
        margin: 5px 15px 0 0;
        width: 18px;
        height: auto;
      }
    }

    .select_status {
      display: flex;
      justify-content: space-around;
      margin: 15px auto 8px;
      width: 70%;
      font-size: 14px;
      color: #000;

      p {
        display: inline-block;
        margin-right: 7px;
        width: 14px;
        height: 14px;
        border: 1px solid #105ba7;
        border-radius: 2px;
        vertical-align: baseline;

        i {
          display: inline-block;
          margin-bottom: 2px;
          width: 8px;
          height: 8px;
          background: #105ba7;
          border-radius: 2px;
        }
      }
    }

    tr {
      height: 40px;
      line-height: 40px;
    }

    .prompt {
      margin-top: 20%;
      font-size: 14px;

      p {
        line-height: 20px;
        margin-top: 15px;

        a {
          display: inline-block;
          margin: 0 3px;
          color: #fe8d23;
          text-decoration: underline;
        }
      }
    }
  }
</style>
<style>
  .weui-cell_access .weui-cell__ft:after{
    display: none !important;
  }
  .weui-cell_access .weui-cell__ft {
    padding-right: 0 !important;
  }
  .weui-cell {
    padding: 0 !important;
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
  }
  .vux-datetime {
    line-height: 30px;
    display: inline-block !important;
    font-size: 14px;
    color: #999;
  }

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

  tbody {
    font-size: 12px;
    font-weight: bold;
  }

  .vux-tab .vux-tab-item {
    background: #fff !important;
  }

  .vux-table td:before, .vux-table th:before {
    border-bottom: none !important;
  }

  .vux-table td:first-child {
    width: 93px;
  }
</style>
