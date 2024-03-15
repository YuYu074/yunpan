import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'; 
/* import jwtDecode from 'jwt-decode'; */
/* import Vue from 'vue' */
 axios.defaults.baseURL="http://localhost:8081"
/*  import 'echarts';
 import ECharts from 'vue-echarts'; 
 Vue.component('v-chart',Echarts); */
/*  Vue.prototype.$http=axios  */
Vue.config.productionTip = false
Vue.use(ElementUI);

axios.interceptors.request.use(
config =>{
const token = JSON.parse(localStorage.getItem('token'))
if (token) {
config.headers.token = token
}
return config
},
error =>{
return Promise.reject(error)
}
)
Vue.prototype.$http = axios

router.beforeEach((to, from, next) => {
  const isAuthenticated = JSON.parse(localStorage.getItem('token'))// 检查用户是否已登陆，例如从 localStorage 中获取 JWT 令牌并验证
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login'); // 如果需要登陆权限且未登陆，跳转到登陆页面
  } else{ 
       next();
    }
});


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
