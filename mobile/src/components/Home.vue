<template>
  <div class="main">
    <div class="top">
      <div class="up">
        <img src="../assets/home-tit.png" alt="" class="top_title">
        <div class="date">2018年11月23日</div>
      </div>
      <div class="content">
        <div class="price">38123.<span>02元</span></div>
        <div class="bottom">
          <div>
            <p>当月累计收益(元)</p>
            <p>6265823</p>
          </div>
          <i></i>
          <div>
            <p>全年累计(元)</p>
            <p>6265823</p>
          </div>
        </div>
      </div>
    </div>
    <div class="pie">
      <img src="../assets/pie.png" alt="" class="chart-title">
      <div id="pieChart"></div>
    </div>
    <!--柱状图-->
    <div class="bar">
      <img src="../assets/bar.png" alt="" class="chart-title">
      <div id="barChart"></div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        aspectRatio: 1.146,
        list: [],
        // swiperList: [{img: require('../assets/banner.png')}],
      }
    },
    mounted() {
      this.drawBar();  // 初始化
      this.drawPie();  // 初始化
    },
    created() {

    },
    methods: {
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
            data: [20, 60, 60],

          }, {
            name: '去年',
            type: 'bar',
            barWidth: 8,
            z: 10,
            data: [45, 60, 13],
            itemStyle: {
              normal: {
                color: '#ffb19c',
              }
            },
          }]
        });
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
                {value:335, name:'物业'},
                {value:310, name:'租赁'},
                {value:234, name:'已售'},
              ]
            }
          ]
        });
      }
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
      margin: 0 auto;
      width: 90%;
      height: 264px;
      #pieChart{
        width: 100%;
        height: 190px;
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
  }
</style>
