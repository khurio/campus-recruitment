<template>
  <div class="min-h-screen bg-gray-100">
    <!-- 头部导航，仅在非管理后台页面显示 -->
    <nav v-if="!isAdminRoute" class="bg-blue-600 text-white shadow-lg">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <router-link to="/" class="text-xl font-bold">校招直通车</router-link>
        <div class="flex space-x-4">
          <router-link to="/community" class="hover:underline" :class="{ 'font-bold underline': $route.path.includes('/community') }">社区首页</router-link>
          <router-link to="/enterprise" class="hover:underline" :class="{ 'font-bold underline': $route.path.includes('/enterprise') }">企业展示</router-link>
          <router-link to="/matching" class="hover:underline" :class="{ 'font-bold underline': $route.path.includes('/matching') }">匹配推荐</router-link>
          <router-link to="/resume" class="hover:underline" :class="{ 'font-bold underline': $route.path.includes('/resume') }">简历优化</router-link>
          <router-link to="/profile" class="hover:underline" :class="{ 'font-bold underline': $route.path.includes('/profile') }">个人信息</router-link>
          <router-link to="/login" class="bg-white text-blue-600 px-3 py-1 rounded-md">登录/注册</router-link>
        </div>
      </div>
    </nav>

    <!-- 页面内容区域 -->
    <router-view />

    <!-- 页脚，仅在非管理后台页面显示 -->
    <footer v-if="!isAdminRoute" class="bg-gray-800 text-white py-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between">
          <div class="mb-6 md:mb-0">
            <h3 class="text-xl font-bold mb-4">校招直通车</h3>
            <p class="text-gray-400">连接企业与求职者的桥梁</p>
          </div>
          <div class="grid grid-cols-2 gap-8">
            <div>
              <h4 class="text-lg font-semibold mb-3">功能</h4>
              <ul class="space-y-2">
                <li><router-link to="/enterprise" class="text-gray-400 hover:text-white">企业展示</router-link></li>
                <li><router-link to="/matching" class="text-gray-400 hover:text-white">职位匹配</router-link></li>
                <li><router-link to="/resume" class="text-gray-400 hover:text-white">简历优化</router-link></li>
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-3">关于我们</h4>
              <ul class="space-y-2">
                <li><router-link to="/about" class="text-gray-400 hover:text-white">关于平台</router-link></li>
                <li><router-link to="/contact" class="text-gray-400 hover:text-white">联系我们</router-link></li>
                <li><router-link to="/privacy" class="text-gray-400 hover:text-white">隐私政策</router-link></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2023 校招直通车. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    // 判断当前路由是否为管理后台路由
    isAdminRoute() {
      return this.$route.path.startsWith('/admin');
    }
  }
}
</script> 