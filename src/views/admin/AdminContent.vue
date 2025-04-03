<template>
  <div>
    <!-- 选项卡导航 -->
    <div class="mb-6">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <button 
            @click="activeTab = 'posts'" 
            class="py-4 px-1 border-b-2 font-medium text-sm"
            :class="{ 
              'border-blue-500 text-blue-600': activeTab === 'posts',
              'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': activeTab !== 'posts'
            }"
          >
            社区帖子
          </button>
          <button 
            @click="activeTab = 'comments'" 
            class="py-4 px-1 border-b-2 font-medium text-sm"
            :class="{ 
              'border-blue-500 text-blue-600': activeTab === 'comments',
              'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': activeTab !== 'comments'
            }"
          >
            用户评论
          </button>
          <button 
            @click="activeTab = 'events'" 
            class="py-4 px-1 border-b-2 font-medium text-sm"
            :class="{ 
              'border-blue-500 text-blue-600': activeTab === 'events',
              'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': activeTab !== 'events'
            }"
          >
            宣讲活动
          </button>
          <button 
            @click="activeTab = 'jobs'" 
            class="py-4 px-1 border-b-2 font-medium text-sm"
            :class="{ 
              'border-blue-500 text-blue-600': activeTab === 'jobs',
              'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': activeTab !== 'jobs'
            }"
          >
            招聘岗位
          </button>
        </nav>
      </div>
    </div>
    
    <!-- 各内容类型对应的管理面板 -->
    <div>
      <!-- 帖子管理 -->
      <div v-if="activeTab === 'posts'" class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-semibold text-gray-900">社区帖子管理</h2>
          <div class="flex items-center space-x-4">
            <div class="relative">
              <input 
                type="text" 
                v-model="postsSearchQuery" 
                placeholder="搜索帖子标题或作者" 
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <select 
              v-model="postsFilterCategory" 
              class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">全部分类</option>
              <option value="经验分享">经验分享</option>
              <option value="求职咨询">求职咨询</option>
              <option value="公司点评">公司点评</option>
              <option value="内推机会">内推机会</option>
            </select>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  标题
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  作者
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  分类
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  发布时间
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  浏览/回复
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="post in filteredPosts" :key="post.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="text-sm font-medium text-gray-900">{{ post.title }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">{{ post.author }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {{ post.category }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ post.publishTime }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ post.views }} / {{ post.replies }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                    :class="{
                      'bg-green-100 text-green-800': post.status === '已发布',
                      'bg-yellow-100 text-yellow-800': post.status === '待审核',
                      'bg-red-100 text-red-800': post.status === '已禁用'
                    }"
                  >
                    {{ post.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button @click="viewPost(post)" class="text-indigo-600 hover:text-indigo-900 mr-2">查看</button>
                  <button @click="togglePostStatus(post)" 
                    :class="{
                      'text-red-600 hover:text-red-900': post.status === '已发布',
                      'text-green-600 hover:text-green-900': post.status !== '已发布'
                    }"
                  >
                    {{ post.status === '已发布' ? '禁用' : '发布' }}
                  </button>
                  <button @click="deletePost(post)" class="text-red-600 hover:text-red-900 ml-2">删除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- 帖子分页 -->
        <div class="mt-4 flex justify-between items-center">
          <div class="text-sm text-gray-700">
            显示 <span class="font-medium">1</span> 到 <span class="font-medium">10</span> 条，共 <span class="font-medium">{{ posts.length }}</span> 条
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">上一页</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </a>
              <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">1</a>
              <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">2</a>
              <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">3</a>
              <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">下一页</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>
      
      <!-- 评论管理 -->
      <div v-if="activeTab === 'comments'" class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-lg font-semibold text-gray-900 mb-6">用户评论管理</h2>
        <!-- 评论管理内容 -->
        <p class="text-gray-500">评论管理内容将在这里显示</p>
      </div>
      
      <!-- 宣讲活动管理 -->
      <div v-if="activeTab === 'events'" class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-lg font-semibold text-gray-900 mb-6">宣讲活动管理</h2>
        <!-- 宣讲活动管理内容 -->
        <p class="text-gray-500">宣讲活动管理内容将在这里显示</p>
      </div>
      
      <!-- 招聘岗位管理 -->
      <div v-if="activeTab === 'jobs'" class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-lg font-semibold text-gray-900 mb-6">招聘岗位管理</h2>
        <!-- 招聘岗位管理内容 -->
        <p class="text-gray-500">招聘岗位管理内容将在这里显示</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminContent',
  data() {
    return {
      activeTab: 'posts',
      
      // 帖子相关数据
      postsSearchQuery: '',
      postsFilterCategory: '',
      posts: [
        {
          id: 1,
          title: '分享我的秋招面试经验 - 字节跳动前端岗',
          author: '张同学',
          category: '经验分享',
          publishTime: '2023-10-15',
          views: 1250,
          replies: 48,
          status: '已发布'
        },
        {
          id: 2,
          title: '腾讯产品经理岗位面试题整理',
          author: '李同学',
          category: '经验分享',
          publishTime: '2023-10-12',
          views: 980,
          replies: 36,
          status: '已发布'
        },
        {
          id: 3,
          title: '阿里巴巴Java开发工程师笔试题解析',
          author: '王同学',
          category: '经验分享',
          publishTime: '2023-10-10',
          views: 850,
          replies: 29,
          status: '已发布'
        },
        {
          id: 4,
          title: '华为研发岗位待遇怎么样？',
          author: '赵同学',
          category: '求职咨询',
          publishTime: '2023-10-08',
          views: 720,
          replies: 24,
          status: '已发布'
        },
        {
          id: 5,
          title: '【内推】百度2024校招内推码',
          author: '刘同学',
          category: '内推机会',
          publishTime: '2023-10-05',
          views: 1500,
          replies: 65,
          status: '已发布'
        },
        {
          id: 6,
          title: '京东物流管培生面试流程分享',
          author: '孙同学',
          category: '经验分享',
          publishTime: '2023-10-03',
          views: 670,
          replies: 18,
          status: '已发布'
        },
        {
          id: 7,
          title: '小米产品经理实习生招聘',
          author: '小米HR',
          category: '内推机会',
          publishTime: '2023-10-01',
          views: 890,
          replies: 42,
          status: '待审核'
        }
      ]
    }
  },
  computed: {
    filteredPosts() {
      return this.posts.filter(post => {
        // 搜索条件
        const searchMatch = !this.postsSearchQuery || 
          post.title.toLowerCase().includes(this.postsSearchQuery.toLowerCase()) ||
          post.author.toLowerCase().includes(this.postsSearchQuery.toLowerCase());
        
        // 分类过滤
        const categoryMatch = !this.postsFilterCategory || post.category === this.postsFilterCategory;
        
        return searchMatch && categoryMatch;
      });
    }
  },
  methods: {
    viewPost(post) {
      // 查看帖子详情
      alert(`查看帖子: ${post.title}`);
    },
    togglePostStatus(post) {
      // 切换帖子状态
      if (post.status === '已发布') {
        post.status = '已禁用';
      } else {
        post.status = '已发布';
      }
    },
    deletePost(post) {
      // 删除帖子
      if (confirm(`确定要删除帖子"${post.title}"吗？`)) {
        const index = this.posts.findIndex(p => p.id === post.id);
        if (index !== -1) {
          this.posts.splice(index, 1);
        }
      }
    }
  }
}
</script> 