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
      // this.drawLine();  // 初始化
    },
    created() {

    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: '收益同比对比',
            left: 'center',
            textStyle: {
              color: 'red'
            }
          },
          // tooltip: {},
          xAxis: {
            data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            axisTick: {
              show: false
            }
          },
          yAxis: {
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            }
          },
          //图例
          legend: {
            data: [
              'ECharts1 - 2k数据', 'ECharts1 - 2w数据'
            ],
            left: 0,
            top: 20,
            itemWidth: 10,
            itemHeight: 2
          },
          series: [{
            name: 'ECharts1 - 2k数据',
            type: 'bar',
            itemStyle: {
              normal: {
                color: 'yellow',
                // label:{show:true}
              }
            },
            silent: true,
            barWidth: 7,
            // barGap: '100%', // Make series be overlap
            data: [20, 60, 60],

          }, {
            name: 'ECharts1 - 2w数据',
            type: 'bar',
            barWidth: 7,
            z: 10,
            data: [45, 60, 13],
            itemStyle: {
              normal: {
                color: 'red',
                // label:{show:true}
              }
            },
          }]
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
</style>
