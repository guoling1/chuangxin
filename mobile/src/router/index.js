import Vue from 'vue'
import Router from 'vue-router'
import MainMenu from '@/components/MainMenu'
import Home from '@/components/Home'
import Count from '@/components/Count'
import Backlog from '@/components/Backlog'
import BacklogDetail from '@/components/BacklogDetail'
import BacklogSubmit from '@/components/BacklogSubmit'
import Login from '@/components/Login'
import BacklogHistory from "../components/BacklogHistory";
import BacklogHistoryDt from "../components/BacklogHistoryDt";
import Homes from "../components/Homes";
import HomesDetail from "../components/HomesDetail";
import CountDetail from "../components/CountDetail";
import ChangePwd from "../components/ChangePwd";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home',
      component: MainMenu,
      meta:{
        keepAlive: true
      },
      children:[
      	{
      		path:'/home',
      		name:'home',
          meta:{
            title:"创鑫地产",
            keepAlive: false
          },
      		component:Home
      	},
        {
          path:'/homes',
          name:'homes',
          meta:{
            title:"房源统计",
            keepAlive: true

          },
          component:Homes
        },
        {
          path:'/count',
          name:'count',
          meta:{
            title:"数据明细",
            keepAlive: true
          },
          component:Count
        },
        {
          path:'/backlog',
          name:'backlog',
          meta:{
            title:"待办事项",
            keepAlive: false
          },
          component:Backlog
        }
      ]
    },
    {
      path:'/countDetail',
      name:'countDetail',
      meta:{
        title:"数据明细",
        keepAlive: false
      },
      component:CountDetail
    },
    {
      path:'/backlogDetail',
      name:'backlogDetail',
      meta:{
        title:"数据详情",
        keepAlive: false
      },
      component:BacklogDetail
    },
    {
      path:'/backlogSubmit',
      name:'backlogSubmit',
      meta:{
        title:"待办事项",
        keepAlive: false
      },
      component:BacklogSubmit
    },
    {
      path:'/backlogHistory',
      name:'backlogHistory',
      meta:{
        title:"历史消息",
        keepAlive: false
      },
      component:BacklogHistory
    },
    {
      path:'/backlogHistoryDt',
      name:'backlogHistoryDt',
      meta:{
        title:"历史消息",
        keepAlive: false
      },
      component:BacklogHistoryDt
    },
    {
      path:'/login',
      name:'login',
      meta:{
        title:"登录",
        keepAlive: false
      },
      component: Login
    },
    {
      path:'/changePwd',
      name:'changePwd',
      meta:{
        title:"修改密码",
        keepAlive: false
      },
      component: ChangePwd
    },
    {
      path:'/homesDetail',
      name:'homesDetail',
      meta:{
        title:"房源明细",
        keepAlive: false
      },
      component:HomesDetail
    },
  ]
})
