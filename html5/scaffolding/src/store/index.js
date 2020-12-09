import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// Vuex 注册成为Vue的插件
Vue.use(Vuex)
// 通过构造函数来创建Vuex的Store(仓库)
export default new Vuex.Store({
  //状态： 在各个组件中共享的数据
  state: {
    // 标识用户是否已经登录
    // isLogined:0,
    isLogined:localStorage.getItem('islogined') || 0,
    //存储登录用户相关的信息
    // info:{},
    info:JSON.parse(localStorage.getItem('info')) || {},

  ////////////////
    username:'Frank',
    age:23,
    // true 表示女，false表示男
    sex:true,
    friends:[{name:'Tom',sex:false},{name:'Rose',sex:true}]
  },
  // 改变状态
  mutations: {
    loginMutation(state,payload){
      // 改变用户登录状态
      state.isLogined=1
      // 将获取到的登录用户信息存储到info中去
      state.info=payload;
    },
    // 用户注销
    logoutMutation(state){
      state.isLogined=0;
      state.info={}
    },
    /////////////////
    // 增加年龄方法
    // state参数从理论上上可以省略，但在时间
    ageIncrementMutation(state){
      state.age ++;
    },
    ageDecrementMutation(state){
      state.age --; 
    },
    // 添加用户的方法
    // 
    addFriendMutation(state,payload){
      state.friends.push(payload)
    }
  },
  // 发送异步请求
  actions: {
    getServerData(context){
      // console.log('用户信息已发送')
      axios.get('/user').then(res=>{
        //将结果存储到store中state中去
        // 需要通知Mutations，让它来将服务器返回的数据添加到state中
        context.commit('addFriendMutation',res.data)
      })
    }
  },
  modules: {
  }
})
