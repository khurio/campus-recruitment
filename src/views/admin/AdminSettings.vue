<template>
  <div>
    <!-- 选项卡导航 -->
    <div class="mb-6">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <button 
            @click="activeTab = 'basic'" 
            class="py-4 px-1 border-b-2 font-medium text-sm"
            :class="{ 
              'border-blue-500 text-blue-600': activeTab === 'basic',
              'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': activeTab !== 'basic'
            }"
          >
            基本设置
          </button>
          <button 
            @click="activeTab = 'permission'" 
            class="py-4 px-1 border-b-2 font-medium text-sm"
            :class="{ 
              'border-blue-500 text-blue-600': activeTab === 'permission',
              'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': activeTab !== 'permission'
            }"
          >
            权限设置
          </button>
          <button 
            @click="activeTab = 'notification'" 
            class="py-4 px-1 border-b-2 font-medium text-sm"
            :class="{ 
              'border-blue-500 text-blue-600': activeTab === 'notification',
              'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': activeTab !== 'notification'
            }"
          >
            通知设置
          </button>
          <button 
            @click="activeTab = 'security'" 
            class="py-4 px-1 border-b-2 font-medium text-sm"
            :class="{ 
              'border-blue-500 text-blue-600': activeTab === 'security',
              'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': activeTab !== 'security'
            }"
          >
            安全设置
          </button>
        </nav>
      </div>
    </div>
    
    <!-- 设置内容区域 -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <!-- 基本设置 -->
      <div v-if="activeTab === 'basic'">
        <h2 class="text-lg font-semibold text-gray-900 mb-6">基本设置</h2>
        
        <div class="max-w-3xl space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">平台名称</label>
            <input 
              type="text" 
              v-model="settings.platformName"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">平台描述</label>
            <textarea 
              v-model="settings.platformDescription" 
              rows="3"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">联系邮箱</label>
            <input 
              type="email" 
              v-model="settings.contactEmail"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">客服电话</label>
            <input 
              type="tel" 
              v-model="settings.contactPhone"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ICP备案号</label>
            <input 
              type="text" 
              v-model="settings.icpNumber"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">版权信息</label>
            <input 
              type="text" 
              v-model="settings.copyright"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
          </div>
        </div>
      </div>
      
      <!-- 权限设置 -->
      <div v-if="activeTab === 'permission'">
        <h2 class="text-lg font-semibold text-gray-900 mb-6">权限设置</h2>
        
        <div class="max-w-3xl">
          <h3 class="text-md font-medium text-gray-800 mb-4">角色权限管理</h3>
          
          <div class="mb-6">
            <div class="bg-gray-50 p-4 rounded-md mb-4">
              <h4 class="text-sm font-semibold text-gray-700 mb-3">学生用户权限</h4>
              <div class="space-y-2">
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="student-forum" 
                    v-model="permissions.student.forum"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="student-forum" class="ml-2 block text-sm text-gray-700">论坛发帖权限</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="student-comment" 
                    v-model="permissions.student.comment"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="student-comment" class="ml-2 block text-sm text-gray-700">评论权限</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="student-resume" 
                    v-model="permissions.student.resume"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="student-resume" class="ml-2 block text-sm text-gray-700">简历上传权限</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="student-apply" 
                    v-model="permissions.student.apply"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="student-apply" class="ml-2 block text-sm text-gray-700">职位申请权限</label>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-md mb-4">
              <h4 class="text-sm font-semibold text-gray-700 mb-3">企业用户权限</h4>
              <div class="space-y-2">
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="enterprise-job" 
                    v-model="permissions.enterprise.job"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="enterprise-job" class="ml-2 block text-sm text-gray-700">发布职位权限</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="enterprise-event" 
                    v-model="permissions.enterprise.event"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="enterprise-event" class="ml-2 block text-sm text-gray-700">创建宣讲会权限</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="enterprise-view-resume" 
                    v-model="permissions.enterprise.viewResume"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="enterprise-view-resume" class="ml-2 block text-sm text-gray-700">查看简历权限</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="enterprise-message" 
                    v-model="permissions.enterprise.message"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="enterprise-message" class="ml-2 block text-sm text-gray-700">发送消息权限</label>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-md">
              <h4 class="text-sm font-semibold text-gray-700 mb-3">管理员权限设置</h4>
              <div class="space-y-2">
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="admin-super" 
                    v-model="permissions.admin.super"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="admin-super" class="ml-2 block text-sm text-gray-700">超级管理员权限</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="admin-content" 
                    v-model="permissions.admin.content"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="admin-content" class="ml-2 block text-sm text-gray-700">内容管理权限</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="admin-user" 
                    v-model="permissions.admin.user"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="admin-user" class="ml-2 block text-sm text-gray-700">用户管理权限</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="admin-system" 
                    v-model="permissions.admin.system"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="admin-system" class="ml-2 block text-sm text-gray-700">系统设置权限</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 通知设置 -->
      <div v-if="activeTab === 'notification'">
        <h2 class="text-lg font-semibold text-gray-900 mb-6">通知设置</h2>
        
        <div class="max-w-3xl">
          <h3 class="text-md font-medium text-gray-800 mb-4">邮件通知</h3>
          
          <div class="space-y-4 mb-8">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-700">新用户注册通知</h4>
                <p class="text-xs text-gray-500 mt-1">当新用户注册成功时发送欢迎邮件</p>
              </div>
              <div class="flex items-center">
                <label class="switch">
                  <input type="checkbox" v-model="notifications.email.userRegister">
                  <span class="slider"></span>
                </label>
              </div>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-700">简历投递通知</h4>
                <p class="text-xs text-gray-500 mt-1">当学生投递简历时通知企业</p>
              </div>
              <div class="flex items-center">
                <label class="switch">
                  <input type="checkbox" v-model="notifications.email.resumeSubmit">
                  <span class="slider"></span>
                </label>
              </div>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-700">宣讲会提醒</h4>
                <p class="text-xs text-gray-500 mt-1">在宣讲会开始前发送提醒邮件</p>
              </div>
              <div class="flex items-center">
                <label class="switch">
                  <input type="checkbox" v-model="notifications.email.eventReminder">
                  <span class="slider"></span>
                </label>
              </div>
            </div>
          </div>
          
          <h3 class="text-md font-medium text-gray-800 mb-4">短信通知</h3>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-700">账号安全通知</h4>
                <p class="text-xs text-gray-500 mt-1">当账号有异常登录时发送短信提醒</p>
              </div>
              <div class="flex items-center">
                <label class="switch">
                  <input type="checkbox" v-model="notifications.sms.securityAlert">
                  <span class="slider"></span>
                </label>
              </div>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-700">面试通知</h4>
                <p class="text-xs text-gray-500 mt-1">当企业安排面试时发送短信通知</p>
              </div>
              <div class="flex items-center">
                <label class="switch">
                  <input type="checkbox" v-model="notifications.sms.interview">
                  <span class="slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 安全设置 -->
      <div v-if="activeTab === 'security'">
        <h2 class="text-lg font-semibold text-gray-900 mb-6">安全设置</h2>
        
        <div class="max-w-3xl">
          <div class="space-y-6">
            <div>
              <h3 class="text-md font-medium text-gray-800 mb-2">密码策略</h3>
              <div class="bg-gray-50 p-4 rounded-md space-y-3">
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="password-length" 
                    v-model="security.password.minLength.enabled"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="password-length" class="ml-2 block text-sm text-gray-700">最小密码长度</label>
                  <div class="ml-4" v-if="security.password.minLength.enabled">
                    <select 
                      v-model="security.password.minLength.value"
                      class="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="6">6 位</option>
                      <option value="8">8 位</option>
                      <option value="10">10 位</option>
                      <option value="12">12 位</option>
                    </select>
                  </div>
                </div>
                
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="password-complexity" 
                    v-model="security.password.complexity"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="password-complexity" class="ml-2 block text-sm text-gray-700">要求包含数字、字母和特殊字符</label>
                </div>
                
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="password-expiry" 
                    v-model="security.password.expiryDays.enabled"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="password-expiry" class="ml-2 block text-sm text-gray-700">密码过期策略</label>
                  <div class="ml-4" v-if="security.password.expiryDays.enabled">
                    <select 
                      v-model="security.password.expiryDays.value"
                      class="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="30">30 天</option>
                      <option value="60">60 天</option>
                      <option value="90">90 天</option>
                      <option value="180">180 天</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="text-md font-medium text-gray-800 mb-2">登录安全</h3>
              <div class="bg-gray-50 p-4 rounded-md space-y-3">
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="login-captcha" 
                    v-model="security.login.captcha"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="login-captcha" class="ml-2 block text-sm text-gray-700">登录验证码</label>
                </div>
                
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="login-attempts" 
                    v-model="security.login.maxAttempts.enabled"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="login-attempts" class="ml-2 block text-sm text-gray-700">登录失败锁定</label>
                  <div class="ml-4" v-if="security.login.maxAttempts.enabled">
                    <select 
                      v-model="security.login.maxAttempts.value"
                      class="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="3">3 次失败后锁定</option>
                      <option value="5">5 次失败后锁定</option>
                      <option value="10">10 次失败后锁定</option>
                    </select>
                  </div>
                </div>
                
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="login-ip" 
                    v-model="security.login.ipRestriction"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="login-ip" class="ml-2 block text-sm text-gray-700">异地登录检测</label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="text-md font-medium text-gray-800 mb-2">数据备份</h3>
              <div class="bg-gray-50 p-4 rounded-md space-y-3">
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="backup-auto" 
                    v-model="security.backup.auto"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="backup-auto" class="ml-2 block text-sm text-gray-700">自动备份</label>
                </div>
                
                <div class="flex items-center">
                  <label for="backup-frequency" class="block text-sm text-gray-700">备份频率</label>
                  <div class="ml-4">
                    <select 
                      id="backup-frequency"
                      v-model="security.backup.frequency"
                      class="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="daily">每日</option>
                      <option value="weekly">每周</option>
                      <option value="monthly">每月</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 保存按钮 -->
      <div class="mt-8 flex justify-end">
        <button 
          @click="saveSettings" 
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          保存设置
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminSettings',
  data() {
    return {
      activeTab: 'basic',
      
      // 基本设置
      settings: {
        platformName: '校招直通车',
        platformDescription: '一站式校园招聘平台，连接学生与企业',
        contactEmail: 'contact@xiaozhaotongche.com',
        contactPhone: '400-123-4567',
        icpNumber: '京ICP备12345678号',
        copyright: '© 2023 校招直通车 版权所有'
      },
      
      // 权限设置
      permissions: {
        student: {
          forum: true,
          comment: true,
          resume: true,
          apply: true
        },
        enterprise: {
          job: true,
          event: true,
          viewResume: true,
          message: true
        },
        admin: {
          super: true,
          content: true,
          user: true,
          system: true
        }
      },
      
      // 通知设置
      notifications: {
        email: {
          userRegister: true,
          resumeSubmit: true,
          eventReminder: true
        },
        sms: {
          securityAlert: true,
          interview: true
        }
      },
      
      // 安全设置
      security: {
        password: {
          minLength: {
            enabled: true,
            value: 8
          },
          complexity: true,
          expiryDays: {
            enabled: false,
            value: 90
          }
        },
        login: {
          captcha: true,
          maxAttempts: {
            enabled: true,
            value: 5
          },
          ipRestriction: true
        },
        backup: {
          auto: true,
          frequency: 'daily'
        }
      }
    }
  },
  methods: {
    saveSettings() {
      // 保存设置到服务器的逻辑
      alert('设置已保存');
    }
  }
}
</script>

<style scoped>
/* 开关样式 */
.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #3b82f6;
}

input:focus + .slider {
  box-shadow: 0 0 1px #3b82f6;
}

input:checked + .slider:before {
  transform: translateX(24px);
}
</style> 