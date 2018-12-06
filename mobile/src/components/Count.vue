<template>
  <div class="main">
    <div class="noScroll">
      <div class="top">
        <img src="../assets/count-tit.png" alt="" class="top_title">
        <div class="date">{{date}}</div>
      </div>
      <div class="select_time">
        <datetime
          v-model="startTime"
          @on-change="change"
          @on-cancel="log('cancel')"
          @on-confirm="onConfirm"
          @on-hide="log('hide', $event)"></datetime>
        ~
        <datetime
          v-model="endTime"
          @on-change="change"
          @on-cancel="log('cancel')"
          @on-confirm="onConfirm"
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
        <tab-item selected>已发货</tab-item>
        <tab-item>未发货</tab-item>
        <tab-item>全部订单</tab-item>
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
        <tr v-for="item in data">
          <td>{{item.date}}</td>
          <td>{{item.address}}</td>
          <td>{{item.income}}</td>
          <td>{{item.ratio}}</td>
        </tr>
        </tbody>
      </x-table>
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
        startTime: '选择开始时间',
        endTime: '选择截止时间',
        confirmColor: '#105ba7',
        index: 0,
        data: [{
          date: '2018/11/01',
          address: '创鑫华府',
          income: 10032,
          ratio: '12%'
        }, {
          date: '2018/11/01',
          address: '创鑫华府',
          income: 10032,
          ratio: '12%'
        }, {
          date: '2018/11/01',
          address: '创鑫华府',
          income: 10032,
          ratio: '12%'
        }, {
          date: '2018/11/01',
          address: '创鑫华府',
          income: 10032,
          ratio: '12%'
        }, {
          date: '2018/11/01',
          address: '创鑫华府',
          income: 10032,
          ratio: '12%'
        }, {
          date: '2018/11/01',
          address: '创鑫华府',
          income: 10032,
          ratio: '12%'
        }, {
          date: '2018/11/01',
          address: '创鑫华府',
          income: 10032,
          ratio: '12%'
        }, {
          date: '2018/11/01',
          address: '创鑫华府',
          income: 10032,
          ratio: '12%'
        }, {
          date: '2018/11/01',
          address: '创鑫华府',
          income: 10032,
          ratio: '12%'
        }],
        orderList: []
      }
    },
    created() {
      // this.getData()
      window.addEventListener('scroll', this.onScroll);
    },
    mounted(){
      this.$refs.conStyle.style.marginTop=(document.querySelector('.noScroll').clientHeight)+"px";
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
      change(value) {
        console.log('change', value)
      },
      log(str1, str2 = '') {
        console.log(str1, str2)
      },
      onConfirm(val) {
        console.log('on-confirm arg', val)
        console.log('current value', this.value1)
      },
      switchTabItem(index) {
        console.log('on-before-index-change', index);
        this.a = true
        setTimeout(() => {
          this.a = false
          this.index = index
        }, 1000)
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
          this.data = this.data.concat(this.data);
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
    z-index: 11;
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

    .list {

      li {
        padding: 0 10px;
        border-top: 10px solid #f4f4f4;
        width: 100%;

        .top {
          height: 38px;
          line-height: 38px;
          border-bottom: 1px solid #d7d7d7;

          .time {
            float: left;
            font-size: 11px;
          }

          .price {
            float: right;
            font-size: 14px;
            color: #fd255a;
          }
        }

        .content {
          padding: 15px 0 0;
          font-size: 14px;
          border-bottom: 1px solid #d7d7d7;
          text-align: left;
          display: flex;

          .left {
            display: inline-block;
            margin-right: 10px;
            /*float: left;*/

            img {
              width: 114px;
              height: 114px;
              border: 1px solid #d7d7d7;
              border-radius: 3px;
            }
          }

          .right {
            display: inline-block;

            p {
              margin-bottom: 11px;
              /*margin-left: 130px;*/
            }
          }

        }

        .bottom {
          text-align: left;
          font-size: 13px;
          color: #666666;
          height: 44px;
          line-height: 44px;

          .state {
            display: inline-block;
            text-align: left;
          }

          .button {
            margin-top: 10px;
            width: 82px;
            height: 25px;
            font-size: 12px;
            color: #333;
            line-height: 25px;
            text-align: center;
            border: 1px solid #333;
            border-radius: 3px;
            float: right;
          }
        }
      }
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

    .showLogin {

      .top {
        height: 41px;
        line-height: 41px;
        font-size: 18px;
        background: #444c59;
        color: #fff;

        .close {
          position: absolute;
          top: 14px;
          right: 10px;
          display: inline-block;
          background-image: url("../assets/closeWrite.png");
          background-size: 13px 13px;
          width: 13px;
          height: 13px;
        }

      }

      .content {
        padding: 15px;
        text-align: left;

        ul {

          li {
            height: 55px;
            border-bottom: 1px solid #e5e5e5;
            font-size: 14px;
            color: #666666;

            input {
              margin-top: 23px;
              height: 30px;
              width: 60%;
            }

            img {
              float: right;
              margin-top: 28px;
              display: inline-block;
              height: 20px;
              width: 70px;
              border-radius: 4px;
            }

            span {
              float: right;
              margin-top: 28px;
              display: inline-block;
              padding: 0 5px;
              height: 20px;
              line-height: 20px;
              font-size: 12px;
              color: #fff;
              background: #4e4e4e;
              border-radius: 4px;
            }

          }
        }
      }

      .buy {
        margin: 13px auto;
        width: 203px;
        height: 43px;
        line-height: 43px;
        background: #fe8d23;
        border-radius: 5px;
        color: #fff;
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

  .vux-tab .vux-tab-item {
    background: #fff !important;
  }

  .vux-table td:before, .vux-table th:before {
    border-bottom: none !important;
  }
</style>
