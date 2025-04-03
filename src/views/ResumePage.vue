<template>
  <main class="container mx-auto px-4 py-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">简历优化</h1>
      <p class="text-gray-600">提供专业的简历分析和优化建议，提高面试通过率</p>
    </div>

    <!-- 未登录状态 -->
    <div v-if="!isLoggedIn" class="bg-white rounded-lg shadow-md p-8 text-center mb-8">
      <div class="flex flex-col items-center mb-6">
        <svg class="w-16 h-16 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">请先登录</h2>
        <p class="text-gray-600 max-w-md mx-auto">登录后才能使用简历优化功能，我们将为您提供个性化的简历分析和优化建议</p>
      </div>
      <router-link to="/login" class="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">立即登录</router-link>
    </div>

    <!-- 已登录但没有上传简历 -->
    <div v-else-if="!hasResume" class="bg-white rounded-lg shadow-md p-8 mb-8">
      <div class="flex flex-col md:flex-row md:items-center">
        <div class="md:w-2/3 mb-6 md:mb-0 md:pr-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">上传您的简历</h2>
          <p class="text-gray-600 mb-6">
            优化简历前，请先上传您当前的简历。我们支持解析PDF、Word格式的简历文件。
          </p>
          <div class="flex flex-wrap gap-4">
            <label class="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
              <span>上传简历</span>
              <input type="file" class="sr-only" @change="uploadResume">
            </label>
          </div>
        </div>
        <div class="md:w-1/3 flex justify-center">
          <img src="@/assets/images/resume_upload.svg" alt="上传简历" class="w-48">
        </div>
      </div>
    </div>

    <!-- 已登录且有简历 -->
    <div v-else>
      <!-- 简历分析结果 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 class="text-xl font-bold text-gray-800 mb-1">简历分析结果</h2>
            <p class="text-gray-600">分析完成时间: 2023-11-13 14:30</p>
          </div>
          <div class="mt-4 md:mt-0">
            <button @click="showUploadModal = true" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">重新上传简历</button>
          </div>
        </div>
        
        <!-- 总体评分 -->
        <div class="flex flex-col md:flex-row mb-8">
          <div class="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
            <div class="relative">
              <svg class="w-32 h-32" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#e6e6e6" stroke-width="2"></circle>
                <circle cx="18" cy="18" r="16" fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="100" stroke-dashoffset="25"></circle>
                <text x="18" y="20.5" text-anchor="middle" fill="#3b82f6" font-size="8" font-weight="bold">75分</text>
              </svg>
            </div>
            <div class="text-center mt-2">
              <h3 class="text-lg font-medium text-gray-800">总体评分</h3>
              <p class="text-sm text-gray-600">超过65%的求职者</p>
            </div>
          </div>
          <div class="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-medium text-gray-800 mb-1">内容完整度</h3>
              <div class="flex items-center">
                <div class="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                  <div class="bg-blue-600 h-2.5 rounded-full" style="width: 85%"></div>
                </div>
                <span class="text-sm text-gray-600">85%</span>
              </div>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-medium text-gray-800 mb-1">专业相关度</h3>
              <div class="flex items-center">
                <div class="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                  <div class="bg-blue-600 h-2.5 rounded-full" style="width: 90%"></div>
                </div>
                <span class="text-sm text-gray-600">90%</span>
              </div>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-medium text-gray-800 mb-1">技能匹配度</h3>
              <div class="flex items-center">
                <div class="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                  <div class="bg-blue-600 h-2.5 rounded-full" style="width: 70%"></div>
                </div>
                <span class="text-sm text-gray-600">70%</span>
              </div>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-medium text-gray-800 mb-1">表达清晰度</h3>
              <div class="flex items-center">
                <div class="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                  <div class="bg-blue-600 h-2.5 rounded-full" style="width: 75%"></div>
                </div>
                <span class="text-sm text-gray-600">75%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 优化建议 -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div class="px-6 py-4 bg-blue-600 text-white">
          <h2 class="text-xl font-bold">优化建议</h2>
        </div>
        
        <!-- 建议内容 -->
        <div class="p-6 space-y-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <svg class="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
              </svg>
              工作经历优化
            </h3>
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p class="text-yellow-700">您的工作经历描述过于简单，缺乏具体的业绩和贡献。</p>
            </div>
            <div class="mt-3 text-gray-700">
              <p class="mb-2">建议:</p>
              <ul class="list-disc pl-5 space-y-1">
                <li>使用STAR法则（情境、任务、行动、结果）描述工作经历</li>
                <li>添加量化的业绩数据，如"提高了XX%的效率"、"节省了XX成本"</li>
                <li>突出与目标职位相关的经验和技能</li>
              </ul>
              <div class="mt-4">
                <div class="bg-gray-100 p-3 rounded-md mb-3">
                  <p class="text-sm font-medium text-gray-800">原文:</p>
                  <p class="text-sm text-gray-600">"负责公司官网的前端开发工作，使用Vue.js框架"</p>
                </div>
                <div class="bg-green-50 p-3 rounded-md">
                  <p class="text-sm font-medium text-gray-800">优化示例:</p>
                  <p class="text-sm text-gray-600">"负责公司官网的前端开发工作，使用Vue.js框架重构了原有网站，优化了用户体验，提高了页面加载速度30%，使得用户停留时间增加了25%"</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <svg class="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
              </svg>
              技能描述优化
            </h3>
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p class="text-yellow-700">您的技能部分仅列出了技能名称，缺乏熟练程度和应用场景的说明。</p>
            </div>
            <div class="mt-3 text-gray-700">
              <p class="mb-2">建议:</p>
              <ul class="list-disc pl-5 space-y-1">
                <li>为每个技能添加熟练程度（精通、熟练、了解）</li>
                <li>重点突出与目标职位要求匹配的技能</li>
                <li>增加实际项目中应用这些技能的简短描述</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              项目经验亮点
            </h3>
            <div class="bg-green-50 border-l-4 border-green-400 p-4">
              <p class="text-green-700">您的项目经验描述很详细，结构清晰，是简历的亮点。</p>
            </div>
            <div class="mt-3 text-gray-700">
              <p>继续保持这一优势，可以考虑添加更多关于团队协作和问题解决的细节，进一步突出您的软技能。</p>
            </div>
          </div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="px-6 py-4 bg-gray-50 flex justify-between items-center">
          <span class="text-gray-600 text-sm">上次更新: 2023-11-13</span>
          <div>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">下载优化建议</button>
            <button class="ml-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">申请人工审核</button>
          </div>
        </div>
      </div>

      <!-- 行业简历样例 -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">行业简历样例</h2>
        <p class="text-gray-600 mb-6">这里提供了一些优秀的行业简历样例，您可以参考其结构和表达方式</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
            <div class="aspect-w-3 aspect-h-4 bg-gray-100">
              <div class="flex items-center justify-center h-full">
                <span class="text-gray-500">简历预览图</span>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-medium text-gray-800 mb-1">前端开发工程师简历</h3>
              <p class="text-sm text-gray-600 mb-3">3年经验 | 互联网行业</p>
              <button class="w-full px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">查看样例</button>
            </div>
          </div>
          
          <div class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
            <div class="aspect-w-3 aspect-h-4 bg-gray-100">
              <div class="flex items-center justify-center h-full">
                <span class="text-gray-500">简历预览图</span>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-medium text-gray-800 mb-1">产品经理简历</h3>
              <p class="text-sm text-gray-600 mb-3">5年经验 | 电商行业</p>
              <button class="w-full px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">查看样例</button>
            </div>
          </div>
          
          <div class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
            <div class="aspect-w-3 aspect-h-4 bg-gray-100">
              <div class="flex items-center justify-center h-full">
                <span class="text-gray-500">简历预览图</span>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-medium text-gray-800 mb-1">应届生简历</h3>
              <p class="text-sm text-gray-600 mb-3">计算机专业 | 校园招聘</p>
              <button class="w-full px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">查看样例</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 上传简历模态框 -->
    <div v-if="showUploadModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">重新上传简历</h2>
          <button @click="showUploadModal = false" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="mb-6">
          <p class="text-gray-600 mb-4">上传新的简历文件，我们将重新为您分析并提供优化建议</p>
          <div class="flex items-center justify-center w-full">
            <label class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">点击上传</span>或拖放文件</p>
                <p class="text-xs text-gray-500">支持PDF、Word格式</p>
              </div>
              <input type="file" class="hidden" @change="handleReupload" />
            </label>
          </div>
        </div>
        
        <div class="flex justify-end">
          <button @click="showUploadModal = false" class="px-4 py-2 border border-gray-300 rounded-md mr-2">取消</button>
          <button @click="showUploadModal = false" class="px-4 py-2 bg-blue-600 text-white rounded-md">上传</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ResumePage',
  data() {
    return {
      loading: false,
      hasResume: false,
      showUploadModal: false
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      user: 'getUser'
    })
  },
  created() {
    // 检查用户是否登录
    if (this.isLoggedIn) {
      this.checkResume()
    }
  },
  methods: {
    checkResume() {
      // 模拟检查用户是否有简历
      this.loading = true
      setTimeout(() => {
        // 假设用户有简历
        this.hasResume = true
        this.loading = false
      }, 1000)
    },
    uploadResume(event) {
      const file = event.target.files[0]
      if (!file) return
      
      // 模拟上传简历
      this.loading = true
      setTimeout(() => {
        this.hasResume = true
        this.loading = false
        alert('简历上传成功！我们将为您分析并提供优化建议')
      }, 1500)
    },
    handleReupload(event) {
      const file = event.target.files[0]
      if (!file) return
      
      this.showUploadModal = false
      
      // 模拟重新上传简历
      this.loading = true
      setTimeout(() => {
        this.loading = false
        alert('新简历上传成功！我们将重新为您分析并提供优化建议')
      }, 1500)
    }
  }
}
</script> 