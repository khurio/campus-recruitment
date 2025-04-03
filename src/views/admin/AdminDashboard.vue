<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- 侧边栏 -->
    <aside class="w-64 bg-gray-800 text-white">
      <div class="p-4 bg-gray-900">
        <h1 class="text-lg font-bold">校招直通车管理系统</h1>
      </div>
      <nav class="mt-4">
        <ul class="space-y-1">
          <li>
            <router-link 
              to="/admin/dashboard" 
              exact
              class="flex items-center px-4 py-3 hover:bg-gray-700 transition"
              :class="{ 'bg-blue-600': $route.path === '/admin/dashboard' }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>控制面板</span>
            </router-link>
          </li>
          <li>
            <router-link 
              to="/admin/dashboard/users" 
              class="flex items-center px-4 py-3 hover:bg-gray-700 transition"
              :class="{ 'bg-blue-600': $route.path.includes('/users') }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>用户管理</span>
            </router-link>
          </li>
          <li>
            <router-link 
              to="/admin/dashboard/enterprises" 
              class="flex items-center px-4 py-3 hover:bg-gray-700 transition"
              :class="{ 'bg-blue-600': $route.path.includes('/enterprises') }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>企业管理</span>
            </router-link>
          </li>
          <li>
            <router-link 
              to="/admin/dashboard/content" 
              class="flex items-center px-4 py-3 hover:bg-gray-700 transition"
              :class="{ 'bg-blue-600': $route.path.includes('/content') }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span>内容管理</span>
            </router-link>
          </li>
          <li>
            <router-link 
              to="/admin/dashboard/stats" 
              class="flex items-center px-4 py-3 hover:bg-gray-700 transition"
              :class="{ 'bg-blue-600': $route.path.includes('/stats') }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>数据统计</span>
            </router-link>
          </li>
          <li>
            <router-link 
              to="/admin/dashboard/settings" 
              class="flex items-center px-4 py-3 hover:bg-gray-700 transition"
              :class="{ 'bg-blue-600': $route.path.includes('/settings') }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>系统设置</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="absolute bottom-0 w-64 border-t border-gray-700">
        <router-link to="/" class="flex items-center px-4 py-3 hover:bg-gray-700 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>返回前台</span>
        </router-link>
        <a href="#" @click.prevent="logout" class="flex items-center px-4 py-3 hover:bg-gray-700 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>退出登录</span>
        </a>
      </div>
    </aside>

    <!-- 主内容区 -->
    <main class="flex-1">
      <!-- 顶部导航栏 -->
      <header class="bg-white shadow">
        <div class="flex items-center justify-between px-6 py-3">
          <h2 class="text-xl font-semibold text-gray-800">{{ pageTitle }}</h2>
          <div class="flex items-center">
            <span class="text-sm text-gray-600 mr-4">{{ user ? user.name : '管理员' }}</span>
            <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <!-- 页面内容 -->
      <div class="p-6">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AdminDashboard',
  computed: {
    ...mapGetters({
      user: 'getUser'
    }),
    pageTitle() {
      // 根据当前路由路径返回对应的页面标题
      const path = this.$route.path
      
      if (path === '/admin/dashboard') return '控制面板'
      if (path.includes('/admin/dashboard/users')) return '用户管理'
      if (path.includes('/admin/dashboard/enterprises')) return '企业管理'
      if (path.includes('/admin/dashboard/content')) return '内容管理'
      if (path.includes('/admin/dashboard/stats')) return '数据统计'
      if (path.includes('/admin/dashboard/settings')) return '系统设置'
      
      return '管理后台'
    }
  },
  methods: {
    logout() {
      // 清除登录状态
      localStorage.removeItem('adminLoggedIn')
      localStorage.removeItem('adminUsername')
      localStorage.removeItem('adminRememberMe')
      // 跳转到登录页
      this.$router.push('/admin/login')
    }
  },
  beforeMount() {
    // 检查登录状态
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true'
    if (!isLoggedIn) {
      this.$router.push('/admin/login')
    }
  }
}
</script> 