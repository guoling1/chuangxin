import axios from 'axios'
import qs from 'qs'
export default {
  state:{
    isLogin:false,
    user:JSON.parse(localStorage.getItem("userMessage")),
    token: null,
    title:'',
    messageNum:0,
    bk:0
  },
  mutations:{
    BK:(state,data)=>{
      state.bk = 1
    },
    USER:(state,data)=>{
      state.user = data;
    },
    LOGIN: (state, data) => {
      localStorage.token = data;
      state.isLogin = true;
      state.token = data;
    },
    LOGOUT: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('userMessage');
      state.user = JSON.parse(localStorage.getItem("userMessage"));
      state.token = null;
      state.isLogin = false;
    },
    MESSAGENUM:(state)=>{
      if(state.isLogin){
        axios.post('/oa/oaNotify/self/count',qs.stringify({'currentUser.id':JSON.parse(localStorage.getItem('userMessage')).id}))
          .then(res=>{
            state.messageNum = res.data;
          })
      }
    }
  }
}
