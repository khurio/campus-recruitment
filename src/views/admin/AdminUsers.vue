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
            placeholder="搜索用户名、邮箱或手机号" 
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
            v-model="filterRole" 
            class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">全部角色</option>
            <option value="student">学生</option>
            <option value="enterprise">企业</option>
            <option value="admin">管理员</option>
          </select>
          
          <select 
            v-model="filterStatus" 
            class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">所有状态</option>
            <option value="active">活跃</option>
            <option value="inactive">非活跃</option>
            <option value="banned">已封禁</option>
          </select>
          
          <button 
            @click="resetFilters" 
            class="bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200"
          >
            重置
          </button>
        </div>
        
        <!-- 添加用户按钮 -->
        <button 
          @click="showAddUserModal = true" 
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          添加用户
        </button>
      </div>
    </div>
    
    <!-- 用户列表 -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                用户信息
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                角色
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状态
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                注册时间
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                最后登录
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in filteredUsers" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span v-if="!user.avatar" class="text-gray-600 font-semibold">{{ user.name.charAt(0) }}</span>
                    <img v-else :src="user.avatar" class="h-10 w-10 rounded-full" alt="">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                    <div class="text-sm text-gray-500">{{ user.phone }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                  :class="{
                    'bg-blue-100 text-blue-800': user.role === 'student',
                    'bg-green-100 text-green-800': user.role === 'enterprise',
                    'bg-purple-100 text-purple-800': user.role === 'admin'
                  }"
                >
                  {{ getRoleName(user.role) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                  :class="{
                    'bg-green-100 text-green-800': user.status === 'active',
                    'bg-gray-100 text-gray-800': user.status === 'inactive',
                    'bg-red-100 text-red-800': user.status === 'banned'
                  }"
                >
                  {{ getStatusName(user.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ user.registerTime }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ user.lastLoginTime }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="editUser(user)" class="text-blue-600 hover:text-blue-900 mr-4">编辑</button>
                <button @click="showDeleteConfirm(user)" class="text-red-600 hover:text-red-900">删除</button>
              </td>
            </tr>
            
            <!-- 无数据时显示 -->
            <tr v-if="filteredUsers.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                没有找到符合条件的用户
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 分页 -->
      <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-700">
            显示 <span class="font-medium">1</span> 到 <span class="font-medium">10</span> 条，共 <span class="font-medium">{{ users.length }}</span> 条
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
    
    <!-- 添加/编辑用户模态框 -->
    <div v-if="showAddUserModal || showEditUserModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              {{ showAddUserModal ? '添加用户' : '编辑用户' }}
            </h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                <input 
                  type="text" 
                  v-model="currentUser.name"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                <input 
                  type="email" 
                  v-model="currentUser.email"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">手机号</label>
                <input 
                  type="tel" 
                  v-model="currentUser.phone"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">角色</label>
                <select 
                  v-model="currentUser.role"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="student">学生</option>
                  <option value="enterprise">企业</option>
                  <option value="admin">管理员</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">状态</label>
                <select 
                  v-model="currentUser.status"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">活跃</option>
                  <option value="inactive">非活跃</option>
                  <option value="banned">已封禁</option>
                </select>
              </div>
              <div v-if="showAddUserModal">
                <label class="block text-sm font-medium text-gray-700 mb-1">密码</label>
                <input 
                  type="password" 
                  v-model="currentUser.password"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              @click="saveUser" 
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
                  删除用户
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    您确定要删除用户 "{{ userToDelete ? userToDelete.name : '' }}" 吗？此操作不可逆。
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
  name: 'AdminUsers',
  data() {
    return {
      users: [
        {
          id: 1,
          name: '张三',
          email: 'zhangsan@example.com',
          phone: '13812345678',
          role: 'student',
          status: 'active',
          registerTime: '2023-10-15',
          lastLoginTime: '2023-11-05'
        },
        {
          id: 2,
          name: '李四',
          email: 'lisi@example.com',
          phone: '13987654321',
          role: 'student',
          status: 'active',
          registerTime: '2023-09-20',
          lastLoginTime: '2023-11-01'
        },
        {
          id: 3,
          name: '腾讯科技',
          email: 'hr@tencent.com',
          phone: '02087654321',
          role: 'enterprise',
          status: 'active',
          registerTime: '2023-08-15',
          lastLoginTime: '2023-11-06'
        },
        {
          id: 4,
          name: '阿里巴巴',
          email: 'hr@alibaba.com',
          phone: '057188158181',
          role: 'enterprise',
          status: 'active',
          registerTime: '2023-07-10',
          lastLoginTime: '2023-11-03'
        },
        {
          id: 5,
          name: '王五',
          email: 'wangwu@example.com',
          phone: '13567891234',
          role: 'student',
          status: 'inactive',
          registerTime: '2023-06-05',
          lastLoginTime: '2023-09-15'
        },
        {
          id: 6,
          name: '管理员',
          email: 'admin@xiaozhaotongche.com',
          phone: '13800000000',
          role: 'admin',
          status: 'active',
          registerTime: '2023-01-01',
          lastLoginTime: '2023-11-07'
        }
      ],
      searchQuery: '',
      filterRole: '',
      filterStatus: '',
      showAddUserModal: false,
      showEditUserModal: false,
      showDeleteModal: false,
      currentUser: {
        name: '',
        email: '',
        phone: '',
        role: 'student',
        status: 'active',
        password: ''
      },
      userToDelete: null
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        // 搜索条件
        const searchMatch = !this.searchQuery || 
          user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.phone.includes(this.searchQuery);
        
        // 角色过滤
        const roleMatch = !this.filterRole || user.role === this.filterRole;
        
        // 状态过滤
        const statusMatch = !this.filterStatus || user.status === this.filterStatus;
        
        return searchMatch && roleMatch && statusMatch;
      });
    }
  },
  methods: {
    getRoleName(role) {
      const roleMap = {
        student: '学生',
        enterprise: '企业',
        admin: '管理员'
      };
      return roleMap[role] || role;
    },
    getStatusName(status) {
      const statusMap = {
        active: '活跃',
        inactive: '非活跃',
        banned: '已封禁'
      };
      return statusMap[status] || status;
    },
    resetFilters() {
      this.searchQuery = '';
      this.filterRole = '';
      this.filterStatus = '';
    },
    editUser(user) {
      this.currentUser = { ...user };
      this.showEditUserModal = true;
    },
    showDeleteConfirm(user) {
      this.userToDelete = user;
      this.showDeleteModal = true;
    },
    saveUser() {
      if (this.showAddUserModal) {
        // 添加新用户
        const newUser = {
          ...this.currentUser,
          id: this.users.length + 1,
          registerTime: new Date().toISOString().split('T')[0],
          lastLoginTime: '-'
        };
        this.users.push(newUser);
      } else {
        // 更新现有用户
        const index = this.users.findIndex(u => u.id === this.currentUser.id);
        if (index !== -1) {
          this.users[index] = { ...this.currentUser };
        }
      }
      this.closeModal();
    },
    confirmDelete() {
      if (this.userToDelete) {
        const index = this.users.findIndex(u => u.id === this.userToDelete.id);
        if (index !== -1) {
          this.users.splice(index, 1);
        }
      }
      this.cancelDelete();
    },
    cancelDelete() {
      this.userToDelete = null;
      this.showDeleteModal = false;
    },
    closeModal() {
      this.showAddUserModal = false;
      this.showEditUserModal = false;
      this.currentUser = {
        name: '',
        email: '',
        phone: '',
        role: 'student',
        status: 'active',
        password: ''
      };
    }
  }
}
</script> 