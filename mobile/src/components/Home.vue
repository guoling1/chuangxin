<template>
  <div class="main">
    <div class="top">
      <div class="up">
        <img src="../assets/home-tit.png" alt="" class="top_title">
        <div class="date">2018年11月23日</div>
      </div>
      <div class="content">
        <div class="price">{{topData.dayPrice}}<span>元</span></div>
        <div class="bottom">
          <div>
            <p>当月累计收益(元)</p>
            <p>{{topData.monthPrice}}</p>
          </div>
          <i></i>
          <div>
            <p>全年累计(元)</p>
            <p>{{topData.yearPrice}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="pie">
      <img src="../assets/pie.png" alt="" class="chart-title">
      <div id="pieChart"></div>
      <div class="data">
        <div>
          <span class="orange"></span>&ensp;
          物业收益 {{pieData.feeDayPrice||0}}元
        </div>
        <div>
          <span class="green"></span>&ensp;
          租赁收益 {{pieData.leaseholdDayPrice||0}}元
        </div>
        <div>
          <span class="blue"></span>&ensp;
          已售收益 {{pieData.saleDayPrice||0}}元
        </div>
      </div>
    </div>
    <!--柱状图-->
    <div class="bar">
      <img src="../assets/bar.png" alt="" class="chart-title">
      <div id="barChart"></div>
    </div>
    <div class="pie pie1">
      <img src="../assets/pie1.png" alt="" class="chart-title">
      <div class="search">
        <input type="text" placeholder="输入小区名称" v-model="value5">
        <span class="searchBtn" @click="showPopupPicker=true">查询</span>
      </div>
      <div id="pieChart1"></div>
      <div class="data">
        <div>
          <span class="green"></span>&ensp;
          已租房源 {{pieData1.feeDayPrice||0}}元
        </div>
        <div>
          <span class="orange"></span>&ensp;
          已售房源 {{pieData1.leaseholdDayPrice||0}}元
        </div>
        <div>
          <span class="gray"></span>&ensp;
          空置房源 {{pieData1.saleDayPrice||0}}元
        </div>
      </div>
      <popup-picker :show.sync="showPopupPicker" :show-cell="false" title="TEST" :data="villageList" v-model="value5"></popup-picker>
    </div>
    <p class="tips">邯郸市创鑫华府房屋统计</p>

    <loading v-model="isLoad" text="加载中"></loading>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg" width="60%"></toast>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        showPopupPicker:false,
        demo01: null,
        list: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
        value5:['1'],
        topData:{
          dayPrice:0,
          monthPrice:0,
          yearPrice:0
        },
        pieData:{
          feeDayPrice:0,
          leaseholdDayPrice:0,
          saleDayPrice:0
        },
        pieData1:{
          feeDayPrice:'10',
          leaseholdDayPrice:'20',
          saleDayPrice:'30'
        },
        lastYear:[],
        thisYear: [],
        villageList: [], //小区
        isLoad: false,
        showPrompt:false,
        promptMsg:''
      }
    },
    mounted() {
      // this.drawBar();  // 初始化
      this.drawPie1();
    },
    created() {
      this.getData();
      this.getBarData();
      this.getHomes();
    },
    methods: {
      onChange (val) {
        console.log(arguments)
      },
      getData() {
        this.isLoad = true;
        this.$axios.post("/show/statistics/mainDetail")
          .then(res => {
            if(res.code=='200'){
              this.pieData.feeDayPrice = res.data[0].feeDayPrice;
              this.pieData.leaseholdDayPrice = res.data[0].leaseholdDayPrice;
              this.pieData.saleDayPrice = res.data[0].saleDayPrice;
              this.topData.dayPrice = res.data[0].dayPrice||0;
              this.topData.monthPrice = res.data[0].monthPrice||0;
              this.topData.yearPrice = res.data[0].yearPrice||0;
              this.drawPie();  // 初始化饼图
              this.isLoad = false;
            }
          })
          .catch(error => {
            this.isLoad = false;
          })
      },
      getBarData() {
        this.$axios.post("/show/statistics/mainContrast")
          .then(res => {
            if(res.code=='200'){
              let data = res.data;
              for(let i=0;i<data.length;i++){
                this.thisYear.push(data[i].feeMonthPrice+data[i].saleMonthPrice+data[i].leaseholdMonthPrice)
                this.lastYear.push(data[i].feeMonthPriceLast+data[i].saleMonthPriceLast+data[i].leaseholdMonthPriceLast)
              }
              this.drawBar()
            }
          })
          .catch(error => {
            this.showPrompt = true;
            this.promptMsg = error;
            this.isLoad = false;
          })
      },
      // 获取小区list
      getHomes(){
        this.$axios.post("/sys/village/all")
          .then(res => {
            let arr=[];
            for(let i=0;i<res.data.length;i++){
              arr.push({value: res.data[i].id, name: res.data[i].villageName})
            }
            this.villageList = [arr];
          })
          .catch(error => {

          })
      },
      drawPie() {
        // 基于准备好的dom，初始化echarts实例
        let pieChart = this.$echarts.init(document.getElementById('pieChart'))
        // 绘制图表
        pieChart.setOption({
          legend: {
            data:['物业','租赁','已售'],
            itemGap: 30,
            textStyle:{
              fontWeight:"bold",
              color:"#666"
            }
          },
          color: ["#ffa16d", "#83c7c9", "#8896f4"],
          series : [
            {
              name:'访问来源',
              type:'pie',
              radius : '70%',
              center: ['25%', '52%'],
              itemStyle : {
                normal : {
                  label : {
                    show : false
                  },
                  labelLine : {
                    show : false
                  }
                }
              },
              data:[
                {value:this.pieData.feeDayPrice, name:'物业'},
                {value:this.pieData.leaseholdDayPrice, name:'租赁'},
                {value:this.pieData.saleDayPrice, name:'已售'},
              ]
            }
          ]
        });
      },
      drawBar() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('barChart'))
        // 绘制图表
        myChart.setOption({
          grid:{
            left:10,
            top:25,
            right:10,
            bottom:20
          },
          xAxis: {
            data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            axisLine:{  //坐标轴线
              lineStyle: {
                color: "#c8cdd6"
              }
            },
            axisTick: {  //坐标轴刻度
              show: false
            },
            axisLabel: {color: "#000"}
          },
          yAxis: {
            axisLine:{  //坐标轴线
              lineStyle: {
                color: "#c8cdd6"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine:{
              lineStyle:{
                color:"#fafafa"
              }
            }
          },
          //图例
          legend: {
            data: [
              '今年', '去年'
            ],
            left: 10,
            top: 0,
            itemWidth: 8,
            itemHeight: 2,
            textStyle:{fontWeight:"bold"}
          },
          series: [{
            name: '今年',
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#a9e7a9',
                // label:{show:true}
              }
            },
            silent: true,
            barWidth: 8,
            // barGap: '100%', // Make series be overlap
            data: this.thisYear,

          }, {
            name: '去年',
            type: 'bar',
            barWidth: 8,
            z: 10,
            data: this.lastYear,
            itemStyle: {
              normal: {
                color: '#ffb19c',
              }
            },
          }]
        });
      },
      drawPie1() {
        // 基于准备好的dom，初始化echarts实例
        let pieChart1 = this.$echarts.init(document.getElementById('pieChart1'));
        // 绘制图表
        pieChart1.setOption({
          legend: {
            data:['已租','已售','空置'],
            itemGap: 30,
            textStyle:{
              fontWeight:"bold",
              color:"#666"
            }
          },
          color: ["#45c5ca", "#ffa16d", "#cbcbcb"],
          series : [
            {
              name:'访问来源',
              type:'pie',
              radius : '70%',
              center: ['25%', '52%'],
              itemStyle : {
                normal : {
                  label : {
                    show : false
                  },
                  labelLine : {
                    show : false
                  }
                }
              },
              data:[
                {value:this.pieData1.feeDayPrice, name:'已租'},
                {value:this.pieData1.leaseholdDayPrice, name:'已售'},
                {value:this.pieData1.saleDayPrice, name:'空置'},
              ]
            }
          ]
        });
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  .main {
    /*margin: 50px 0 0;*/
    padding-bottom: 50px;
    width: 100%;

    .top {
      height: 212px;
      background: #da5b65;
      .up{
        padding: 23px 19px 18px;
        text-align: left;
        font-size: 12px;
        font-weight: bold;
        color: #fff;

        .top_title {
          width: 100px;
          height: auto;
        }
      }
      .content{
        position: relative;
        height: 128px;
        background: url("../assets/bg.png") no-repeat bottom;
        background-size: 100% auto;
        .price{
          font-size: 27px;
          font-weight: bold;
          color: #fff;
          span{
            font-size: 19px;
          }
        }
        .bottom{
          position: absolute;
          bottom: 0;
          display: flex;
          justify-content: space-around;
          width: 100%;
          height: 50px;
          background: rgba(0,0,0,0.4);
          color: #fff;
          font-size: 14px;
          font-weight: bold;
          p:first-child{
            margin: 8px 0;
            font-size: 12px;
          }
          i{
            display: inline-block;
            height: 50px;
            width: 1px;
            background: linear-gradient(#bd374205,#e69fa5db, #ffffffbf, #e69fa5db,#bd374205);
          }
        }
      }
    }
    .chart-title{
      margin-top: 24px;
      height: 24px;
      width: auto;
    }
    /*饼图*/
    .pie{
      position: relative;
      margin: 0 auto;
      width: 90%;
      height: 264px;
      #pieChart,#pieChart1{
        width: 100%;
        height: 190px;
      }

      .data{
        position: absolute;
        top: 40%;
        left: 50%;
        font-size: 14px;
        font-weight: bold;
        div{
          margin-bottom: 24px;
        }
        span{
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50px;
          background: #ddd;

          &.orange{
            background: #ffa16d;
          }
          &.green{
            background: #83c7c9;
          }
          &.blue{
            background: #8896f4;
          }
          &.gray{
            background: #cbcbcb;
          }
        }
      }
    }
    /*柱状图*/
    .bar{
      margin: 0 auto;
      width: 90%;
      height: 224px;
      border-radius: 8px;
      box-shadow: 0 4px 10px #4ea9de4d;
      #barChart{
        width: 100%;
        height: 150px;
      }
    }
    .pie1{
      height: 290px;
      .data{
        top: 54%;
      }
    }
    .search{
      margin: 12px 0 16px;
      height: 28px;
      line-height: 28px;
      text-align: left;
      font-size: 12px;
      input{
        padding: 0 6px;
        width: 83%;
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
    .tips{
      padding: 20px 0;
      font-size: 14px;
      font-weight: bold;
      color: #000;
    }
  }
</style>
