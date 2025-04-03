<template>
  <div>
    <h2 class="text-xl font-bold text-gray-900 mb-6">数据统计分析</h2>
    
    <!-- 统计卡片区域 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- 用户总数 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-sm font-medium text-gray-500">用户总数</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats.userCount }}</p>
          </div>
          <div class="p-2 rounded-full bg-blue-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
        <div class="mt-4 flex items-center">
          <span class="text-sm font-medium" :class="stats.userGrowth >= 0 ? 'text-green-600' : 'text-red-600'">
            {{ stats.userGrowth >= 0 ? '+' : '' }}{{ stats.userGrowth }}%
          </span>
          <span class="text-sm text-gray-500 ml-2">相比上月</span>
        </div>
      </div>
      
      <!-- 企业总数 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-sm font-medium text-gray-500">企业总数</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats.companyCount }}</p>
          </div>
          <div class="p-2 rounded-full bg-purple-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
        <div class="mt-4 flex items-center">
          <span class="text-sm font-medium" :class="stats.companyGrowth >= 0 ? 'text-green-600' : 'text-red-600'">
            {{ stats.companyGrowth >= 0 ? '+' : '' }}{{ stats.companyGrowth }}%
          </span>
          <span class="text-sm text-gray-500 ml-2">相比上月</span>
        </div>
      </div>
      
      <!-- 职位数量 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-sm font-medium text-gray-500">职位数量</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats.jobCount }}</p>
          </div>
          <div class="p-2 rounded-full bg-green-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div class="mt-4 flex items-center">
          <span class="text-sm font-medium" :class="stats.jobGrowth >= 0 ? 'text-green-600' : 'text-red-600'">
            {{ stats.jobGrowth >= 0 ? '+' : '' }}{{ stats.jobGrowth }}%
          </span>
          <span class="text-sm text-gray-500 ml-2">相比上月</span>
        </div>
      </div>
      
      <!-- 简历投递量 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-sm font-medium text-gray-500">简历投递量</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats.resumeCount }}</p>
          </div>
          <div class="p-2 rounded-full bg-yellow-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        <div class="mt-4 flex items-center">
          <span class="text-sm font-medium" :class="stats.resumeGrowth >= 0 ? 'text-green-600' : 'text-red-600'">
            {{ stats.resumeGrowth >= 0 ? '+' : '' }}{{ stats.resumeGrowth }}%
          </span>
          <span class="text-sm text-gray-500 ml-2">相比上月</span>
        </div>
      </div>
    </div>
    
    <!-- 用户活跃度图表区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- 用户增长趋势图 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-medium text-gray-900 mb-4">用户增长趋势</h3>
        <div class="h-80 flex items-center justify-center bg-gray-50 rounded-md">
          <!-- 图表容器 -->
          <div id="userGrowthChart" class="w-full h-full"></div>
          <!-- 图表加载中显示 -->
          <div v-if="chartsLoading" class="absolute">
            <p class="text-gray-500">图表加载中...</p>
          </div>
        </div>
      </div>
      
      <!-- 用户活跃度图表 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-medium text-gray-900 mb-4">用户活跃度分析</h3>
        <div class="h-80 flex items-center justify-center bg-gray-50 rounded-md">
          <!-- 图表容器 -->
          <div id="userActivityChart" class="w-full h-full"></div>
          <!-- 图表加载中显示 -->
          <div v-if="chartsLoading" class="absolute">
            <p class="text-gray-500">图表加载中...</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 其他数据统计图表 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 行业分布图表 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-medium text-gray-900 mb-4">企业行业分布</h3>
        <div class="h-80 flex items-center justify-center bg-gray-50 rounded-md">
          <!-- 图表容器 -->
          <div id="industryDistributionChart" class="w-full h-full"></div>
          <!-- 图表加载中显示 -->
          <div v-if="chartsLoading" class="absolute">
            <p class="text-gray-500">图表加载中...</p>
          </div>
        </div>
      </div>
      
      <!-- 职位类型分布图表 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-medium text-gray-900 mb-4">职位类型分布</h3>
        <div class="h-80 flex items-center justify-center bg-gray-50 rounded-md">
          <!-- 图表容器 -->
          <div id="jobTypeChart" class="w-full h-full"></div>
          <!-- 图表加载中显示 -->
          <div v-if="chartsLoading" class="absolute">
            <p class="text-gray-500">图表加载中...</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 最近注册用户列表 -->
    <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-lg font-medium text-gray-900 mb-4">最近注册用户</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                用户
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                角色
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                注册时间
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状态
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in recentUsers" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span v-if="!user.avatar" class="text-gray-600 font-semibold">{{ user.name.charAt(0) }}</span>
                    <img v-else :src="user.avatar" class="h-10 w-10 rounded-full" alt="">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                  :class="{
                    'bg-blue-100 text-blue-800': user.role === 'student',
                    'bg-purple-100 text-purple-800': user.role === 'enterprise',
                    'bg-green-100 text-green-800': user.role === 'admin'
                  }"
                >
                  {{ user.role === 'student' ? '学生' : user.role === 'enterprise' ? '企业' : '管理员' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ user.registerTime }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                  :class="{
                    'bg-green-100 text-green-800': user.status === 'active',
                    'bg-yellow-100 text-yellow-800': user.status === 'pending',
                    'bg-red-100 text-red-800': user.status === 'inactive'
                  }"
                >
                  {{ user.status === 'active' ? '活跃' : user.status === 'pending' ? '待验证' : '非活跃' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// 注意：实际项目中，应该引入echarts或其他图表库来绘制图表
// 这里仅为模拟，没有实际绘制图表

export default {
  name: 'AdminStats',
  data() {
    return {
      chartsLoading: false,
      
      // 统计数据
      stats: {
        userCount: 8764,
        userGrowth: 12.5,
        companyCount: 326,
        companyGrowth: 8.2,
        jobCount: 1243,
        jobGrowth: 15.7,
        resumeCount: 6521,
        resumeGrowth: 24.3
      },
      
      // 最近注册用户
      recentUsers: [
        {
          id: 1,
          name: '张明',
          email: 'zhangming@example.com',
          role: 'student',
          registerTime: '2023-11-05 14:32',
          status: 'active'
        },
        {
          id: 2,
          name: '李华',
          email: 'lihua@example.com',
          role: 'student',
          registerTime: '2023-11-05 10:15',
          status: 'active'
        },
        {
          id: 3,
          name: '字节跳动',
          email: 'hr@bytedance.com',
          role: 'enterprise',
          registerTime: '2023-11-04 16:48',
          status: 'active'
        },
        {
          id: 4,
          name: '王芳',
          email: 'wangfang@example.com',
          role: 'student',
          registerTime: '2023-11-04 09:21',
          status: 'pending'
        },
        {
          id: 5,
          name: '腾讯科技',
          email: 'hr@tencent.com',
          role: 'enterprise',
          registerTime: '2023-11-03 15:36',
          status: 'active'
        }
      ],
      
      // 图表数据，实际项目中可能会从API获取
      chartData: {
        userGrowth: [
          { month: '1月', count: 5420 },
          { month: '2月', count: 5680 },
          { month: '3月', count: 6105 },
          { month: '4月', count: 6340 },
          { month: '5月', count: 6820 },
          { month: '6月', count: 7150 },
          { month: '7月', count: 7480 },
          { month: '8月', count: 7850 },
          { month: '9月', count: 8210 },
          { month: '10月', count: 8520 },
          { month: '11月', count: 8764 }
        ],
        userActivity: {
          daily: 3200,
          weekly: 5400,
          monthly: 7600
        },
        industryDistribution: [
          { name: '互联网/IT', value: 42 },
          { name: '金融', value: 18 },
          { name: '教育', value: 12 },
          { name: '制造业', value: 10 },
          { name: '医疗健康', value: 8 },
          { name: '其他', value: 10 }
        ],
        jobTypeDistribution: [
          { name: '技术/研发', value: 35 },
          { name: '产品', value: 15 },
          { name: '设计', value: 10 },
          { name: '市场/营销', value: 18 },
          { name: '运营', value: 12 },
          { name: '其他', value: 10 }
        ]
      }
    }
  },
  mounted() {
    // 模拟图表加载
    this.chartsLoading = true;
    setTimeout(() => {
      this.chartsLoading = false;
      this.initCharts();
    }, 1000);
  },
  methods: {
    initCharts() {
      // 在真实项目中，这里应该初始化echarts等图表库
      // 由于这里只是UI展示，所以不包含实际的图表初始化代码
      console.log('图表初始化完成');
      
      // 例如使用echarts的代码可能如下：
      /*
      // 用户增长趋势图
      const userGrowthChart = echarts.init(document.getElementById('userGrowthChart'));
      userGrowthChart.setOption({
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: this.chartData.userGrowth.map(item => item.month) },
        yAxis: { type: 'value' },
        series: [{
          data: this.chartData.userGrowth.map(item => item.count),
          type: 'line',
          smooth: true
        }]
      });
      
      // 其他图表初始化...
      */
    }
  }
}
</script> 