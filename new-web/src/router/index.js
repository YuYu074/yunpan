import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
 /*  {
    path: '/information',
    name: 'information',
    component: ()=>import('../components/Information.vue')
  },
  {
    path: '/car',
    name: 'car',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/Car.vue')

  },
   {
    path: '/data',
    name: 'data',
    component: ()=>import('../components/Data.vue')
  },
   {
    path: '/foreigncooperation',
    name: 'foreigncooperation',
    component: ()=>import('../components/Foreigncooperation.vue')
  },
   {
    path: '/warehouse',
    name: 'warehouse',
    component: ()=>import('../components/Warehouse.vue')
  }, */
  /* {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true } // 需要登陆权限
    }, */
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/firstPage',
    name:'firstPage',
     component: ()=>import('../components/FirstPage.vue'),
      meta: { requiresAuth: true }
  },
  {
    path: '/PriceSet',
    name: 'PriceSet',
    component: ()=>import('../components/PriceSet.vue'),
      meta: { requiresAuth: true }
  },
   {
    path: '/BusinessDataCharts',
    name: 'BusinessDataCharts',
    component: ()=>import('../components/BusinessDataCharts.vue'),
      meta: { requiresAuth: true }
  },
  {
    path: '/BusinessData',
    name: 'BusinessData',
    component: ()=>import('../components/BusinessData.vue'),
      meta: { requiresAuth: true }
  },{
    path: '/NoticeSet',
    name: 'NoticeSet',
    component: ()=>import('../components/NoticeSet.vue'),
      meta: { requiresAuth: true }
  },{
    path: '/UserSet',
    name: 'UserSet',
    component: ()=>import('../components/UserSet.vue'),
      meta: { requiresAuth: true }
  },/*{
    path: '/guanggaoinfo',
    name: 'Guanggaoinfo',
    component: ()=>import('../components/Guanggaoinfo.vue')
  }, */
{
    path: '/login',
    name: 'Login',
    component: ()=>import('../components/Login.vue')
  },

]
 



const router = new VueRouter({
  routes
})

export default router