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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home',
      component: MainMenu,
      children:[
      	{
      		path:'/home',
      		name:'home',
          meta:{
            title:"创鑫地产"
          },
      		component:Home
      	},
        {
          path:'/count',
          name:'count',
          meta:{
            title:"数据统计"
          },
          component:Count
        },
        {
          path:'/backlog',
          name:'backlog',
          meta:{
            title:"待办事项"
          },
          component:Backlog
        }
      ]
    },
    {
      path:'/backlogDetail',
      name:'backlogDetail',
      meta:{
        title:"待办事项"
      },
      component:BacklogDetail
    },
    {
      path:'/backlogSubmit',
      name:'backlogSubmit',
      meta:{
        title:"待办事项"
      },
      component:BacklogSubmit
    },
    {
      path:'/backlogHistory',
      name:'backlogHistory',
      meta:{
        title:"历史消息"
      },
      component:BacklogHistory
    },
    {
      path:'/backlogHistoryDt',
      name:'backlogHistoryDt',
      meta:{
        title:"历史消息"
      },
      component:BacklogHistoryDt
    },
    {
      path:'/login',
      name:'login',
      meta:{
        title:"登录"
      },
      component: Login
    }
  ]
})
