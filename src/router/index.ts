import Home from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/product-detail',
    name: 'ProductDetail',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/ProductDetail.vue'),
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      title: '登录'
    }
  }
]

export default routes
