<template>
  <main class="container mx-auto px-4 py-6">
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-gray-600">加载企业信息中...</p>
    </div>

    <div v-else-if="enterprise" class="space-y-6">
      <!-- 企业基本信息 -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6">
          <div class="flex flex-col md:flex-row">
            <div class="md:w-1/4 flex justify-center mb-6 md:mb-0">
              <div class="w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                <span v-if="!enterprise.logo" class="text-gray-500 text-xl">{{ enterprise.name.substring(0, 2) }}</span>
                <img v-else :src="enterprise.logo" :alt="enterprise.name" class="w-full h-full object-cover" />
              </div>
            </div>
            <div class="md:w-3/4 md:pl-6">
              <div class="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <h1 class="text-2xl font-bold text-gray-800 mb-2">{{ enterprise.name }}</h1>
                  <div class="flex flex-wrap items-center text-gray-600 mb-4">
                    <span class="mr-4">{{ enterprise.industry }}</span>
                    <span class="mr-4">{{ enterprise.scale }}</span>
                    <span>中国 · {{ enterprise.location }}</span>
                  </div>
                </div>
                <div class="flex mt-4 md:mt-0">
                  <button 
                    @click="toggleFavorite" 
                    class="flex items-center border border-gray-300 rounded-md px-3 py-1 mr-2 hover:bg-gray-50"
                    :class="{'text-red-600': isFavorite}"
                  >
                    <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
                    </svg>
                    <span>{{ isFavorite ? '已收藏' : '收藏' }}</span>
                  </button>
                  <button class="flex items-center border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-50">
                    <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                    </svg>
                    <span>分享</span>
                  </button>
                </div>
              </div>
              <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                <div class="flex items-center">
                  <svg class="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span class="text-blue-800 font-medium">宣讲会时间: {{ enterprise.talkTime }}</span>
                </div>
                <div class="ml-8">
                  <p class="text-blue-700">地点: {{ enterprise.location }}</p>
                </div>
              </div>
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="(tag, index) in ['行业领先', '福利好', '环境好', '晋升快']" :key="index" class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{{ tag }}</span>
              </div>
              <div class="mt-4 flex space-x-4">
                <button @click="showPositions = true" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">查看招聘职位</button>
                <button @click="addToCalendar" class="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">添加到日历</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 企业介绍 -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-800">企业介绍</h2>
        </div>
        <div class="p-6">
          <p class="text-gray-700 whitespace-pre-line">{{ enterprise.description }}</p>
        </div>
      </div>

      <!-- 招聘职位 -->
      <div v-if="showPositions" class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-xl font-bold text-gray-800">招聘职位</h2>
          <span class="text-gray-600">共 {{ enterprise.positions.length }} 个职位</span>
        </div>
        <div class="divide-y divide-gray-200">
          <div v-for="(position, index) in enterprise.positions" :key="index" class="p-6 hover:bg-gray-50">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-medium text-gray-800 mb-1">{{ position }}</h3>
                <div class="text-gray-600 text-sm mb-2">{{ enterprise.location }} · 全职</div>
                <div class="flex flex-wrap gap-2">
                  <span class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">本科及以上</span>
                  <span class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">经验1-3年</span>
                  <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">20k-35k</span>
                </div>
              </div>
              <button class="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">申请职位</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 宣讲会安排 -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-800">宣讲会安排</h2>
        </div>
        <div class="p-6">
          <div class="flex mb-6">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="font-medium text-gray-800 mb-1">时间</h3>
              <p class="text-gray-700">{{ enterprise.talkTime }}</p>
            </div>
          </div>
          <div class="flex mb-6">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="font-medium text-gray-800 mb-1">地点</h3>
              <p class="text-gray-700">{{ enterprise.location }}</p>
            </div>
          </div>
          <div class="flex">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="font-medium text-gray-800 mb-1">宣讲人</h3>
              <p class="text-gray-700">{{ enterprise.name }} 校园招聘负责人</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 提问区 -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-800">宣讲会提问</h2>
        </div>
        <div class="p-6">
          <p class="text-gray-700 mb-4">您可以在这里提前提交问题，企业会在宣讲会上进行解答</p>
          
          <!-- 提问表单 -->
          <div class="mb-8">
            <textarea 
              v-model="question" 
              rows="4" 
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder="请输入您想问的问题..."
            ></textarea>
            <div class="flex justify-end mt-2">
              <button 
                @click="submitQuestion" 
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                :disabled="!question.trim()"
              >
                提交问题
              </button>
            </div>
          </div>
          
          <!-- 历史问题列表 -->
          <div>
            <h3 class="font-medium text-gray-800 mb-4">已提交的问题 ({{ questions.length }})</h3>
            <div v-if="questions.length === 0" class="text-center py-6 bg-gray-50 rounded-md">
              <p class="text-gray-600">还没有人提问，成为第一个提问的人吧！</p>
            </div>
            <div v-else class="space-y-4">
              <div v-for="(q, index) in questions" :key="index" class="bg-gray-50 p-4 rounded-md">
                <div class="flex justify-between items-start">
                  <div class="flex items-start">
                    <div class="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <p class="font-medium text-gray-800">匿名用户</p>
                      <p class="text-gray-600 text-sm">{{ q.time }}</p>
                    </div>
                  </div>
                  <div class="flex items-center text-gray-500 text-sm">
                    <button class="flex items-center mr-3 hover:text-blue-600">
                      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                      </svg>
                      {{ q.likes }}
                    </button>
                    <button class="flex items-center hover:text-blue-600">
                      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                      </svg>
                      回复
                    </button>
                  </div>
                </div>
                <p class="mt-3 text-gray-800">{{ q.content }}</p>
                <div v-if="q.answer" class="mt-3 ml-11 p-3 bg-white rounded-md">
                  <div class="flex items-start">
                    <div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      <span class="text-blue-600 text-xs font-medium">企</span>
                    </div>
                    <div>
                      <p class="font-medium text-gray-800">{{ enterprise.name }} <span class="text-sm font-normal text-gray-600">官方回复</span></p>
                      <p class="text-gray-800 mt-1">{{ q.answer }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="bg-white rounded-lg shadow-md p-6 text-center">
      <p class="text-gray-600">未找到相关企业信息</p>
      <router-link to="/enterprise" class="mt-4 inline-block text-blue-600 hover:underline">返回企业列表</router-link>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'EnterpriseDetailPage',
  data() {
    return {
      loading: true,
      enterprise: null,
      isFavorite: false,
      showPositions: false,
      question: '',
      questions: [
        {
          content: "贵公司对应届生有什么培训计划吗？",
          time: "2023-10-28 14:23",
          likes: 12,
          answer: "我们有完善的新人培训体系，包括为期一个月的技术培训和导师制度，会安排有经验的老员工一对一带新人。"
        },
        {
          content: "请问实习生有转正机会吗？转正比例是多少？",
          time: "2023-10-27 16:45",
          likes: 8,
          answer: null
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      enterprises: 'getEnterprises'
    })
  },
  created() {
    this.fetchEnterpriseData()
  },
  methods: {
    async fetchEnterpriseData() {
      this.loading = true
      try {
        // 如果Store中没有企业数据，则先获取
        if (!this.enterprises || this.enterprises.length === 0) {
          await this.$store.dispatch('fetchEnterprises')
        }
        
        // 根据路由参数找到对应企业
        const enterpriseId = parseInt(this.$route.params.id)
        this.enterprise = this.enterprises.find(e => e.id === enterpriseId)
        
        if (!this.enterprise) {
          console.error('Enterprise not found with ID:', enterpriseId)
        }
      } catch (error) {
        console.error('Failed to fetch enterprise data:', error)
      } finally {
        this.loading = false
      }
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite
      // 实际应用中这里会调用API保存收藏状态
      const action = this.isFavorite ? '收藏' : '取消收藏'
      alert(`已${action}该企业`)
    },
    addToCalendar() {
      // 实际应用中这里会调用日历API
      alert(`已添加 ${this.enterprise.name} 的宣讲会到您的日历`)
    },
    submitQuestion() {
      if (!this.question.trim()) return
      
      // 实际应用中这里会调用API提交问题
      this.questions.unshift({
        content: this.question,
        time: new Date().toLocaleString(),
        likes: 0,
        answer: null
      })
      
      this.question = ''
      alert('问题提交成功！企业会在宣讲会上进行解答')
    }
  }
}
</script> 