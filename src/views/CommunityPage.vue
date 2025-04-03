<template>
  <main class="container mx-auto px-4 py-6">
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- 左侧内容 -->
      <div class="lg:w-3/4">
        <!-- 顶部筛选栏 -->
        <div class="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-wrap items-center">
          <div class="mr-6 mb-2 md:mb-0">
            <span class="font-medium text-gray-800">分类：</span>
            <select v-model="filters.category" class="border border-gray-300 rounded-md px-2 py-1 ml-2">
              <option value="">全部</option>
              <option value="经验分享">经验分享</option>
              <option value="求职咨询">求职咨询</option>
              <option value="内推信息">内推信息</option>
              <option value="面试题讨论">面试题讨论</option>
            </select>
          </div>
          <div class="mr-6 mb-2 md:mb-0">
            <span class="font-medium text-gray-800">排序：</span>
            <select v-model="filters.sort" class="border border-gray-300 rounded-md px-2 py-1 ml-2">
              <option value="newest">最新发布</option>
              <option value="mostComments">最多评论</option>
              <option value="mostLikes">最多点赞</option>
            </select>
          </div>
          <div class="flex-grow"></div>
          <button @click="openNewPostModal" class="bg-blue-600 text-white rounded-md px-4 py-2">发布帖子</button>
        </div>
        
        <!-- 加载中 -->
        <div v-if="loading" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600">加载数据中...</p>
        </div>
        
        <!-- 帖子列表 -->
        <div v-else-if="filteredPosts.length > 0" class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div v-for="post in filteredPosts" :key="post.id" class="p-6 border-b border-gray-200 last:border-0">
            <div class="flex justify-between items-start mb-3">
              <div class="flex">
                <div class="w-10 h-10 bg-gray-200 rounded-full mr-3 flex-shrink-0"></div>
                <div>
                  <h3 class="font-medium text-lg text-gray-800">{{ post.title }}</h3>
                  <div class="flex items-center text-sm text-gray-600">
                    <span class="mr-2">{{ post.author }}</span>
                    <span>{{ post.createTime }}</span>
                  </div>
                </div>
              </div>
              <span class="px-2 py-1 rounded text-xs" :class="getCategoryClass(post.category)">{{ post.category }}</span>
            </div>
            <p class="text-gray-800 mb-4">
              {{ post.content }}
            </p>
            <div class="flex justify-between items-center text-gray-500 text-sm">
              <div class="flex space-x-4">
                <span class="flex items-center">
                  <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  {{ post.views }}
                </span>
                <span class="flex items-center">
                  <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                  {{ post.comments }}
                </span>
                <span class="flex items-center">
                  <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                  </svg>
                  {{ post.likes }}
                </span>
              </div>
              <router-link :to="`/post-detail/${post.id}`" class="text-blue-600 hover:underline">阅读全文</router-link>
            </div>
          </div>
        </div>
        
        <!-- 没有帖子时显示 -->
        <div v-else class="bg-white rounded-lg shadow-md p-6 text-center">
          <p class="text-gray-600">暂无符合条件的帖子</p>
        </div>
        
        <!-- 分页 -->
        <div v-if="filteredPosts.length > 0" class="mt-8 flex justify-center">
          <nav class="flex items-center space-x-2">
            <a href="#" @click.prevent="prevPage" class="px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50">上一页</a>
            <a v-for="page in totalPages" :key="page" href="#" @click.prevent="goToPage(page)" 
               :class="[currentPage === page ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-50', 'px-3 py-1 rounded-md']">
              {{ page }}
            </a>
            <a href="#" @click.prevent="nextPage" class="px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50">下一页</a>
          </nav>
        </div>
      </div>
      
      <!-- 右侧侧边栏 -->
      <div class="lg:w-1/4">
        <!-- 用户信息卡片 -->
        <div v-if="isLoggedIn && user" class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
            <div>
              <p class="font-medium text-gray-800">{{ user.name }}</p>
              <p class="text-sm text-gray-600">{{ user.major }}</p>
            </div>
          </div>
          <div class="flex justify-around text-center text-gray-700 mb-4">
            <div>
              <p class="font-medium">12</p>
              <p class="text-xs text-gray-500">帖子</p>
            </div>
            <div>
              <p class="font-medium">256</p>
              <p class="text-xs text-gray-500">获赞</p>
            </div>
            <div>
              <p class="font-medium">48</p>
              <p class="text-xs text-gray-500">收藏</p>
            </div>
          </div>
          <button @click="openNewPostModal" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">发布新帖</button>
        </div>
        <!-- 未登录状态 -->
        <div v-else class="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
          <p class="text-gray-800 mb-4">登录后可以发布帖子、参与讨论</p>
          <router-link to="/login" class="block w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">登录 / 注册</router-link>
        </div>
        
        <!-- 热门话题 -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 class="text-lg font-medium text-gray-800 mb-4">热门话题</h3>
          <div v-if="loading" class="text-center py-4">
            <p class="text-gray-600">加载中...</p>
          </div>
          <div v-else class="space-y-3">
            <a v-for="topic in hotTopics" :key="topic.id" href="#" class="flex items-center text-gray-700 hover:text-blue-600">
              <span class="text-lg mr-2">#</span>
              <span>{{ topic.name }}</span>
              <span class="ml-auto text-sm text-gray-500">{{ formatCount(topic.count) }}</span>
            </a>
          </div>
        </div>
        
        <!-- 即将举行的宣讲会 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-medium text-gray-800 mb-4">即将举行的宣讲会</h3>
          <div v-if="loading" class="text-center py-4">
            <p class="text-gray-600">加载中...</p>
          </div>
          <div v-else class="space-y-4">
            <div v-for="talk in upcomingTalks" :key="talk.id" class="border-l-4 border-blue-600 pl-3">
              <p class="font-medium text-gray-800">{{ talk.name }}</p>
              <p class="text-sm text-gray-600">{{ talk.talkTime }}</p>
              <router-link :to="`/enterprise-detail/${talk.id}`" class="text-xs text-blue-600 hover:underline">了解详情</router-link>
            </div>
          </div>
          <router-link to="/enterprise" class="block text-center text-blue-600 hover:underline mt-4">查看更多</router-link>
        </div>
      </div>
    </div>
    
    <!-- 发布帖子模态框（实际应用中应该使用组件库的模态框） -->
    <div v-if="showNewPostModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 class="text-xl font-bold mb-4">发布新帖子</h2>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">标题</label>
          <input type="text" v-model="newPost.title" class="w-full border border-gray-300 rounded-md px-3 py-2">
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">分类</label>
          <select v-model="newPost.category" class="w-full border border-gray-300 rounded-md px-3 py-2">
            <option value="经验分享">经验分享</option>
            <option value="求职咨询">求职咨询</option>
            <option value="内推信息">内推信息</option>
            <option value="面试题讨论">面试题讨论</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">内容</label>
          <textarea v-model="newPost.content" rows="6" class="w-full border border-gray-300 rounded-md px-3 py-2"></textarea>
        </div>
        <div class="flex justify-end space-x-2">
          <button @click="showNewPostModal = false" class="px-4 py-2 border border-gray-300 rounded-md">取消</button>
          <button @click="submitNewPost" class="px-4 py-2 bg-blue-600 text-white rounded-md">发布</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CommunityPage',
  data() {
    return {
      loading: true,
      filters: {
        category: '',
        sort: 'newest'
      },
      currentPage: 1,
      itemsPerPage: 5,
      showNewPostModal: false,
      newPost: {
        title: '',
        category: '经验分享',
        content: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      posts: 'getPosts',
      hotTopics: 'getHotTopics',
      upcomingTalks: 'getUpcomingTalks',
      user: 'getUser',
      isLoggedIn: 'isLoggedIn'
    }),
    filteredPosts() {
      let result = [...this.posts]
      
      // 应用分类筛选
      if (this.filters.category) {
        result = result.filter(post => post.category === this.filters.category)
      }
      
      // 应用排序
      if (this.filters.sort === 'newest') {
        result.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
      } else if (this.filters.sort === 'mostComments') {
        result.sort((a, b) => b.comments - a.comments)
      } else if (this.filters.sort === 'mostLikes') {
        result.sort((a, b) => b.likes - a.likes)
      }
      
      // 分页
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      return result.slice(startIndex, startIndex + this.itemsPerPage)
    },
    totalPages() {
      return Math.ceil(this.posts.length / this.itemsPerPage)
    }
  },
  async created() {
    try {
      await Promise.all([
        this.$store.dispatch('fetchPosts'),
        this.$store.dispatch('fetchHotTopics'),
        this.$store.dispatch('fetchEnterprises') // 获取企业数据，upcomingTalks会通过这个获取
      ])
    } catch(error) {
      console.error('Failed to fetch data:', error)
    } finally {
      this.loading = false
    }
  },
  methods: {
    getCategoryClass(category) {
      const classMap = {
        '经验分享': 'bg-blue-100 text-blue-800',
        '求职咨询': 'bg-green-100 text-green-800',
        '内推信息': 'bg-yellow-100 text-yellow-800',
        '面试题讨论': 'bg-purple-100 text-purple-800'
      }
      return classMap[category] || 'bg-gray-100 text-gray-800'
    },
    formatCount(count) {
      if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'k'
      }
      return count
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
    },
    openNewPostModal() {
      if (!this.isLoggedIn) {
        this.$router.push('/login')
        return
      }
      this.showNewPostModal = true
    },
    submitNewPost() {
      // 实际应用中这里会调用API提交帖子
      if (!this.newPost.title.trim() || !this.newPost.content.trim()) {
        alert('标题和内容不能为空')
        return
      }
      
      alert('帖子发布成功！')
      this.showNewPostModal = false
      this.newPost = {
        title: '',
        category: '经验分享',
        content: ''
      }
    }
  }
}
</script> 