// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//处理跨域
import axios from 'axios';
Vue.prototype.axios=axios;
//引入cs
import './assets/css/login.css'
//import { config } from 'vue/types/umd';

//配置请求的根lujing
// axios.defaults.baseURL='http://localhost/api/888'
// axios.interceptors.request.use(config=>{
//   console.log(config)
//   //必须return出去
//   return config
// })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
