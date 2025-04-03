<template>
  <div>
    <!-- 顶部操作栏 -->
    <div class="bg-white p-4 rounded-lg shadow-md mb-6">
      <div class="flex flex-wrap gap-4 justify-between items-center">
        <!-- 搜索框 -->
        <div class="relative flex-grow max-w-md">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="搜索企业名称或联系人" 
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <!-- 过滤器 -->
        <div class="flex flex-wrap gap-3">
          <select 
            v-model="filterIndustry" 
            class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">全部行业</option>
            <option value="互联网">互联网</option>
            <option value="金融">金融</option>
            <option value="教育">教育</option>
            <option value="制造业">制造业</option>
          </select>
          
          <select 
            v-model="filterScale" 
            class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">所有规模</option>
            <option value="小型">小型企业</option>
            <option value="中型">中型企业</option>
            <option value="大型">大型企业</option>
          </select>

          <select 
            v-model="filterVerified" 
            class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">全部状态</option>
            <option value="已认证">已认证</option>
            <option value="未认证">未认证</option>
          </select>
          
          <button 
            @click="resetFilters" 
            class="bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200"
          >
            重置
          </button>
        </div>
        
        <!-- 添加企业按钮 -->
        <button 
          @click="showAddEnterpriseModal = true" 
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          添加企业
        </button>
      </div>
    </div>
    
    <!-- 企业列表 -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                企业信息
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                行业
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                规模
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                认证状态
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                注册时间
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="enterprise in filteredEnterprises" :key="enterprise.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-12 w-12 bg-gray-200 flex items-center justify-center rounded">
                    <img v-if="enterprise.logo" :src="enterprise.logo" class="h-10 w-10" alt="">
                    <span v-else class="text-gray-600 font-semibold">{{ enterprise.name.charAt(0) }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ enterprise.name }}</div>
                    <div class="text-sm text-gray-500">联系人: {{ enterprise.contact }}</div>
                    <div class="text-sm text-gray-500">邮箱: {{ enterprise.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ enterprise.industry }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ enterprise.scale }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                  :class="{
                    'bg-green-100 text-green-800': enterprise.verified === '已认证',
                    'bg-yellow-100 text-yellow-800': enterprise.verified === '未认证'
                  }"
                >
                  {{ enterprise.verified }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ enterprise.registerTime }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="viewDetails(enterprise)" class="text-indigo-600 hover:text-indigo-900 mr-2">查看</button>
                <button @click="editEnterprise(enterprise)" class="text-blue-600 hover:text-blue-900 mr-2">编辑</button>
                <button @click="showDeleteConfirm(enterprise)" class="text-red-600 hover:text-red-900">删除</button>
              </td>
            </tr>
            
            <!-- 无数据时显示 -->
            <tr v-if="filteredEnterprises.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                没有找到符合条件的企业
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 分页 -->
      <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-700">
            显示 <span class="font-medium">1</span> 到 <span class="font-medium">10</span> 条，共 <span class="font-medium">{{ enterprises.length }}</span> 条
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
    </div>
    
    <!-- 添加/编辑企业模态框 -->
    <div v-if="showAddEnterpriseModal || showEditEnterpriseModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              {{ showAddEnterpriseModal ? '添加企业' : '编辑企业' }}
            </h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">企业名称</label>
                <input 
                  type="text" 
                  v-model="currentEnterprise.name"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">联系人</label>
                <input 
                  type="text" 
                  v-model="currentEnterprise.contact"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">联系邮箱</label>
                <input 
                  type="email" 
                  v-model="currentEnterprise.email"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">所属行业</label>
                <select 
                  v-model="currentEnterprise.industry"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="互联网">互联网</option>
                  <option value="金融">金融</option>
                  <option value="教育">教育</option>
                  <option value="制造业">制造业</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">企业规模</label>
                <select 
                  v-model="currentEnterprise.scale"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="小型">小型企业</option>
                  <option value="中型">中型企业</option>
                  <option value="大型">大型企业</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">认证状态</label>
                <select 
                  v-model="currentEnterprise.verified"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="已认证">已认证</option>
                  <option value="未认证">未认证</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">企业简介</label>
                <textarea 
                  v-model="currentEnterprise.description"
                  rows="3"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              @click="saveEnterprise" 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              保存
            </button>
            <button 
              @click="closeModal" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 删除确认模态框 -->
    <div v-if="showDeleteModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  删除企业
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    您确定要删除企业 "{{ enterpriseToDelete ? enterpriseToDelete.name : '' }}" 吗？此操作不可逆，企业的所有相关数据也将被删除。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              @click="confirmDelete" 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              删除
            </button>
            <button 
              @click="cancelDelete" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminEnterprises',
  data() {
    return {
      enterprises: [
        {
          id: 1,
          name: '腾讯科技',
          contact: '张经理',
          email: 'hr@tencent.com',
          industry: '互联网',
          scale: '大型',
          verified: '已认证',
          description: '腾讯是中国领先的互联网增值服务提供商，主要提供社交网络、游戏、数字内容、金融科技等服务',
          registerTime: '2023-01-15'
        },
        {
          id: 2,
          name: '阿里巴巴',
          contact: '李总监',
          email: 'hr@alibaba.com',
          industry: '互联网',
          scale: '大型',
          verified: '已认证',
          description: '阿里巴巴是全球企业间电子商务的著名品牌，提供电子商务、云计算、数字媒体等服务',
          registerTime: '2023-02-20'
        },
        {
          id: 3,
          name: '招商银行',
          contact: '王经理',
          email: 'hr@cmbchina.com',
          industry: '金融',
          scale: '大型',
          verified: '已认证',
          description: '招商银行是中国第一家完全由企业法人持股的股份制商业银行，提供全面的金融服务',
          registerTime: '2023-03-10'
        },
        {
          id: 4,
          name: '新东方教育',
          contact: '刘主管',
          email: 'hr@xdf.cn',
          industry: '教育',
          scale: '中型',
          verified: '已认证',
          description: '新东方教育科技集团是一家大型综合性教育集团，提供外语培训、基础教育等服务',
          registerTime: '2023-04-05'
        },
        {
          id: 5,
          name: '小米科技',
          contact: '赵经理',
          email: 'hr@xiaomi.com',
          industry: '互联网',
          scale: '大型',
          verified: '已认证',
          description: '小米是一家以手机、智能硬件和IoT平台为核心的互联网公司',
          registerTime: '2023-05-15'
        },
        {
          id: 6,
          name: '华为技术',
          contact: '孙总监',
          email: 'hr@huawei.com',
          industry: '制造业',
          scale: '大型',
          verified: '已认证',
          description: '华为是全球领先的信息与通信技术解决方案供应商，专注于ICT领域',
          registerTime: '2023-06-20'
        }
      ],
      searchQuery: '',
      filterIndustry: '',
      filterScale: '',
      filterVerified: '',
      showAddEnterpriseModal: false,
      showEditEnterpriseModal: false,
      showDeleteModal: false,
      currentEnterprise: {
        name: '',
        contact: '',
        email: '',
        industry: '互联网',
        scale: '中型',
        verified: '未认证',
        description: ''
      },
      enterpriseToDelete: null
    }
  },
  computed: {
    filteredEnterprises() {
      return this.enterprises.filter(enterprise => {
        // 搜索条件
        const searchMatch = !this.searchQuery || 
          enterprise.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          enterprise.contact.toLowerCase().includes(this.searchQuery.toLowerCase());
        
        // 行业过滤
        const industryMatch = !this.filterIndustry || enterprise.industry === this.filterIndustry;
        
        // 规模过滤
        const scaleMatch = !this.filterScale || enterprise.scale === this.filterScale;
        
        // 认证状态过滤
        const verifiedMatch = !this.filterVerified || enterprise.verified === this.filterVerified;
        
        return searchMatch && industryMatch && scaleMatch && verifiedMatch;
      });
    }
  },
  methods: {
    resetFilters() {
      this.searchQuery = '';
      this.filterIndustry = '';
      this.filterScale = '';
      this.filterVerified = '';
    },
    viewDetails(enterprise) {
      // 在实际应用中，这里可能会跳转到企业详情页或弹出详情模态框
      alert(`查看企业详情: ${enterprise.name}`);
    },
    editEnterprise(enterprise) {
      this.currentEnterprise = { ...enterprise };
      this.showEditEnterpriseModal = true;
    },
    showDeleteConfirm(enterprise) {
      this.enterpriseToDelete = enterprise;
      this.showDeleteModal = true;
    },
    saveEnterprise() {
      if (this.showAddEnterpriseModal) {
        // 添加新企业
        const newEnterprise = {
          ...this.currentEnterprise,
          id: this.enterprises.length + 1,
          registerTime: new Date().toISOString().split('T')[0]
        };
        this.enterprises.push(newEnterprise);
      } else {
        // 更新现有企业
        const index = this.enterprises.findIndex(e => e.id === this.currentEnterprise.id);
        if (index !== -1) {
          this.enterprises[index] = { ...this.currentEnterprise };
        }
      }
      this.closeModal();
    },
    confirmDelete() {
      if (this.enterpriseToDelete) {
        const index = this.enterprises.findIndex(e => e.id === this.enterpriseToDelete.id);
        if (index !== -1) {
          this.enterprises.splice(index, 1);
        }
      }
      this.cancelDelete();
    },
    cancelDelete() {
      this.enterpriseToDelete = null;
      this.showDeleteModal = false;
    },
    closeModal() {
      this.showAddEnterpriseModal = false;
      this.showEditEnterpriseModal = false;
      this.currentEnterprise = {
        name: '',
        contact: '',
        email: '',
        industry: '互联网',
        scale: '中型',
        verified: '未认证',
        description: ''
      };
    }
  }
}
</script> 