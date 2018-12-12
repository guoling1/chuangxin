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
          @on-change="change"
          @on-cancel="log('cancel')"
          @on-confirm="onConfirmStart"
          @on-hide="log('hide', $event)"></datetime>
        ~
        <datetime
          v-model="endTime"
          @on-change="change"
          @on-cancel="log('cancel')"
          @on-confirm="onConfirmEnd"
          @on-hide="log('hide', $event)"></datetime>
        <img src="../assets/calendar.png" alt="">
      </div>
      <div class="select_status">
        <div class="name">筛选条件：</div>
        <div class="status">
          <p><i></i></p>已收款
        </div>
        <div class="status">
          <p></p>已退款
        </div>
      </div>
      <tab v-model="index" :line-width="2" :active-color="'#105ba7'" :default-color="'#000'" :bar-active-color="'#105ba7'"
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
          <th>收益</th>
          <th>同比</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in dataList">
          <td>{{item.date}}</td>
          <td>{{item.villageName}}</td>
          <td>{{item.thisFeePrice}}</td>
          <td>{{item.feeTb}}</td>
        </tr>
        <tr v-for="item in dataList">
          <td>{{item.date}}</td>
          <td>{{item.villageName}}</td>
          <td>{{item.thisFeePrice}}</td>
          <td>{{item.feeTb}}</td>
        </tr>
        <tr v-for="item in dataList">
          <td>{{item.date}}</td>
          <td>{{item.villageName}}</td>
          <td>{{item.thisFeePrice}}</td>
          <td>{{item.feeTb}}</td>
        </tr>
        </tbody>
      </x-table>
    </div>

    <loading v-model="isLoad" text="加载中"></loading>
  </div>
</template>

<script>
  export default {
    name: 'Count',
    data() {
      return {
        isLoad: false,
        date: '',
        week: '',
        startTime: '选择开始时间',
        endTime: '选择截止时间',
        page: 1,
        rows: 10,
        index: 0,
        dataList: []
      }
    },
    created() {
      this.getDate();
      this.getFeeData()
      // window.addEventListener('scroll', this.onScroll);
    },
    mounted(){
      // this.$refs.conStyle.style.marginTop=(document.querySelector('.noScroll').clientHeight)+"px";
      this.$refs.conStyle.addEventListener('scroll', () => {
        console.log(111)
        this.scrollFn()
        // console.log(" scroll " + this.$refs.viewBox.scrollTop)
        // //以下是我自己的需求，向下滚动的时候显示“我是有底线的（类似支付宝）”
        // this.isScroll=this.$refs.viewBox.scrollTop>0
      }, false)
      // 滚动区域的实际高度-滚动区域可见高度-向上滑动的高度
      // document.querySelector('.vux-table').clientHeight-(document.documentElement.clientHeight-document.querySelector('.noScroll').clientHeight-100)-document.documentElement.scrollTop
    },
    methods: {
      getDate(){
        let year = new Date().getFullYear();
        let month = new Date().getMonth()+1>10?new Date().getMonth()+1:'0'+new Date().getMonth()+1;
        let date = new Date().getDate()>10?new Date().getDate():'0'+new Date().getDate();
        this.date = year+'-'+month+'-'+date;
        let week = ['日','一','二','三','四','五','六'];
        this.week = week[new Date().getDay()]
      },
      //获取物业费
      getFeeData() {
        let formTime,ToTime;
        if(this.startTime=="选择开始时间"){
          formTime = this.date;
        }else {
          formTime = this.startTime;
        }
        if(this.endTime=="选择截止时间"){
          ToTime = this.date;
        }else {
          ToTime = this.endTime;
        }
        this.$axios.get("/show/statistics/fee?fromTime="+formTime+"&ToTime="+ToTime+"&page="+this.page+"&rows="+this.rows)
          .then(res => {
            this.dataList = res.data.rows;
          })
          .catch(error => {

          })
      },
      change(value) {
        console.log('change', value)
      },
      log(str1, str2 = '') {
        console.log(str1, str2)
      },
      onConfirmStart(val) {
        this.startTime = val;
        this.getFeeData()
      },
      onConfirmEnd(val) {
        this.endTime = val;
      },
      switchTabItem(index) {
        console.log('on-before-index-change', index);
        this.isLoad = true
        setTimeout(() => {
          this.isLoad = false;
          if(index==0){
            this.getFeeData();
          }else if(index==1){
            this.getHoldData();
          }else if(index==2){
            this.getSaleData();
          }
          this.index = index;
        }, 1000)
      },
      scrollFn(){
        console.log(111)
        console.log(document.querySelector('.vux-table').clientHeight-(document.documentElement.clientHeight-document.querySelector('.noScroll').clientHeight-100)-document.documentElement.scrollTop)
      },
      onScroll() {
        console.log(11)
        //可滚动容器的高度
        // console.log(document.querySelector('.vux-table').clientHeight)
        let innerHeight = document.querySelector('.menu').clientHeight;                    //屏幕尺寸高度
        let outerHeight = document.documentElement.clientHeight;                    //可滚动容器超出当前窗口显示范围的高度
        let scrollTop = document.documentElement.scrollTop;                    //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
        console.log(innerHeight + " " + outerHeight + " " + scrollTop);
        if (innerHeight < (outerHeight + scrollTop)) {                        //加载更多操作
          console.log("loadmore");
          // this.data = this.data.concat(this.data);
        }
      },
      toDetail(id) {
        this.$router.push({path: '/orderDetail', query: {id: id, type: 2}})
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
  .vux-datetime {
    line-height: 30px;
    display: inline-block;
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
  tbody{
    font-size: 12px;
    font-weight: bold;
  }

  .vux-tab .vux-tab-item {
    background: #fff !important;
  }

  .vux-table td:before, .vux-table th:before {
    border-bottom: none !important;
  }
</style>
