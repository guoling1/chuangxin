<template>
  <div class="main">
    <div class="shopMessage">
      <div class="subject">商品信息</div>
      <ul>
        <li>
          <span class="attr">所在区域：</span>
          <span class="value">{{productMsg.addressName}}</span>
        </li>
        <li>
          <span class="attr">所选商品：</span>
          <span class="value">{{productMsg.productName}}</span>
        </li>
        <li>
          <span class="attr">所选规格：</span>
          <span class="value">{{productMsg.memory}}{{productMsg.color}}</span>
        </li>
        <li>
          <span class="attr">所选套餐：</span>
          <span class="value">{{productMsg.setMealName}}</span>
        </li>
        <li>
          <span class="attr">所选号码：</span>
          <span class="value">{{formData.productMobile}}</span>
        </li>
        <li>
          <span class="attr">冻结金额：</span>
          <span class="value">{{productMsg.deposit}}</span>
        </li>
        <li>
          <span class="attr">托管周期：</span>
          <span class="value">{{productMsg.circle}}个月</span>
        </li>
      </ul>
    </div>
    <div class="userMessage">
      <ul>
        <li>
          <span>开户银行</span>
          <input type="text" v-model="formData.bank" disabled style="background: #fff">
        </li>
        <li>
          <span>客户姓名</span>
          <input type="text" placeholder="这里输入客户姓名" v-model="formData.customerName" @blur="changePY()">
        </li>
        <li>
          <span>姓拼音</span>
          <input type="text" placeholder="姓拼音" v-model="formData.xingPinyin" style="background: #fff">
        </li>
        <li>
          <span>名拼音</span>
          <input type="text" placeholder="名拼音" v-model="formData.mingPinyin" style="background: #fff">
        </li>
        <li>
          <span>性别</span>
          <input type="radio" value="男" name="sex" v-model="formData.sex">男
          <input type="radio" value="女" name="sex" v-model="formData.sex" style="margin-left: 25px">女
        </li>
        <li>
          <span>手机号</span>
          <input type="text" placeholder="这里输入手机号" v-model="formData.mobile" style="background: #fff" disabled>
        </li>
        <li>
          <span>证件类型</span>
          <input type="text" placeholder="身份证" v-model="formData.idcardType" style="background: #fff" disabled>
        </li>
        <li>
          <span>证件号码</span>
          <input type="text" placeholder="这里输入证件号码" v-model="formData.idcard">
        </li>
        <li class="cardPhoto">
          <span>身份证正面</span>
          <img id="cardFaceImg" src="../assets/idcardface.png" alt="" @click="uploadClick('cardFace')">
          <input accept="image/*" type="file" @change="getFile($event,'cardFace','cardFaceImg','picFile')" id="cardFace" style="display: none">
        </li>
        <li class="cardPhoto">
          <span>身份证背面</span>
          <img id="cardBackImg" src="../assets/idcardback.png" alt="" @click="uploadClick('cardBack')">
          <input accept="image/*" type="file" @change="getFile($event,'cardBack','cardBackImg','picFile2')" id="cardBack" style="display: none">
        </li>
        <li class="cardPhoto">
          <span>手持身份证</span>
          <img id="cardHandImg" src="../assets/idcardhand.png" alt="" @click="uploadClick('cardHand')">
          <input accept="image/*" type="file" @change="getFile($event,'cardHand','cardHandImg','picFile3')" id="cardHand" style="display: none">
        </li>
        <!--<li>
          <span>收货地址</span>
          <input type="text" placeholder="选择省市区">
        </li>-->
        <li>
          <span>详细地址</span>
          <input type="text" placeholder="这里输入详细地址" v-model="formData.address">
        </li>
        <li>
          <span>邮箱</span>
          <input type="email" placeholder="这里输入邮箱" v-model="formData.email">
        </li>
        <li>
          <span>备注</span>
          <input type="text" placeholder="这里输入备注" v-model="remarks">
        </li>
      </ul>
    </div>
    <p class="tips">温馨提示：请当月激活号卡，套餐次月生效，建议尽量使用wifi避免产生额外费用。</p>
    <div class="button" @click="submit()">提交订单</div>
    <toast v-model="showPrompt" position="middle" type="text" :text="promptMsg"></toast>
  </div>
</template>

<script>
  import PINYIN from './pinyin'
  import {PopupRadio} from 'vux'

  export default {
    name: 'ShopInfo',
    data() {
      return {
        productMsg: {},
        formData: {
          productName: '',//产品名称
          productPrice: '',//产品价格
          productMobile: '',//产品手机号
          circle: '',//套餐周期
          deposit: '',//托管金额
          areaId: '',//区域id
          bank: '',//银行
          endDay: '',//截止日期
          region: '',//所属区域
          customerName: '',//客户名称
          xingPinyin: '',//姓拼音
          mingPinyin: '',//名拼音
          country: '',//国家
          agreetmentNo: '',//合同号
          mobile: '',//客户手机号
          price: '',//价格
          busiType: '',//业务类型
          idcardType: '',//证件类型
          idcard: '',//身份证号
          address: '', //详细地址
          productMemory: '',//内存
          productColor: '',//颜色
          setMeal: "",//所选号码
          sex: '男',
          email: '',

        },
        sex: '男',
        remarks: '',//备注
        showPrompt: false,
        promptMsg: '',
        picFile: '',
        picFile2: '',
        picFile3: ''
      }
    },
    created() {
      if (this.GLOBAL.isKDApp) {
        aladdin.header.config({
          //导航头部背景颜色
          backgroundColor: '#ffffff',
          //是否显示导航头部底部线条
          underlineVisible: false,
          //是否显示左区域按钮
          leftVisible: true,
          //是否显示右区域按钮
          rightVisible: true,
          //导航头部中间区域，
          middle: [{
            //类型（text、image、search等）
            type: 'text',
            //标题 页面title，自定义
            title: '中国联通',
            //文字颜色
            textColor: '#f37937',
            //文字大小
            fontSize: 18,
            //背景颜色
            backgroundColor: '#ffffff',
            //回调事件
            click: function () {
              //do something
            }
          }],
          //左区域
          left: [{
            //图标
            //icon: '/navBar/images/navBar/scan@2x.png',
            //图标颜色
            //tintColor: '#999999',
            //背景颜色
            //backgroundColor: '#ffffff',
            //是否显示小红点
            //badge: false,
            //回调事件
            click: function () {
              window.aladdin.navigator.back();
            }
          }],
          //右区域
          right: [{
            //图标
            //icon: '/navBar/images/navBar/customer@2x.png',
            //回调事件
            //click: function () {
            //do something
            //}
          }]
        }, function (err, param) {
          //设置导航栏回调
        });
      }
      this.productMsg = this.$route.query;
      this.formData = {
        productName: this.$route.query.productName,//产品名称
        productPrice: this.$route.query.price,//产品价格
        productMobile: this.$route.query.phone,//产品手机号
        circle: this.$route.query.circle,//套餐周期
        deposit: this.$route.query.deposit,//托管金额
        areaId: this.$route.query.addressId,//区域id
        bank: '平安',//银行
        endDay: '2019-01-01',//截止日期
        region: this.$route.query.addressName,//所属区域
        customerName: '',//客户名称
        xingPinyin: '',//姓拼音
        mingPinyin: '',//名拼音
        country: '中国',//国家
        agreetmentNo: '111111',//合同号
        mobile: JSON.parse(localStorage.getItem("userMessage")).mobile,//客户手机号
        price: this.$route.query.setMealPrice,//价格
        busiType: this.$route.query.busiType,//业务类型
        idcardType: '身份证',//证件类型
        idcard: '',//身份证号
        address: '',
        productColor: this.$route.query.color,
        productMemory: this.$route.query.memory,
        packageName: this.$route.query.setMealName,
        sex: '男',
        email: '',
        picFile: '',
        picFile2: '',
        picFile3: ''
      }
    },
    methods: {
      changePY() {
        var pyList = this.CC2PY(this.formData.customerName)
        this.formData.xingPinyin = pyList[0].substring(0, 1).toUpperCase() + pyList[0].substring(1);
        this.formData.mingPinyin = pyList.slice(1).join('').substring(0, 1).toUpperCase() + pyList.slice(1).join('').substring(1);
      },
      uploadClick(id) {
        document.getElementById(id).click()
      },
      getFile(event, type, type64, name) {
        let files = event.target.files || event.dataTransfer.files;
        document.getElementById(type64).src = URL.createObjectURL(files[0])
        for (var i in this.formData) {
          if (i == name) {
            this.formData[i] = files[0]
          }
        }
      },
      submit() {
        this.formData.idcard = this.formData.idcard.toUpperCase()
        let params = new FormData;
        let flag = true;
        for (var i in this.formData) {
          params.append(i, this.formData[i])
        }
        for (var i in this.formData) {
          if (this.formData[i] === "") {
            flag = false
            break;
          }
        }
        params.append("remarks", this.remarks)
        params.append("productId", this.$route.query.id)
        if (localStorage.getItem('key')) {
          params.append("qrcodeKey", localStorage.getItem('key'))
          params.append("key", localStorage.getItem('key'))
        }
        if (localStorage.getItem('ext')) {
          params.append("ext", localStorage.getItem('ext'))
        }
        if (localStorage.getItem('bankMsg')) {
          params.append('cid', JSON.parse(localStorage.getItem('bankMsg')).cid);
          params.append('outerSource', JSON.parse(localStorage.getItem('bankMsg')).outerSource);
          params.append('outerid', JSON.parse(localStorage.getItem('bankMsg')).outerid);
          params.append('rec_no', JSON.parse(localStorage.getItem('bankMsg')).rec_no);
          params.append('source', JSON.parse(localStorage.getItem('bankMsg')).source)
        }
        if (flag) {
          this.$axios.post("/open/api/order/save", params, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          )
            .then(res => {
              if (res.retCode == "0000") {
                localStorage.setItem("productMessage", JSON.stringify(this.formData))
                if (this.GLOBAL.isKDApp) {
                  window.aladdin.navigator.forward({url: 'http://www.wojinxin.com/#/orderSubmit?id=' + res.data.id});
                } else {
                  this.$router.push("/orderSubmit?id=" + res.data.id)
                }
              } else {
                this.showPrompt = true;
                this.promptMsg = res.retMsg
              }
            })
            .catch(err => {
              this.errMsg = err
              this.warnText = true
            })
        } else {
          console.log(this.formData)
          this.showPrompt = true;
          this.promptMsg = '请补全信息'
        }

      },
      CC2PY(l1) {

        var l2 = l1.length;

        var I1 = [];

        var reg = new RegExp('[a-zA-Z0-9\- ]');

        for (var i = 0; i < l2; i++) {

          var val = l1.substr(i, 1);

          var name = this.arraySearch(val, PINYIN.pinyin);

          if (reg.test(val)) {

            I1.push(val);

          } else if (name !== false) {

            I1.push(name);

          }

        }

        // I1 = I1.replace(/ /g, '-');
        //
        // while (I1.indexOf('--') > 0) {
        //
        //     I1 = I1.replace('--', '-');
        //
        // }

        return I1;

      },
      arraySearch(l1, l2) {

        for (var name in PINYIN.pinyin) {

          if (PINYIN.pinyin[name].indexOf(l1) != -1) {

            return this.ucfirst(name);

            break;

          }

        }

        return false;

      },
      ucfirst(l1) {

        if (l1.length > 0) {

          var first = l1.substr(0, 1);

          var spare = l1.substr(1, l1.length);

          return first + spare;

        }

      }
    },
    components: {
      PopupRadio
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  .weui-cell {
    padding: 0;
  }

  .vux-cell-bd.vux-cell-primary, .vux-cell-bd.vux-cell-primary p {
    display: contents !important;
    background: red;
    flex: none !important;
    width: 53px;
  }

  .main {
    margin: 50px 0 0;
    width: 100%;
    .shopMessage {
      padding: 0 15px;
      text-align: left;
      border-top: 10px solid #eaeaea;
      .subject {
        height: 52px;
        line-height: 52px;
      }
      ul {
        margin-bottom: 15px;
        li {
          height: 34px;
          line-height: 34px;
          margin-top: -1px;
          border: 1px solid #e7e7e7;
          .attr {
            text-align: center;
            display: inline-block;
            margin-right: 10px;
            height: 100%;
            width: 72px;
            font-size: 12px;
            color: #fff;
            background: #444c59;
          }
          .value {
            font-size: 14px;
          }
        }
      }
    }
    .userMessage {
      padding: 0 15px;
      text-align: left;
      border-top: 10px solid #eaeaea;
      ul {
        padding-top: 18px;
        li {
          font-size: 14px;
          height: 37px;
          line-height: 37px;
          border-bottom: 1px solid #e5e5e5;
          span {
            display: inline-block;
            /*width: 106px;*/
            width: 25%;
          }
        }
        li.cardPhoto {
          height: inherit;
          img {
            width: 55%;
            vertical-align: text-top;
            margin-bottom: 10px;
          }
        }
      }
    }
    .tips {
      padding: 0 15px;
      font-size: 12px;
      text-align: left;
      margin-top: 10px;
      line-height: 16px;
      color: #ff0000;
    }
    .button {
      margin-top: 15px;
      height: 48px;
      line-height: 48px;
      color: #fff;
      font-weight: bold;
      background: #fe8d23;
    }
  }
</style>
