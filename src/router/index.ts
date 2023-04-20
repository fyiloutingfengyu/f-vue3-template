import { createRouter, createWebHistory } from 'vue-router'
import { usePageStore } from '@/stores/page'
import Home from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
})

router.beforeEach((to, from, next) => {
  const pageStore = usePageStore()

  const title = to.meta?.title || ''
  // @ts-ignore
  window.document.title = title
  // @ts-ignore // todo f
  pageStore.setPageTitle(title)

  next()
})

export default router
