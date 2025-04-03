<template>
  <main class="container mx-auto px-4 py-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">企业展示</h1>
      <p class="text-gray-600">浏览即将举办宣讲会的企业信息</p>
    </div>

    <!-- 筛选条件 -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-xl font-bold mb-4">筛选条件</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">行业</label>
          <select v-model="filters.industry" class="w-full border border-gray-300 rounded-md px-3 py-2">
            <option value="">全部行业</option>
            <option value="it">互联网/IT</option>
            <option value="finance">金融</option>
            <option value="education">教育</option>
            <option value="manufacture">制造业</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">企业规模</label>
          <select v-model="filters.scale" class="w-full border border-gray-300 rounded-md px-3 py-2">
            <option value="">不限</option>
            <option value="small">小型企业</option>
            <option value="medium">中型企业</option>
            <option value="large">大型企业</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">宣讲时间</label>
          <select v-model="filters.time" class="w-full border border-gray-300 rounded-md px-3 py-2">
            <option value="">不限</option>
            <option value="week">一周内</option>
            <option value="month">一个月内</option>
            <option value="three_months">三个月内</option>
          </select>
        </div>
      </div>
      <div class="mt-4">
        <button @click="applyFilters" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">应用筛选</button>
        <button @click="resetFilters" class="text-gray-600 px-4 py-2 ml-2">重置</button>
      </div>
    </div>

    <!-- 加载中 -->
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-gray-600">加载数据中...</p>
    </div>

    <!-- 企业列表 -->
    <div v-else class="grid grid-cols-1 gap-6">
      <div v-for="enterprise in filteredEnterprises" :key="enterprise.id" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
        <div class="flex flex-col md:flex-row">
          <div class="md:w-1/4 p-6 flex items-center justify-center bg-gray-50">
            <div class="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
              <span class="text-gray-500">公司Logo</span>
            </div>
          </div>
          <div class="md:w-3/4 p-6">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">{{ enterprise.name }}</h3>
                <div class="flex items-center text-sm text-gray-600 mb-2">
                  <span class="mr-4">{{ enterprise.industry }}</span>
                  <span>{{ enterprise.scale }}</span>
                </div>
              </div>
              <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {{ enterprise.talkTime }}
              </div>
            </div>
            <p class="text-gray-700 mb-4">
              {{ enterprise.description }}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="(position, index) in enterprise.positions" :key="index" class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{{ position }}</span>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex space-x-2">
                <button @click="addToCalendar(enterprise)" class="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">添加到日历</button>
                <router-link :to="`/enterprise-detail/${enterprise.id}`" class="text-blue-600 hover:underline px-3 py-1">查看详情</router-link>
              </div>
              <div class="text-gray-600 text-sm">
                地点: {{ enterprise.location }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="mt-8 flex justify-center">
      <nav class="flex items-center space-x-2">
        <a href="#" @click.prevent="prevPage" class="px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50">上一页</a>
        <a v-for="page in totalPages" :key="page" href="#" @click.prevent="goToPage(page)" 
           :class="[currentPage === page ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-50', 'px-3 py-1 rounded-md']">
          {{ page }}
        </a>
        <a href="#" @click.prevent="nextPage" class="px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50">下一页</a>
      </nav>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'EnterprisePage',
  data() {
    return {
      loading: true,
      filters: {
        industry: '',
        scale: '',
        time: ''
      },
      currentPage: 1,
      itemsPerPage: 5
    }
  },
  computed: {
    ...mapGetters({
      enterprises: 'getEnterprises'
    }),
    filteredEnterprises() {
      let result = [...this.enterprises]
      
      // 应用筛选条件
      if (this.filters.industry) {
        result = result.filter(e => e.industry.toLowerCase().includes(this.filters.industry.toLowerCase()))
      }
      
      if (this.filters.scale) {
        result = result.filter(e => e.scale.toLowerCase().includes(this.filters.scale.toLowerCase()))
      }
      
      // 分页
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      return result.slice(startIndex, startIndex + this.itemsPerPage)
    },
    totalPages() {
      return Math.ceil(this.enterprises.length / this.itemsPerPage)
    }
  },
  async created() {
    try {
      await this.$store.dispatch('fetchEnterprises')
    } catch(error) {
      console.error('Failed to fetch enterprises:', error)
    } finally {
      this.loading = false
    }
  },
  methods: {
    applyFilters() {
      this.currentPage = 1 // 重置到第一页
    },
    resetFilters() {
      this.filters = {
        industry: '',
        scale: '',
        time: ''
      }
      this.currentPage = 1
    },
    addToCalendar(enterprise) {
      // 实际应用中这里会调用日历API
      alert(`已添加 ${enterprise.name} 的宣讲会到您的日历`)
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    goToPage(page) {
      this.currentPage = page
    }
  }
}
</script> 