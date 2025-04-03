<template>
  <main class="container mx-auto px-4 py-6">
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <!-- 个人信息页面标签导航 -->
      <div class="bg-gray-50 border-b border-gray-200">
        <div class="flex overflow-x-auto">
          <button 
            v-for="(tab, index) in tabs" 
            :key="index" 
            @click="activeTab = tab.id"
            :class="[
              'px-6 py-3 font-medium whitespace-nowrap', 
              activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
            ]"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>
      
      <!-- 加载中 -->
      <div v-if="loading" class="p-6 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">加载数据中...</p>
      </div>
      
      <!-- 个人基本信息 -->
      <div v-else-if="activeTab === 'basic' && user" class="p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">个人基本信息</h1>
        
        <div class="flex flex-col md:flex-row mb-8">
          <!-- 左侧头像 -->
          <div class="md:w-1/4 flex flex-col items-center mb-6 md:mb-0">
            <div class="w-32 h-32 bg-gray-200 rounded-full overflow-hidden mb-4 flex items-center justify-center">
              <span class="text-gray-500">头像</span>
            </div>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-md mt-2">更换头像</button>
          </div>
          
          <!-- 右侧表单 -->
          <div class="md:w-3/4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                <input type="text" v-model="userForm.name" class="w-full border border-gray-300 rounded-md px-3 py-2">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">性别</label>
                <select v-model="userForm.gender" class="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="male">男</option>
                  <option value="female">女</option>
                  <option value="other">其他</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">电子邮箱</label>
                <input type="email" v-model="userForm.email" class="w-full border border-gray-300 rounded-md px-3 py-2">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">手机号码</label>
                <input type="tel" v-model="userForm.phone" class="w-full border border-gray-300 rounded-md px-3 py-2">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">学校</label>
                <input type="text" v-model="userForm.school" class="w-full border border-gray-300 rounded-md px-3 py-2">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">专业</label>
                <input type="text" v-model="userForm.major" class="w-full border border-gray-300 rounded-md px-3 py-2">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">学历</label>
                <select v-model="userForm.education" class="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="bachelor">本科</option>
                  <option value="master">硕士</option>
                  <option value="phd">博士</option>
                  <option value="other">其他</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">毕业年份</label>
                <input type="text" v-model="userForm.graduationYear" class="w-full border border-gray-300 rounded-md px-3 py-2">
              </div>
            </div>
            
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-1">求职意向</label>
              <div class="flex flex-wrap gap-2 mb-2">
                <span v-for="(intention, index) in userForm.jobIntentions" :key="index" class="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center">
                  {{ intention }}
                  <button @click="removeJobIntention(index)" class="ml-1 text-blue-600 hover:text-blue-800">×</button>
                </span>
              </div>
              <div class="flex">
                <input type="text" v-model="newJobIntention" placeholder="添加求职意向" class="flex-1 border border-gray-300 rounded-l-md px-3 py-2">
                <button @click="addJobIntention" class="bg-blue-600 text-white px-4 py-2 rounded-r-md">添加</button>
              </div>
            </div>
            
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-1">个人简介</label>
              <textarea rows="4" v-model="userForm.introduction" class="w-full border border-gray-300 rounded-md px-3 py-2"></textarea>
            </div>
            
            <div class="mt-6 flex justify-end">
              <button @click="cancelEdit" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2">取消</button>
              <button @click="saveProfile" class="bg-blue-600 text-white px-4 py-2 rounded-md">保存修改</button>
            </div>
          </div>
        </div>
        
        <!-- 分割线 -->
        <div class="border-t border-gray-200 my-8"></div>
        
        <!-- 账号安全设置 -->
        <h2 class="text-xl font-bold text-gray-800 mb-6">账号安全设置</h2>
        <div class="space-y-6">
          <div class="flex justify-between items-center p-4 bg-gray-50 rounded-md">
            <div>
              <h3 class="font-medium text-gray-800">修改密码</h3>
              <p class="text-sm text-gray-600">定期更换密码可以提高账号安全性</p>
            </div>
            <button class="text-blue-600 font-medium">修改</button>
          </div>
          
          <div class="flex justify-between items-center p-4 bg-gray-50 rounded-md">
            <div>
              <h3 class="font-medium text-gray-800">绑定手机</h3>
              <p class="text-sm text-gray-600">已绑定手机: {{ hidePhone(userForm.phone) }}</p>
            </div>
            <button class="text-blue-600 font-medium">更换</button>
          </div>
          
          <div class="flex justify-between items-center p-4 bg-gray-50 rounded-md">
            <div>
              <h3 class="font-medium text-gray-800">登录设备管理</h3>
              <p class="text-sm text-gray-600">查看并管理已登录的设备</p>
            </div>
            <button class="text-blue-600 font-medium">查看</button>
          </div>
        </div>
      </div>

      <!-- 其他标签内容 -->
      <div v-else-if="activeTab !== 'basic'" class="p-6 text-center py-12">
        <p class="text-gray-600">{{ getTabPlaceholder() }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProfilePage',
  data() {
    return {
      loading: true,
      tabs: [
        { id: 'basic', name: '基本信息' },
        { id: 'resume', name: '简历管理' },
        { id: 'match', name: '匹配结果' },
        { id: 'favorites', name: '收藏企业' },
        { id: 'referral', name: '内推积分' }
      ],
      activeTab: 'basic',
      userForm: {
        name: '',
        gender: 'male',
        email: '',
        phone: '',
        school: '',
        major: '',
        education: 'bachelor',
        graduationYear: '',
        jobIntentions: [],
        introduction: ''
      },
      newJobIntention: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      isLoggedIn: 'isLoggedIn'
    })
  },
  created() {
    // 检查用户是否登录
    if (!this.isLoggedIn) {
      // 如果未登录，重定向到登录页面
      this.$router.push('/login')
      return
    }
    
    // 加载用户信息
    this.initUserForm()
    this.loading = false
  },
  methods: {
    initUserForm() {
      if (this.user) {
        this.userForm = {
          name: this.user.name || '',
          gender: this.user.gender || 'male',
          email: this.user.email || '',
          phone: this.user.phone || '',
          school: this.user.school || '',
          major: this.user.major || '',
          education: this.user.education || 'bachelor',
          graduationYear: this.user.graduationYear || '',
          jobIntentions: [...(this.user.jobIntentions || [])],
          introduction: this.user.introduction || ''
        }
      }
    },
    cancelEdit() {
      this.initUserForm()
    },
    saveProfile() {
      // 实际应用中这里会调用API保存用户信息
      alert('个人信息保存成功！')
    },
    addJobIntention() {
      if (this.newJobIntention.trim()) {
        this.userForm.jobIntentions.push(this.newJobIntention.trim())
        this.newJobIntention = ''
      }
    },
    removeJobIntention(index) {
      this.userForm.jobIntentions.splice(index, 1)
    },
    hidePhone(phone) {
      if (!phone) return ''
      return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    },
    getTabPlaceholder() {
      const tabMap = {
        'resume': '简历管理功能正在开发中...',
        'match': '匹配结果功能正在开发中...',
        'favorites': '收藏企业功能正在开发中...',
        'referral': '内推积分功能正在开发中...'
      }
      return tabMap[this.activeTab] || '功能正在开发中...'
    }
  }
}
</script> 