<template>
  <main class="container mx-auto px-4 py-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">匹配推荐</h1>
      <p class="text-gray-600">根据您的个人简历自动匹配最适合的职位</p>
    </div>

    <!-- 未登录状态 -->
    <div v-if="!isLoggedIn" class="bg-white rounded-lg shadow-md p-8 text-center mb-8">
      <div class="flex flex-col items-center mb-6">
        <svg class="w-16 h-16 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">请先登录</h2>
        <p class="text-gray-600 max-w-md mx-auto">登录后才能使用匹配推荐功能，我们将根据您的简历信息为您推荐最适合的职位</p>
      </div>
      <router-link to="/login" class="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">立即登录</router-link>
    </div>

    <!-- 已登录但没有上传简历 -->
    <div v-else-if="!hasResume" class="bg-white rounded-lg shadow-md p-8 mb-8">
      <div class="flex flex-col md:flex-row md:items-center">
        <div class="md:w-2/3 mb-6 md:mb-0 md:pr-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">上传您的简历</h2>
          <p class="text-gray-600 mb-6">
            您尚未上传简历，请先上传您的简历以便我们为您推荐最适合的职位。我们支持解析PDF、Word和在线简历。
          </p>
          <div class="flex flex-wrap gap-4">
            <label class="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
              <span>上传本地简历</span>
              <input type="file" class="sr-only" @change="uploadResume">
            </label>
            <button @click="showResumeForm = true" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              在线填写简历
            </button>
          </div>
        </div>
        <div class="md:w-1/3 flex justify-center">
          <img src="@/assets/images/resume_upload.svg" alt="上传简历" class="w-48">
        </div>
      </div>
    </div>

    <!-- 已登录且有简历 -->
    <div v-else>
      <!-- 简历匹配摘要 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex flex-col md:flex-row justify-between">
          <div class="mb-4 md:mb-0">
            <h2 class="text-xl font-bold text-gray-800 mb-2">简历匹配分析</h2>
            <p class="text-gray-600">基于您的简历，我们分析了您与各职位的匹配程度</p>
          </div>
          <div class="flex items-center">
            <span class="text-gray-600 mr-2">上次更新: 2023-11-12</span>
            <button @click="refreshMatching" class="text-blue-600 hover:text-blue-800">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="font-medium text-gray-800 mb-1">技能匹配</h3>
            <div class="flex items-end">
              <span class="text-3xl font-bold text-blue-600">85%</span>
              <span class="text-gray-600 ml-2">与行业要求匹配</span>
            </div>
          </div>
          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="font-medium text-gray-800 mb-1">学历背景</h3>
            <div class="flex items-end">
              <span class="text-3xl font-bold text-green-600">90%</span>
              <span class="text-gray-600 ml-2">符合招聘要求</span>
            </div>
          </div>
          <div class="bg-yellow-50 p-4 rounded-lg">
            <h3 class="font-medium text-gray-800 mb-1">工作经验</h3>
            <div class="flex items-end">
              <span class="text-3xl font-bold text-yellow-600">70%</span>
              <span class="text-gray-600 ml-2">达到职位期望</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 职位推荐列表 -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-800">为您推荐的职位</h2>
        </div>
        
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div class="flex flex-wrap items-center justify-between">
            <div class="flex space-x-4 mb-2 sm:mb-0">
              <div>
                <label class="text-sm text-gray-600 block mb-1">行业</label>
                <select v-model="filters.industry" class="border border-gray-300 rounded-md px-3 py-1 w-full">
                  <option value="">全部</option>
                  <option value="互联网/IT">互联网/IT</option>
                  <option value="金融">金融</option>
                  <option value="教育">教育</option>
                </select>
              </div>
              <div>
                <label class="text-sm text-gray-600 block mb-1">工作城市</label>
                <select v-model="filters.city" class="border border-gray-300 rounded-md px-3 py-1 w-full">
                  <option value="">全部</option>
                  <option value="北京">北京</option>
                  <option value="上海">上海</option>
                  <option value="深圳">深圳</option>
                </select>
              </div>
            </div>
            <div class="flex space-x-2">
              <button 
                v-for="(tab, index) in sortTabs" 
                :key="index" 
                @click="sortType = tab.value"
                :class="[
                  'px-3 py-1 text-sm rounded-md', 
                  sortType === tab.value ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]"
              >
                {{ tab.name }}
              </button>
            </div>
          </div>
        </div>

        <!-- 加载中 -->
        <div v-if="loading" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600">正在加载推荐职位...</p>
        </div>

        <!-- 推荐列表 -->
        <div v-else-if="filteredJobs.length > 0">
          <div v-for="job in filteredJobs" :key="job.id" class="px-6 py-4 border-b border-gray-200 hover:bg-gray-50">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
              <div class="mb-4 md:mb-0 md:mr-4">
                <div class="flex items-start">
                  <div class="w-12 h-12 bg-gray-200 flex-shrink-0 mr-4 rounded-md flex items-center justify-center">
                    <span class="text-gray-500 text-xs">LOGO</span>
                  </div>
                  <div>
                    <h3 class="text-lg font-medium text-gray-800">{{ job.title }}</h3>
                    <div class="text-sm text-gray-600">{{ job.company }}</div>
                    <div class="flex flex-wrap mt-2">
                      <span class="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded mr-2 mb-1">{{ job.city }}</span>
                      <span class="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded mr-2 mb-1">{{ job.salary }}</span>
                      <span class="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded mr-2 mb-1">{{ job.experience }}</span>
                      <span class="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded mb-1">{{ job.education }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-end">
                <div class="text-sm font-medium text-green-600 mb-2">匹配度: {{ job.matchRate }}%</div>
                <button class="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  投递简历
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 无数据 -->
        <div v-else class="text-center py-12">
          <p class="text-gray-600">暂无符合条件的推荐职位</p>
        </div>
      </div>

      <!-- 提升匹配度建议 -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">提升匹配度建议</h2>
        <div class="space-y-4">
          <div class="p-4 bg-blue-50 rounded-lg">
            <h3 class="font-medium text-gray-800 mb-2">技能提升</h3>
            <p class="text-gray-700">建议学习前端框架Vue.js和React，这些技能在互联网行业的前端开发岗位需求较高。</p>
          </div>
          <div class="p-4 bg-blue-50 rounded-lg">
            <h3 class="font-medium text-gray-800 mb-2">简历优化</h3>
            <p class="text-gray-700">您的简历缺少项目经验描述，建议添加2-3个与求职意向相关的项目经历，并突出您的贡献。</p>
          </div>
          <div class="p-4 bg-blue-50 rounded-lg">
            <h3 class="font-medium text-gray-800 mb-2">求职方向</h3>
            <p class="text-gray-700">基于您的技能和背景，除了前端开发，您也适合产品经理岗位，可以考虑扩大求职范围。</p>
          </div>
          <div class="text-center mt-6">
            <router-link to="/resume" class="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">前往简历优化</router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- 填写简历表单模态框 -->
    <div v-if="showResumeForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-3xl max-h-screen overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">在线填写简历</h2>
          <button @click="showResumeForm = false" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- 简历表单，实际应用中可能会更复杂 -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">个人技能</label>
            <textarea rows="3" v-model="resumeForm.skills" class="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="请输入您的技能，用逗号分隔"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">工作经历</label>
            <textarea rows="5" v-model="resumeForm.experience" class="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="请描述您的工作经历"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">项目经验</label>
            <textarea rows="5" v-model="resumeForm.projects" class="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="请描述您的项目经验"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">自我评价</label>
            <textarea rows="3" v-model="resumeForm.selfEvaluation" class="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="请输入自我评价"></textarea>
          </div>
        </div>
        
        <div class="flex justify-end mt-6">
          <button @click="showResumeForm = false" class="px-4 py-2 border border-gray-300 rounded-md mr-2">取消</button>
          <button @click="submitResume" class="px-4 py-2 bg-blue-600 text-white rounded-md">提交</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MatchingPage',
  data() {
    return {
      loading: false,
      hasResume: false,
      showResumeForm: false,
      resumeForm: {
        skills: '',
        experience: '',
        projects: '',
        selfEvaluation: ''
      },
      filters: {
        industry: '',
        city: ''
      },
      sortType: 'match', // 默认按匹配度排序
      sortTabs: [
        { name: '匹配度优先', value: 'match' },
        { name: '薪资优先', value: 'salary' },
        { name: '最新发布', value: 'time' }
      ],
      jobs: [
        {
          id: 1,
          title: '前端开发工程师',
          company: '腾讯科技有限公司',
          city: '深圳',
          salary: '25K-35K',
          experience: '3-5年',
          education: '本科及以上',
          matchRate: 92,
          industry: '互联网/IT',
          publishTime: '2023-11-10'
        },
        {
          id: 2,
          title: '产品经理',
          company: '阿里巴巴集团',
          city: '杭州',
          salary: '30K-40K',
          experience: '3-5年',
          education: '本科及以上',
          matchRate: 85,
          industry: '互联网/IT',
          publishTime: '2023-11-11'
        },
        {
          id: 3,
          title: '数据分析师',
          company: '百度在线网络技术有限公司',
          city: '北京',
          salary: '20K-30K',
          experience: '1-3年',
          education: '本科及以上',
          matchRate: 78,
          industry: '互联网/IT',
          publishTime: '2023-11-09'
        },
        {
          id: 4,
          title: '金融分析师',
          company: '平安银行',
          city: '上海',
          salary: '15K-25K',
          experience: '1-3年',
          education: '硕士及以上',
          matchRate: 70,
          industry: '金融',
          publishTime: '2023-11-08'
        },
        {
          id: 5,
          title: '教育培训讲师',
          company: '好未来教育',
          city: '北京',
          salary: '12K-20K',
          experience: '0-2年',
          education: '本科及以上',
          matchRate: 65,
          industry: '教育',
          publishTime: '2023-11-12'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      user: 'getUser'
    }),
    filteredJobs() {
      let result = [...this.jobs]
      
      // 应用行业筛选
      if (this.filters.industry) {
        result = result.filter(job => job.industry === this.filters.industry)
      }
      
      // 应用城市筛选
      if (this.filters.city) {
        result = result.filter(job => job.city === this.filters.city)
      }
      
      // 应用排序
      if (this.sortType === 'match') {
        result.sort((a, b) => b.matchRate - a.matchRate)
      } else if (this.sortType === 'salary') {
        // 简单处理，实际中可能需要更复杂的逻辑来解析薪资范围
        result.sort((a, b) => {
          const aMin = parseInt(a.salary.split('-')[0])
          const bMin = parseInt(b.salary.split('-')[0])
          return bMin - aMin
        })
      } else if (this.sortType === 'time') {
        result.sort((a, b) => new Date(b.publishTime) - new Date(a.publishTime))
      }
      
      return result
    }
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
        alert('简历上传成功！')
      }, 1500)
    },
    submitResume() {
      // 验证表单
      if (!this.resumeForm.skills || !this.resumeForm.experience) {
        alert('请填写必要的简历信息')
        return
      }
      
      // 模拟提交简历
      this.loading = true
      setTimeout(() => {
        this.hasResume = true
        this.showResumeForm = false
        this.loading = false
        alert('简历提交成功！')
      }, 1500)
    },
    refreshMatching() {
      // 模拟刷新匹配结果
      this.loading = true
      setTimeout(() => {
        this.loading = false
        alert('匹配结果已更新！')
      }, 1500)
    }
  }
}
</script> 