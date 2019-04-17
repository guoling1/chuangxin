<template>
  <div class="main">
    <div class="noScroll">
      <div class="top">
        <img src="../assets/count-tit.png" alt="" class="top_title">
        <div class="date">{{date}} 星期{{week}}</div>
      </div>
    </div>
    <div class="scrollCon" ref="conStyle">
      <ul class="ul">
        <li v-for="item in dataList" class="clear" @click="toDetail(item.merchantHouseId)">
          <div class="left">
            <p class="name">{{item.villageName}}</p>
            <p class="detail">{{item.position}}</p>
          </div>
          <div class="right">
            <div>
              <p class="name">缴费时间</p>
              <p class="detail">{{item.payTime}}</p>
            </div>
            <div style="max-width: 33%">
              <p class="name">门牌号码</p>
              <p class="detail" style="width: 100%;white-space: nowrap;

 text-overflow:ellipsis;

 overflow:hidden;">{{item.position}}-{{item.merchantHouseNumber}}</p>
            </div>
            <div class="price">
              <p class="name">缴费金额</p>
              <p class="detail">{{item.payPrice}}</p>
            </div>
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
    name: 'Count',
    data() {
      return {
        date: '',
        week: '',
        page: 1,
        rows: 10,
        url:'',
        dataList: [],
        isLoad: false,
        showPrompt: false,
        promptMsg: ''
      }
    },
    created() {
      if(this.$route.query.type=='sale'){
        this.url = '/show/statistics/salePay'
      }else if(this.$route.query.type=='leasehold'){
        this.url = '/show/statistics/leaseholdPay'
      }else if(this.$route.query.type=='fee'){
        this.url = '/show/statistics/feePay'
      }
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
        let month = new Date().getMonth() + 1 > 10 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1);
        let date = new Date().getDate() > 10 ? new Date().getDate() : '0' + new Date().getDate();
        this.date = year + '-' + month + '-' + date;
        let week = ['日', '一', '二', '三', '四', '五', '六'];
        this.week = week[new Date().getDay()]
      },
      getData() {
        this.isLoad = true;
        let params = {
          fromTime: this.$route.query.fromTime,
          ToTime: this.$route.query.ToTime,
          villageName: this.$route.query.villageId,
          page: this.page,
          rows: this.rows
        }
        this.$axios.post(this.url, params)
          .then(res => {
            this.count = res.data.total;
            for (let i = 0; i < res.data.rows.length; i++) {

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
      toDetail(id){
        this.$router.push('/backlogDetail?type='+this.$route.query.type+'&id='+id)
      },
      onScroll() {
        //可滚动容器的高度
        let innerHeight = document.querySelector('.ul').clientHeight;                    //屏幕尺寸高度
        let outerHeight = document.documentElement.clientHeight - (document.documentElement.clientHeight - document.querySelector('.noScroll').clientHeight - 100);                    //可滚动容器超出当前窗口显示范围的高度
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;                    //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
        if (innerHeight - (outerHeight + scrollTop) < 200) {                        //加载更多操作
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
    margin-top: 89px;
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

    ul{
      margin: 0 auto;
      width: 92%;
      li{
        padding: 15px 0;
        box-shadow: 0 10px 30px #f4f7ff;
        margin-bottom: 15px;
        .left{
          display: inline-block;
          float: left;
          width: 77px;
          border-right: 1px solid;
          border-image: -webkit-linear-gradient(#fff, #000 , #fff)1 10 1;
          border-image: -moz-linear-gradient(#fff, #000 , #fff)1 10 1;
          border-image: linear-gradient(#fff, #000 , #fff)1 10 1;
          font-size: 14px;
          color: #105ba7;
          p{
            font-weight: bold;
          }
          .name{
            margin-bottom: 12px;
          }
        }
        .right{
          display: flex;
          justify-content: space-around;
          margin-left: 77px;
          font-size: 12px;
          p{
            font-weight: bold;
          }
          .price{
            .detail{
              color: #db1919;
            }
          }
        }
        .name{
          margin-bottom: 15px;
        }
      }
    }
  }
</style>
