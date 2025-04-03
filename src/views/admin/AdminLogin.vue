<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <h1 class="text-3xl font-bold text-blue-600">校招直通车</h1>
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        校招直通车管理系统
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        请输入管理员账号和密码
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">
              用户名
            </label>
            <div class="mt-1">
              <input 
                id="username" 
                v-model="loginForm.username" 
                name="username" 
                type="text" 
                required 
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              密码
            </label>
            <div class="mt-1">
              <input 
                id="password" 
                v-model="loginForm.password" 
                name="password" 
                type="password" 
                required 
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div v-if="showCaptcha" class="space-y-1">
            <label for="captcha" class="block text-sm font-medium text-gray-700">
              验证码
            </label>
            <div class="flex items-center gap-4">
              <input 
                id="captcha" 
                v-model="loginForm.captcha" 
                name="captcha" 
                type="text" 
                required 
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <div 
                class="h-10 w-24 bg-gray-200 flex items-center justify-center text-sm font-medium select-none cursor-pointer"
                @click="refreshCaptcha"
              >
                {{ captchaText }}
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input 
                id="remember-me" 
                v-model="loginForm.rememberMe" 
                name="remember-me" 
                type="checkbox" 
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                记住我
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                忘记密码?
              </a>
            </div>
          </div>
          
          <div v-if="loginError" class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">
                  {{ loginErrorMessage }}
                </h3>
              </div>
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? '登录中...' : '登录' }}
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                安全提示
              </span>
            </div>
          </div>

          <div class="mt-6 text-sm text-center text-gray-500">
            <p>管理员登录IP将被记录</p>
            <p class="mt-1">请勿在公共场所使用管理员账号登录</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminLogin',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        captcha: '',
        rememberMe: false
      },
      loading: false,
      loginError: false,
      loginErrorMessage: '',
      showCaptcha: false,
      captchaText: 'ABCD'
    }
  },
  methods: {
    handleLogin() {
      // 重置错误状态
      this.loginError = false;
      this.loginErrorMessage = '';
      
      // 表单验证
      if (!this.loginForm.username.trim()) {
        this.loginError = true;
        this.loginErrorMessage = '请输入用户名';
        return;
      }
      
      if (!this.loginForm.password) {
        this.loginError = true;
        this.loginErrorMessage = '请输入密码';
        return;
      }
      
      if (this.showCaptcha && !this.loginForm.captcha) {
        this.loginError = true;
        this.loginErrorMessage = '请输入验证码';
        return;
      }
      
      // 模拟登录过程
      this.loading = true;
      
      setTimeout(() => {
        // 这里应该是实际的登录逻辑
        // 模拟成功登录
        if (this.loginForm.username === 'admin' && this.loginForm.password === 'admin123') {
          // 存储登录状态
          localStorage.setItem('adminLoggedIn', 'true');
          localStorage.setItem('adminUsername', this.loginForm.username);
          if (this.loginForm.rememberMe) {
            localStorage.setItem('adminRememberMe', 'true');
          }
          // 登录成功后跳转到管理后台首页
          this.$router.push('/admin/dashboard');
        } else {
          // 登录失败处理
          this.loginError = true;
          this.loginErrorMessage = '用户名或密码错误';
          this.showCaptcha = true;
          this.refreshCaptcha();
        }
        
        this.loading = false;
      }, 1500);
    },
    
    refreshCaptcha() {
      // 生成随机验证码
      const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      let captcha = '';
      for (let i = 0; i < 4; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      this.captchaText = captcha;
    }
  },
  mounted() {
    // 初始化时随机决定是否显示验证码
    this.showCaptcha = Math.random() > 0.5;
    if (this.showCaptcha) {
      this.refreshCaptcha();
    }
  }
}
</script> 