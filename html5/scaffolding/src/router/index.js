import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// 测试案例
import Header from '../testing/Header.vue'
import Button from '../testing/Button.vue'
import Field from '../testing/Field.vue'
import Navbar from '../testing/Navbar.vue'
import Badge from '../testing/Badge.vue'
import Infinite from '../testing/Infinite.vue'
import Access1 from '../testing/Access1.vue'
import Access2 from '../testing/Access2.vue'
import Changeage from '../testing/Changeage.vue'
import Addfriend from '../testing/Addfriend.vue'
import Ajax from '../testing/Ajax.vue'

// 项目实现开始
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import LLogin from '../views/LLogin'
import Index from '../views/Index'
import Article from '../views/Article'

Vue.use(VueRouter)

const routes = [
  {path:'/header',component:Header},
  {path:'/button',component:Button},
  {path:'/field',component:Field},
  {path:'/navbar',component:Navbar},
  {path:'/badge',component:Badge},
  {path:'/infinite',component:Infinite},
  {path:'/access1',component:Access1},
  {path:'/access2',component:Access2},
  {path:'/changeage',component:Changeage},
  {path:'/addfriend',component:Addfriend},
  {path:'/ajax',component:Ajax},

  {
    path:'/llogin',
    component:LLogin
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/register',
    component:Register
  },
  {
    path: '/',
    name: 'Index',
    component:Index
  },
  {
    path: '/article/:id',
    component:Article
  },
  // {
  //   path: '/article',
  //   name: 'Article',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
