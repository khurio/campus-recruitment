import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/enterprise',
    name: 'Enterprise',
    component: () => import('@/views/EnterprisePage.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfilePage.vue')
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('@/views/CommunityPage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/matching',
    name: 'Matching',
    component: () => import('@/views/MatchingPage.vue')
  },
  {
    path: '/resume',
    name: 'Resume',
    component: () => import('@/views/ResumePage.vue')
  },
  // 其他页面路由
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutPage.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/ContactPage.vue')
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/PrivacyPage.vue')
  },
  {
    path: '/enterprise-detail/:id',
    name: 'EnterpriseDetail',
    component: () => import('@/views/EnterpriseDetailPage.vue')
  },
  {
    path: '/post-detail/:id',
    name: 'PostDetail',
    component: () => import('@/views/PostDetailPage.vue')
  },
  // 管理后台路由
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/views/admin/AdminLogin.vue')
  },
  {
    path: '/admin',
    redirect: '/admin/dashboard'
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('@/views/admin/AdminDashboard.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: () => import('@/views/admin/AdminHome.vue')
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('@/views/admin/AdminUsers.vue')
      },
      {
        path: 'enterprises',
        name: 'AdminEnterprises',
        component: () => import('@/views/admin/AdminEnterprises.vue')
      },
      {
        path: 'content',
        name: 'AdminContent',
        component: () => import('@/views/admin/AdminContent.vue')
      },
      {
        path: 'stats',
        name: 'AdminStats',
        component: () => import('@/views/admin/AdminStats.vue')
      },
      {
        path: 'settings',
        name: 'AdminSettings',
        component: () => import('@/views/admin/AdminSettings.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// 全局前置守卫，用于处理需要登录的页面
router.beforeEach((to, from, next) => {
  // 检查路由是否需要身份验证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 这里应该检查用户是否已登录
    // 此处为简单示例，实际项目中应该检查存储在 localStorage 或 Vuex 中的登录状态
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true'
    
    if (!isLoggedIn) {
      // 如果未登录，则重定向到登录页面
      next({ name: 'AdminLogin' })
    } else {
      // 如果已登录，则正常进入页面
      next()
    }
  } else {
    // 不需要身份验证的页面正常进入
    next()
  }
})

export default router 