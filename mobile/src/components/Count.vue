<template>
  <div class="main">
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
  </div>
</template>

<script>
export default {
  name: 'Count',
  data () {
    return {
      date: '2018年11月23日 星期五',
      startTime: '选择开始时间',
      endTime: '选择截止时间',
      confirmColor:'#105ba7',
      orderList:[]
    }
  },
  created(){
    // this.getData()
  },
  methods: {
    //获取订单列表
    getData(){
      this.$axios.post("/open/api/order/list",{mobile:JSON.parse(localStorage.getItem("userMessage")).mobile})
        .then(res=>{
          for(let i=0;i<res.data.list.length;i++){
            if(!res.data.list[i].swiperList||res.data.list[i].swiperList.length==0){
              res.data.list[i].swiperList=[{url:''}]
            }
          }
          this.orderList = res.data.list;
        })
        .catch(error => {

        })
    },
    change (value) {
      console.log('change', value)
    },
    log (str1, str2 = '') {
      console.log(str1, str2)
    },
    onConfirm (val) {
      console.log('on-confirm arg', val)
      console.log('current value', this.value1)
    },
    toDetail(id){
      this.$router.push({path:'/orderDetail',query:{id:id,type:2}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less" type="text/less">

.main{
  /*margin: 50px 0;*/
  width: 100%;
  padding-bottom: 50px;

  .top{
    padding: 23px 19px 18px;
    text-align: left;
    font-size: 12px;
    font-weight: bold;
    .top_title{
      width: 100px;
      height: auto;
    }
  }
  .select_time{
    margin: 0 auto;
    width: 80%;
    height: 31px;
    background: #f9f9f9;
    border: 1px solid #e4e4e4;
    border-radius: 16px;
    font-size: 14px;
    img{
      float: right;
      margin: 5px 15px 0 0;
      width: 18px;
      height: auto;
    }
  }
  .select_status{
    display: flex;
    justify-content: space-around;
    margin: 15px auto 8px;
    width: 70%;
    font-size: 14px;
    color: #000;
    p{
      display: inline-block;
      margin-right: 7px;
      width: 14px;
      height: 14px;
      border: 1px solid #105ba7;
      border-radius: 2px;
      vertical-align: baseline;
      i{
        display: inline-block;
        margin-bottom: 2px;
        width: 8px;
        height: 8px;
        background: #105ba7;
        border-radius: 2px;
      }
    }
  }

  .list{

    li{
      padding: 0 10px;
      border-top: 10px solid #f4f4f4;
      width: 100%;
      .top{
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid #d7d7d7;

        .time{
          float: left;
          font-size: 11px;
        }
        .price{
          float: right;
          font-size: 14px;
          color: #fd255a;
        }
      }
      .content{
        padding:15px 0 0;
        font-size: 14px;
        border-bottom: 1px solid #d7d7d7;
        text-align: left;
        display: flex;
        .left{
          display:inline-block;
          margin-right: 10px;
          /*float: left;*/

          img{
            width: 114px;
            height: 114px;
            border: 1px solid #d7d7d7;
            border-radius: 3px;
          }
        }
        .right{
          display:inline-block;
          p{
            margin-bottom: 11px;
            /*margin-left: 130px;*/
          }
        }

      }
      .bottom{
        text-align:left;
        font-size: 13px;
        color: #666666;
        height:44px;
        line-height:44px;

        .state{
          display: inline-block;
          text-align: left;
        }
        .button{
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
  .prompt{
    margin-top: 20%;
    font-size: 14px;
    p{
      line-height: 20px;
      margin-top: 15px;
      a{
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
          img{
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
  .dp-header .dp-item.dp-right{
    color: #105ba7 !important;
  }
</style>
