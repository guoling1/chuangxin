<template>
  <div class="main">
    <div class="top">
      <img src="../assets/backlog-tit.png" alt="" class="top_title">
      <div class="date">{{date}}</div>
    </div>
    <textarea v-model="saleExamineRemarkE"></textarea>
    <div class="btn" @click="agree">提交</div>

    <loading v-model="isLoad" text="加载中"></loading>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg" width="60%"></toast>
    <confirm v-model="agreeShow"
             title="确认"
             @on-confirm="onConfirm">
      <p style="text-align:center;">拒绝退款吗？</p>
    </confirm>
  </div>
</template>

<script>
  export default {
    name: 'Count',
    data() {
      return {
        date:'',
        week:'',
        isLoad: false,
        agreeShow: false,
        showPrompt: false,
        promptMsg: '',
        saleExamineRemarkE:''
      }
    },
    created() {
      // this.getData()
    },
    methods: {
      getDate() {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1 > 10 ? new Date().getMonth() + 1 : '0' + new Date().getMonth() + 1;
        let date = new Date().getDate() > 10 ? new Date().getDate() : '0' + new Date().getDate();
        this.date = year + '-' + month + '-' + date;
        let week = ['日', '一', '二', '三', '四', '五', '六'];
        this.week = week[new Date().getDay()]
      },
      agree(){
        this.agreeShow = true;
      },
      onConfirm(){
        this.isLoad = true;
        let params = {
          eId: this.$route.query.eId,
          peId: this.$route.query.peId,
          examineType: this.$route.query.examineType,
          examineFlag: 3,
          saleExamineRemarkE: this.saleExamineRemarkE
        }
        this.$axios.post("/sys/examine",params)
          .then(res=>{
            if(res.code=='200'){
              this.isLoad = false;
              this.showPrompt = true;
              this.promptMsg = res.msg;
              let _this = this;
              setTimeout(function () {
                _this.$router.go(-2)
              },1000)
            }else {
              this.showPrompt = true;
              this.promptMsg = res.msg
            }
          })
          .catch(err=>{
            this.isLoad = false
            this.showPrompt = true;
            this.promptMsg = err;
            let _this = this;
            setTimeout(function () {
              _this.$router.go(-2)
            },1000)
          })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less" type="text/less">
  .main {
    /*margin: 50px 0;*/
    width: 100%;
    padding-bottom: 50px;

    .top {
      padding: 23px 19px 42px;
      text-align: left;
      font-size: 12px;
      font-weight: bold;

      .top_title {
        width: 100px;
        height: auto;
      }
    }
    textarea{
      width: 80%;
      height: 280px;
      border-radius: 8px;
      border: 1px solid #cbcbcb;
    }
    .btn{
      margin: 60px auto 0;
      width: 85%;
      line-height: 44px;
      background: #105ba7;
      color: #fff;
      border-radius: 8px;
    }
  }
</style>
<style>
  .weui-dialog__btn{
    line-height: 48px !important;
  }
</style>
