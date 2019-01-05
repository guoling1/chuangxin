<template>
  <div class="main">
    <div class="noScroll">
      <div class="top">
        <img src="../assets/homes-title.png" alt="" class="top_title">
        <div class="date">{{date}} 星期{{week}}</div>
      </div>
      <div class="search">
        <div class="searchInp">
          <span @click.stop="showPopupPicker=true">{{village}}</span>
          <img src="../assets/close1.png" alt="" @click.stop="closePicker" class="close fr">
        </div>
        <input type="text" placeholder="输入单元" v-model="position">
        <span class="searchBtn" @click="search">查询</span>
      </div>
      <div class="classify">
        房源状态：
        <p><span class="green"></span>已租</p>
        <p><span class="orange"></span>已售</p>
        <p><span class="gray"></span>空置</p>
      </div>
    </div>
    <ul class="scrollCon" ref="conStyle">
      <li @click="toDetail(item.id)" :class="item.color" v-for="item in dataList">
        <img src="../assets/tips.png" alt="" class="tips">
        <p class="name">{{item.communityName}}</p>
        <p class="house">{{item.position}}-{{item.merchantHouseNumber}}</p>
        <p class="area">建筑面积：{{item.area}}m²</p>
        <!--<p class="area">实测面积：110m²</p>-->
      </li>
    </ul>
    <popup-picker :show.sync="showPopupPicker" :show-cell="false" title="TEST" :data="villageList" @on-change="pickerChange"></popup-picker>
    <loading v-model="isLoad" text="加载中"></loading>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg" width="60%"></toast>
  </div>
</template>

<script>
  export default {
    name: 'Homes',
    data() {
      return {
        date: '',
        week: '',
        dataList:[],
        villageList: [], //小区
        village: '点击选择小区',
        villageId: '',
        position:'',
        page: 1,
        rows: 40,
        showPopupPicker:false,
        isLoad: false,
        showPrompt: false,
        promptMsg: ''
      }
    },
    created() {
      this.getDate();
      this.getData();
      this.getHomes();
      window.addEventListener('scroll', this.onScroll);
    },
    methods: {
      pickerChange(val){
        this.village = val.join().split(',')[1];
        this.villageId = val.join().split(',')[0];
      },
      closePicker(){
        this.village = '点击选择小区';
        this.villageId = '';
      },
      // 获取小区list
      getHomes(){
        this.$axios.post("/sys/village/all")
          .then(res => {
            let arr=[];
            for(let i=0;i<res.data.length;i++){
              arr.push({value: [res.data[i].id,res.data[i].villageName], name: res.data[i].villageName})
            }
            this.villageList = [arr];
          })
          .catch(error => {

          })
      },
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
        if (this.page == 1) {
          this.dataList = [];
        }
        let params = {
          villageId: this.villageId,
          position:this.position,
          operatingState: '',
          page: this.page,
          rows: this.rows
        }
        this.$axios.post("/show/houseTp",params)
          .then(res => {
            if(res.code=='200'){
              this.count = res.data.total;
              for (let i = 0; i < res.data.rows.length; i++) {
                if(res.data.rows[i].operatingState=='空置'){
                  res.data.rows[i].color = 'gray'
                }else if(res.data.rows[i].operatingState=='已售'){
                  res.data.rows[i].color = 'orange'
                }else if(res.data.rows[i].operatingState=='已租'){
                  res.data.rows[i].color = 'green'
                }
              }
              this.dataList = this.dataList.concat(res.data.rows);
              this.isLoad = false;
            }

          })
          .catch(error => {
            this.showPrompt = true;
            this.promptMsg = error;
            this.isLoad = false;
          })
      },
      search(){
        this.page=1;
        this.getData()
      },
      toDetail(id){
        this.$router.push('/homesDetail?id='+id)
      },
      onScroll() {
        //可滚动容器的高度
        let innerHeight = document.querySelector('.scrollCon').clientHeight;                    //屏幕尺寸高度
        let outerHeight = document.documentElement.clientHeight - (document.documentElement.clientHeight - document.querySelector('.noScroll').clientHeight - 100);                    //可滚动容器超出当前窗口显示范围的高度
        let scrollTop = document.documentElement.scrollTop;                    //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
        if (innerHeight - (outerHeight + scrollTop) < 70) {                        //加载更多操作
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
  .main{
    overflow-x: hidden;
  }
  .noScroll {
    position: fixed;
    width: 100%;
    background: #fff;
    z-index: 1;
    box-shadow: 0 10px 30px #f4f7ff;
  }
  .scrollCon{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 180px auto 0;
    width: 92%;
    li{
      position: relative;
      margin-bottom: 2px;
      background: #cbcbcb;
      width: 33%;
      color: #fff;

      .tips{
        position: absolute;
        right: 0;
        width: 10px;
        height: 10px;
      }
      p{
        line-height: 16px;
        font-size: 12px;
        font-weight: bold;
        &:nth-child(2){
          padding-top: 4px;
        }
      }
      &.green{
        background: #83c7c9;
      }
      &.orange{
        background: #ffa16d;
      }
      &.gray{
        background: #cbcbcb;
      }
    }
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

    .search{
      margin: 0 auto;
      width: 92%;
      height: 28px;
      line-height: 28px;
      text-align: left;
      font-size: 12px;
      input,.searchInp{
        display: inline-block;
        padding: 0 6px;
        width: 41%;
        height: 100%;
        border: 1px solid #ccced6;
        border-radius: 3px;
      }
      .searchInp span{
        width: 80%;
        display: inline-block;
      }
      .close{
        margin-top: 5px;
        height: 16px;
        width: auto;
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
    .classify{
      margin: 16px auto;
      width: 92%;
      text-align: left;
      font-size: 12px;
      font-weight: bold;
      p{
        margin-right: 30px;
        display: inline-block;
        font-weight: bold;
        span{
          margin-right: 6px;
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 3px;
          vertical-align: top;
          &.green{
            background: #83c7c9;
          }
          &.orange{
            background: #ffa16d;
          }
          &.gray{
            background: #cbcbcb;
          }
        }
      }
    }
  }
</style>
