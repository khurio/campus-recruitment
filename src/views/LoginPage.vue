<template>
  <main class="container mx-auto px-4 py-12">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div class="py-4 px-6 bg-blue-600 text-white text-center">
        <h2 class="text-2xl font-bold">{{ isLoginMode ? '登录' : '注册' }}</h2>
      </div>
      <div class="p-6">
        <!-- 登录表单 -->
        <div v-if="isLoginMode">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">用户名/邮箱</label>
            <input 
              type="text" 
              v-model="loginForm.username" 
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入用户名或邮箱"
            >
          </div>
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input 
              type="password" 
              v-model="loginForm.password" 
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入密码"
            >
            <div class="mt-1 text-right">
              <a href="#" class="text-sm text-blue-600 hover:underline">忘记密码?</a>
            </div>
          </div>
          <button 
            @click="handleLogin" 
            class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            :disabled="loading"
          >
            {{ loading ? '登录中...' : '登录' }}
          </button>
        </div>
        
        <!-- 注册表单 -->
        <div v-else>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <input 
              type="text" 
              v-model="registerForm.username" 
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入用户名"
            >
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
            <input 
              type="email" 
              v-model="registerForm.email" 
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入邮箱"
            >
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">手机号码</label>
            <input 
              type="tel" 
              v-model="registerForm.phone" 
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入手机号码"
            >
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input 
              type="password" 
              v-model="registerForm.password" 
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入密码"
            >
          </div>
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">确认密码</label>
            <input 
              type="password" 
              v-model="registerForm.confirmPassword" 
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请再次输入密码"
            >
          </div>
          <button 
            @click="handleRegister" 
            class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            :disabled="loading"
          >
            {{ loading ? '注册中...' : '注册' }}
          </button>
        </div>
        
        <!-- 切换登录/注册 -->
        <div class="mt-4 text-center">
          <p class="text-gray-600">
            {{ isLoginMode ? '还没有账号?' : '已有账号?' }}
            <button @click="toggleMode" class="text-blue-600 hover:underline">
              {{ isLoginMode ? '立即注册' : '立即登录' }}
            </button>
          </p>
        </div>
        
        <!-- 第三方登录 -->
        <div class="mt-8">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">或使用以下方式</span>
            </div>
          </div>
          
          <div class="mt-4 flex justify-center gap-4">
            <button class="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-50">
              <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,5C13.66,5 15,6.34 15,8C15,9.66 13.66,11 12,11C10.34,11 9,9.66 9,8C9,6.34 10.34,5 12,5M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2Z" />
              </svg>
            </button>
            <button class="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-50">
              <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.87,2.83L5.29,6.41L4.58,5.7C3.8,4.92 2.66,4.92 1.88,5.7C1.1,6.48 1.1,7.62 1.88,8.4L4.47,10.93C5.24,11.71 6.38,11.71 7.15,10.93L8.87,9.22L12.46,12.81L11.75,13.54C11.75,13.54 11.75,13.55 11.75,13.55C10.97,14.33 10.97,15.47 11.75,16.26C12.53,17.04 13.67,17.04 14.46,16.26L17.05,13.67C17.83,12.9 17.83,11.76 17.05,10.98C16.28,10.19 15.14,10.19 14.36,10.98L13.65,11.69L10.06,8.1L11.77,6.39L11.78,6.38C12.55,5.6 12.54,4.47 11.77,3.69C10.98,2.91 9.85,2.91 9.07,3.69L8.87,2.83Z" />
              </svg>
            </button>
            <button class="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-50">
              <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      isLoginMode: true,
      loading: false,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    toggleMode() {
      this.isLoginMode = !this.isLoginMode
    },
    async handleLogin() {
      // 简单的表单验证
      if (!this.loginForm.username || !this.loginForm.password) {
        alert('请填写用户名和密码')
        return
      }
      
      try {
        this.loading = true
        // 调用Vuex的login action
        await this.$store.dispatch('login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        
        // 登录成功，跳转到首页
        this.$router.push('/')
      } catch (error) {
        console.error('Login failed:', error)
        alert('登录失败，请检查用户名和密码')
      } finally {
        this.loading = false
      }
    },
    handleRegister() {
      // 简单的表单验证
      if (!this.registerForm.username || !this.registerForm.email || !this.registerForm.password) {
        alert('请填写必要的注册信息')
        return
      }
      
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        alert('两次输入的密码不一致')
        return
      }
      
      // 实际应用中这里会调用API注册用户
      alert('注册成功！请使用新账号登录')
      this.isLoginMode = true
    }
  }
}
</script> 