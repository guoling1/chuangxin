// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import qs from "qs"
import store from "./store"

// // 引入echarts
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts

import { Toast,XDialog,Datetime,Tab, TabItem,Loading,LoadingPlugin,XTable} from 'vux'
Vue.component('toast',Toast);
Vue.component('xDialog',XDialog);
Vue.component('datetime',Datetime);
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('loading', Loading )
Vue.component('loadingPlugin', LoadingPlugin)
Vue.component('x-table', XTable)

Vue.config.productionTip = false;

import axios from 'axios'
axios.defaults.baseURL = "http://www.wojinxin.com/wofinance";
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios= axios;

// 全局过滤器
Vue.filter('formatDate', function (value) {
  let time = new Date(value);
  let y = time.getFullYear();//年
  let m = time.getMonth() + 1;//月
  let d = time.getDate();//日
  let h = time.getHours();//时
  let mm = time.getMinutes();//分
  let s = time.getSeconds();//秒
  return y+"-"+m+"-"+d+" "+h+":"+mm+":"+s
})

// 监听路由变化
router.beforeEach((to, from, next) => {
  next()
});

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      config.headers.token = localStorage.getItem('token');
      config.headers.sessionid = localStorage.getItem('sessionid');
      config.headers.tester = 1;
    }
    if((/\/open\/api\/order\/save/).test(config.url)){
      // config.data=qs.stringify(config.data)
      return config;
    }else {
      config.data=qs.stringify(config.data)
      return config;
    }
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    let {status,data} = response;
    if(status == 200) {
      // response.data = data.retObject||data;
      response.data = data.retObject;
      if(data.retCode=='1006'){
        router.replace({
          path: '/regist',
          query: {redirect: router.currentRoute.fullPath}
        })
      }
    }
    response.retMsg = data.retMsg;
    response.retCode = data.retCode;
    return response;
  },
  error => {
    return Promise.reject('系统异常')   // 返回接口返回的错误信息
  });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
