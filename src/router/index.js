import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),

    // 二级路由或者子路由的设置
    children: [
      {
        path: "/home",
        redirect: "/welcome"
      },
      {
        path: "/welcome",
        component: () => import('@/views/Welcome.vue')
      },
      {
        path: "/users",
        component: () => import('@/components/Users')
      },
      {
        path: "/rights",
        component: () => import('@/components/Privlige')
      },
      {
        path: "/roles",
        component: () => import('@/components/Privlige/role.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 添加路由守卫，不登陆不能访问主页
// to表示将要访问的路径，from从哪来，next下一个做的操作
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const token = window.sessionStorage.getItem('token')
  if (!token) {
    return next('/login')
  }
  next()
})

export default router
