import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import moment from 'moment'
import qs from 'qs'

axios.defaults.baseURL = 'http://127.0.0.1:3000'
Vue.prototype.axios = axios;
Vue.prototype.moment= moment;
Vue.prototype.qs=qs;
Vue.config.productionTip = false

// 1导入MintUI模块
import MintUI from 'mint-ui';
// 2导入对应的样式文件
import 'mint-ui/lib/style.min.css'
// 3通过Vue.use()方法将MintUI注册为插件
Vue.use(MintUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
