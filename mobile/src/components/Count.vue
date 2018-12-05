<template>
  <div class="main">
    <img src="../assets/empty.png" alt="" style="width: 35%;margin-top: 20%" v-if="orderList.length==0">
    <ul class="list">
      <li v-for="(item,index) in this.orderList">
        <div class="top">
          <div class="time">{{item.createTime | formatDate}}</div>
          <div class="price">￥{{item.productPrice}}</div>
        </div>
        <div class="content">
          <div class="left">
            <img :src="item.swiperList[0].url" alt="">
          </div>
          <div class="right">
            <p class="color">机身颜色：{{item.productColor}}</p>
            <p class="memory">内存：{{item.productMemory}}</p>
            <p class="address">归属地：{{item.region}}</p>
            <p class="bank">开户行：{{item.bank}}</p>
            <p class="package">合约套餐：{{item.packageName}}</p>
          </div>
        </div>
        <div class="bottom">
          <div class="state">订单状态：{{item.payStatus}}</div>
          <div class="button" @click="toDetail(item.id)">查看详情</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Count',
  data () {
    return {
      orderList:[]
    }
  },
  created(){
    this.getData()
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
