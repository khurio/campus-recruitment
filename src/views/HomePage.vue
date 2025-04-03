<template>
  <main class="container mx-auto px-4 py-6">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">欢迎使用校招直通车</h1>
      <p class="text-xl text-gray-600">连接企业与求职者，让校招更高效</p>
    </div>

    <!-- 功能区块 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <!-- 功能卡片1 -->
      <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
        <div class="text-blue-600 text-4xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-12 w-12">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-2">企业展示</h3>
        <p class="text-gray-600 mb-4">浏览参与宣讲的企业信息，了解企业文化与招聘需求</p>
        <router-link to="/enterprise" class="text-blue-600 hover:underline">查看企业 →</router-link>
      </div>

      <!-- 功能卡片2 -->
      <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
        <div class="text-blue-600 text-4xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-12 w-12">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-2">匹配推荐</h3>
        <p class="text-gray-600 mb-4">智能匹配您的简历与企业需求，推荐最适合的职位</p>
        <router-link to="/matching" class="text-blue-600 hover:underline">开始匹配 →</router-link>
      </div>

      <!-- 功能卡片3 -->
      <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
        <div class="text-blue-600 text-4xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-12 w-12">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-2">简历优化</h3>
        <p class="text-gray-600 mb-4">根据企业需求分析，提供个性化简历优化建议</p>
        <router-link to="/resume" class="text-blue-600 hover:underline">优化简历 →</router-link>
      </div>
    </div>

    <!-- 二维码入口 -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-12">
      <h2 class="text-2xl font-bold mb-4 text-center">扫码使用小程序版本</h2>
      <div class="flex justify-center">
        <div class="p-4 border-2 border-gray-300 rounded-md">
          <!-- 这里放置小程序二维码图片 -->
          <div class="w-48 h-48 bg-gray-200 flex items-center justify-center">
            <span class="text-gray-500">小程序二维码</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'HomePage'
}
</script> 