import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { HomeOutlined, InfoCircleOutlined, WarningOutlined } from '@ant-design/icons-vue'
import Login from '../views/auth/LoginView.vue'
import BasicLayout from '@/components/layout/BasicLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录',
        requiresAuth: false,
      },
    },
    {
      path: '/',
      component: BasicLayout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
          meta: {
            isMenu: true,
            level: 1,
            title: '首页',
            icon: HomeOutlined,
          },
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/AboutView.vue'),
          meta: {
            isMenu: true,
            level: 1,
            title: '关于',
            icon: InfoCircleOutlined,
          },
        },
        {
          path: 'exception',
          name: 'exception',
          redirect: '/exception/403',
          meta: {
            isMenu: true,
            level: 1,
            title: '异常页',
            icon: WarningOutlined,
          },
          children: [
            {
              path: '/exception/403',
              name: 'ErrorForbidden',
              component: () => import('@/views/exception/ErrorForbidden.vue'),
              meta: {
                isMenu: true,
                level: 2,
                title: '403',
              },
            },
            {
              path: '/exception/404',
              name: 'ErrorNotFound',
              component: () => import('@/views/exception/ErrorNotFound.vue'),
              meta: {
                isMenu: true,
                level: 2,
                title: '404',
              },
            },
            {
              path: '/exception/500',
              name: 'ErrorServer',
              component: () => import('@/views/exception/ErrorServer.vue'),
              meta: {
                isMenu: true,
                level: 2,
                title: '500',
              },
            },
          ],
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('../views/profile/ProfileView.vue'),
          meta: {
            requiresAuth: true,
            title: '个人信息',
          },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/exception/ErrorNotFound.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else if (to.name === 'login' && isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
