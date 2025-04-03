<template>
  <div>
    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <!-- 用户统计 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-gray-600 text-sm">注册用户</h3>
            <p class="font-bold text-2xl">{{ stats.users }}</p>
          </div>
        </div>
        <div class="mt-4">
          <p class="text-sm text-gray-600">
            较上周 <span class="text-green-600 font-semibold">+5.2%</span>
          </p>
        </div>
      </div>
      
      <!-- 企业统计 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-gray-600 text-sm">入驻企业</h3>
            <p class="font-bold text-2xl">{{ stats.enterprises }}</p>
          </div>
        </div>
        <div class="mt-4">
          <p class="text-sm text-gray-600">
            较上周 <span class="text-green-600 font-semibold">+2.8%</span>
          </p>
        </div>
      </div>
      
      <!-- 内容统计 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-gray-600 text-sm">帖子数量</h3>
            <p class="font-bold text-2xl">{{ stats.posts }}</p>
          </div>
        </div>
        <div class="mt-4">
          <p class="text-sm text-gray-600">
            较上周 <span class="text-green-600 font-semibold">+12.4%</span>
          </p>
        </div>
      </div>
      
      <!-- 活跃度统计 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100 text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-gray-600 text-sm">日活跃用户</h3>
            <p class="font-bold text-2xl">{{ stats.activeUsers }}</p>
          </div>
        </div>
        <div class="mt-4">
          <p class="text-sm text-gray-600">
            较上周 <span class="text-green-600 font-semibold">+7.1%</span>
          </p>
        </div>
      </div>
    </div>
    
    <!-- 数据图表区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- 用户增长趋势 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="font-bold text-gray-800 mb-4">用户增长趋势</h3>
        <div class="h-64 w-full bg-gray-100 rounded-lg flex items-center justify-center">
          <p class="text-gray-500">这里是用户增长图表</p>
          <!-- 实际项目中应该引入像Chart.js或ECharts等图表库 -->
        </div>
      </div>
      
      <!-- 企业分布 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="font-bold text-gray-800 mb-4">企业行业分布</h3>
        <div class="h-64 w-full bg-gray-100 rounded-lg flex items-center justify-center">
          <p class="text-gray-500">这里是企业行业分布图表</p>
          <!-- 实际项目中应该引入像Chart.js或ECharts等图表库 -->
        </div>
      </div>
    </div>
    
    <!-- 最新情况 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 近期活动 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-bold text-gray-800">近期活动</h3>
          <button class="text-sm text-blue-600 hover:underline">查看全部</button>
        </div>
        <div class="space-y-4">
          <div v-for="(activity, index) in recentActivities" :key="index" class="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
            <div class="flex items-start">
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <span class="text-gray-600 font-semibold">{{ activity.user.charAt(0) }}</span>
              </div>
              <div class="flex-grow">
                <p class="text-gray-800">
                  <span class="font-semibold">{{ activity.user }}</span> 
                  {{ activity.action }}
                </p>
                <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 待处理事项 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-bold text-gray-800">待处理事项</h3>
          <button class="text-sm text-blue-600 hover:underline">查看全部</button>
        </div>
        <div class="space-y-2">
          <div v-for="(task, index) in pendingTasks" :key="index" class="flex items-center justify-between p-3 rounded-lg"
            :class="{ 'bg-red-50': task.priority === 'high', 'bg-yellow-50': task.priority === 'medium', 'bg-gray-50': task.priority === 'low' }">
            <div class="flex items-center">
              <div class="w-3 h-3 rounded-full mr-3"
                :class="{ 'bg-red-500': task.priority === 'high', 'bg-yellow-500': task.priority === 'medium', 'bg-gray-500': task.priority === 'low' }">
              </div>
              <span class="text-gray-800">{{ task.title }}</span>
            </div>
            <button class="text-sm text-blue-600 hover:underline">处理</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminHome',
  data() {
    return {
      stats: {
        users: 12546,
        enterprises: 328,
        posts: 4721,
        activeUsers: 876
      },
      recentActivities: [
        {
          user: '张三',
          action: '发布了招聘信息',
          time: '10分钟前'
        },
        {
          user: '腾讯科技',
          action: '更新了企业资料',
          time: '30分钟前'
        },
        {
          user: '李四',
          action: '回复了帖子《求职经验分享》',
          time: '1小时前'
        },
        {
          user: '阿里巴巴',
          action: '发布了宣讲会信息',
          time: '2小时前'
        },
        {
          user: '王五',
          action: '提交了举报信息',
          time: '3小时前'
        }
      ],
      pendingTasks: [
        {
          title: '审核企业认证申请 (5)',
          priority: 'high'
        },
        {
          title: '处理用户举报信息 (3)',
          priority: 'high'
        },
        {
          title: '审核帖子内容 (12)',
          priority: 'medium'
        },
        {
          title: '更新系统公告',
          priority: 'medium'
        },
        {
          title: '备份系统数据',
          priority: 'low'
        }
      ]
    }
  }
}
</script> 