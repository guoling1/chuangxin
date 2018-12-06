<template>
  <div class="main">

    <!--<div class="banner">
      &lt;!&ndash;<img src="../assets/banner.png" alt="" style="width: 100%;height: 100%">&ndash;&gt;

    </div>-->
    <div>
      <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
      <swiper :list="swiperList" :aspect-ratio="aspectRatio" :auto="!descMask" :loop="!descMask" :show-dots="showDots"
              :show-desc-mask="descMask"></swiper>
      <ul>
        <li v-for="(item,index) in list">
          <img :src="item.swiperList[0].url" alt="" style="width: 140px;height: 140px">
          <div class="">{{item.name}}</div>
          <!--<div class="subject" style="font-size: 14px;margin-top: 5px">{{item.packageName}}</div>-->
          <div class="subject">套餐：{{item.consumePrice}}<span>X{{item.circle}}期</span></div>
          <div class="price">担保金额：<span>￥{{item.deposit}}</span></div>
          <div class="button" @click="toDetail(item.id)">立即办理</div>
        </li>
      </ul>
      <div style="margin: 17px;" @click="loadMore()" v-if="more">点击加载更多</div>
    </div>
    <!--<login-mask v-if="isLogin" v-on:child-close="listenClose"></login-mask>-->
  </div>
</template>

<script>
  import {Swiper} from 'vux'
  import LoginMask from './loginMask'

  export default {
    name: 'Home',
    data() {
      return {
        aspectRatio: 1.146,
        list: [],
        // swiperList: [{img: require('../assets/banner.png')}],
        swiperList: [{img: 'http://www.wojinxin.com/res/images/prod/8e12dd25b11543a18fec7bc5930f6d6b.png'}],
        showDots: false,
        descMask: false,
        pageNo: 1,
        pageSize: 10,
        more: true,
        isLogin: false
      }
    },
    mounted() {
      // this.drawLine();  // 初始化
    },
    created() {
      var url = location.href

      function formatUrl(url) {
        var reg = /(?:[?&]+)([^&]+)=([^&#]+)/g; //三个分组，并且不匹配第一个分组
        var data = {};

        function fn(str, pro, value) {
          data[decodeURIComponent(pro)] = decodeURIComponent(value);
        }

        url.replace(reg, fn);
        return data;
      }

      var data = formatUrl(url);
      this.getData()
      if (data.key) {
        localStorage.setItem('key', data.key)
      } else {
        localStorage.removeItem('key')
      }
      if (data.bk == 1) {
        sessionStorage.setItem('bk', 1)
        this.$store.commit('BK')
      }
      if (data.ext) {
        localStorage.setItem('ext', data.ext)
        // this.$store.commit('BK')
      } else {
        localStorage.setItem('ext', 0)
        localStorage.setItem('key', '384af3af0dd948cfbeda2290146fa835')
      }
      if (data.cid) {
        localStorage.setItem('bankMsg', JSON.stringify(data))
      } else {
        let dataPrams = {
          source: 'sa0000595',
          outerSource: 'os0003354',
          outerid: 'ou0000686',
          cid: 'ci0000001',
          rec_no: 'ZHANGLEIBJ'
        }
        // localStorage.removeItem('bankMsg')
        localStorage.setItem('bankMsg', JSON.stringify(dataPrams))
      }
      this.getSwiper()
    },
    methods: {
      getSwiper() {
        this.$axios.post("/open/api/index/swiper/list")
          .then(res => {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].img = res.data[i].url
            }
            this.swiperList = res.data
          })
      },
      listenClose(val) {
        this.isLogin = val
      },
      toDetail(id) {
        this.$store.commit("PHONE", '请选择')
        localStorage.removeItem('selectPhone');
        if (this.GLOBAL.isKDApp) {
          window.aladdin.navigator.forward({url: 'http://www.wojinxin.com/#/homeDetail?id=' + id + '&reload=' + new Date().getTime()});
        } else {
          this.$router.push({path: "/homeDetail", query: {id: id, reload: new Date().getTime()}})
        }
      },
      getData() {
        this.$axios.post("/open/api/product/list", {
          sellFlag: 1,
          areaId: 2,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        })
          .then(res => {
            for (let i = 0; i < res.data.list.length; i++) {
              if (!res.data.list[i].swiperList || res.data.list[i].swiperList.length == 0) {
                res.data.list[i].swiperList = [{url: ''}]
              }
              if (!res.data.list[i].packageList) {
                res.data.list[i].packageList = [{price: '', circle: ''}]
              }
            }
            this.list = res.data.list;
            if (this.pageNo == res.data.totalPage) {
              this.more = false
            } else {
              this.pageNo += 1;
            }
          })
      },
      loadMore() {
        this.$axios.post("/open/api/product/list", {
          sellFlag: 1,
          areaId: 2,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        })
          .then(res => {
            for (let i = 0; i < res.data.list.length; i++) {
              if (!res.data.list[i].swiperList || res.data.list[i].swiperList.length == 0) {
                res.data.list[i].swiperList = [{url: ''}]
              }
              if (!res.data.list[i].packageList) {
                res.data.list[i].packageList = [{price: '', circle: ''}]
              }
            }
            this.list = this.list.concat(res.data.list)
            if (this.pageNo == res.data.totalPage) {
              this.more = false
            } else {
              this.pageNo += 1;
            }
          })
      },
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
              show:false
            }
          },
          //图例
          legend: {
            data:[
              'ECharts1 - 2k数据','ECharts1 - 2w数据'
            ],
            left:0,
            top:20,
            itemWidth:10,
            itemHeight:2
          },
          series: [{
            name:'ECharts1 - 2k数据',
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
            name:'ECharts1 - 2w数据',
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
    },
    components: {
      Swiper,
      LoginMask
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  .main {
    /*margin: 50px 0 0;*/
    padding-bottom: 50px;
    width: 100%;
    background: #f5f5f5;

    .banner {
      width: 100%;
      height: 430px;
    }

    ul {
      margin: 0 15px;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      li {
        margin-top: 15px;
        font-size: 14px;
        padding-bottom: 15px;
        width: 48.5%;
        /*height: 272px;*/
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 0 0 #f5f5f5;

        img {
          display: inline-block;
          width: 100%;
          margin: 10px auto 0;
        }

        .subject {
          margin-top: 10px;
          margin-bottom: 20px;
          font-size: 14px;
          /*height: 42px;*/
          /*line-height: 42px;*/

          span {
            font-size: 12px;
            padding: 0 5px;
            background: #fe8d23;
            border-radius: 12px;
            color: #fff;
            margin-left: 5px;
          }
        }

        .price {

          span {
            font-weight: bold;
            /*color: #cb5762;*/
          }

        }

        .button {
          margin: 14px auto 0;
          width: 106px;
          height: 23px;
          line-height: 23px;
          border: 1px solid #444c59;
          border-radius: 10px;
          font-size: 12px;
          color: #444c59;
        }

      }
    }
  }
</style>
