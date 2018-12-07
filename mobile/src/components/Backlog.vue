<template>
  <div class="main">
    <div class="noScroll">
      <div class="top">
        <img src="../assets/backlog-tit.png" alt="" class="top_title">
        <div class="date">
          <span>{{date}}</span>
          <span class="history">历史消息</span>
        </div>
      </div>
      <tab v-model="index" :line-width="2" :active-color="'#105ba7'" :default-color="'#000'" :bar-active-color="'#105ba7'" custom-bar-width="62px" prevent-default @on-before-index-change="switchTabItem">
        <tab-item selected>物业</tab-item>
        <tab-item>租赁</tab-item>
        <tab-item>销售</tab-item>
      </tab>
    </div>
    <ul class="scrollCon" ref="conStyle">
      <li class="clear">
        <div class="status">
          <span></span>
        </div>
        <div class="right clear">
          <p class="name">创鑫华府3号楼2单元403退款申请</p>
          <p class="date">2018-11-24</p>
          <router-link to="/backlogDetail" class="detail">查看详情</router-link>
          <!--<p class="detail"></p>-->
        </div>
      </li>
    </ul>

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
        },{
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
    z-index: 1;
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
      }
    }

    .scrollCon{
      padding-top: 28px;
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
</style>
