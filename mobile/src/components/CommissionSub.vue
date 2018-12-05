<template>
  <div class="main">
    <div class="top">
      <span>账户余额</span>
      <span class="price">￥1800</span>
    </div>
    <button>确认提现</button>
    <!--<toast v-model="warnText" type="warn" :text=errMsg></toast>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg"></toast>-->
  </div>
</template>

<script>
export default {
  name: 'commissonSub',
  data () {
    return {

    }
  },
  created(){
  },
  methods:{

  },
  components: {

  },
  watch:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">

.main{
  margin: 50px 0;
  width: 100%;
  padding: 0 15px;
  .top{
    margin-top: 22px;
    text-align: left;
    font-size: 14px;
    .price{
      float: right;
      color: #fe8d23;
      font-size: 18px;
    }
  }
  button{
    margin-top: 120px;
    width: 100%;
    height: 48px;
    line-height: 48px;
    background: #fe8d23;
    color: #fff;
    font-size: 16px;
    border-radius: 4px;
  }
}
</style>
