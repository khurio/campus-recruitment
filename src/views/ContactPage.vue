<template>
  <main class="container mx-auto px-4 py-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">联系我们</h1>
      <p class="text-gray-600">有任何问题或建议？请随时与我们联系</p>
    </div>

    <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <!-- 联系信息和表单区域 -->
      <div class="flex flex-col md:flex-row">
        <!-- 左侧联系信息 -->
        <div class="md:w-1/2 bg-blue-600 text-white p-8">
          <h2 class="text-2xl font-bold mb-6">联系方式</h2>
          
          <div class="space-y-6">
            <div class="flex items-start">
              <svg class="w-6 h-6 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <div>
                <h3 class="font-medium text-white">地址</h3>
                <p class="text-blue-100 mt-1">北京市海淀区中关村软件园23号楼5层</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <svg class="w-6 h-6 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <div>
                <h3 class="font-medium text-white">电话</h3>
                <p class="text-blue-100 mt-1">400-123-4567</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <svg class="w-6 h-6 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <div>
                <h3 class="font-medium text-white">邮箱</h3>
                <p class="text-blue-100 mt-1">contact@xuanjiang.com</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <svg class="w-6 h-6 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <h3 class="font-medium text-white">工作时间</h3>
                <p class="text-blue-100 mt-1">周一至周五: 9:00 - 18:00</p>
                <p class="text-blue-100">周末: 休息</p>
              </div>
            </div>
          </div>
          
          <div class="mt-12">
            <h3 class="font-medium text-white mb-4">关注我们</h3>
            <div class="flex space-x-4">
              <a href="#" class="bg-white text-blue-600 rounded-full p-2 hover:bg-blue-100">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"></path>
                </svg>
              </a>
              <a href="#" class="bg-white text-blue-600 rounded-full p-2 hover:bg-blue-100">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"></path>
                </svg>
              </a>
              <a href="#" class="bg-white text-blue-600 rounded-full p-2 hover:bg-blue-100">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"></path>
                </svg>
              </a>
              <a href="#" class="bg-white text-blue-600 rounded-full p-2 hover:bg-blue-100">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.44,3.06H5.56A2.507,2.507,0,0,0,3.06,5.56V18.44A2.507,2.507,0,0,0,5.56,20.94H18.44A2.5,2.5,0,0,0,20.94,18.44V5.56A2.5,2.5,0,0,0,18.44,3.06Zm1.25,15.38a1.25,1.25,0,0,1-1.25,1.25H5.56a1.25,1.25,0,0,1-1.25-1.25V5.56A1.25,1.25,0,0,1,5.56,4.31H18.44a1.25,1.25,0,0,1,1.25,1.25ZM8,9.81A1.94,1.94,0,1,0,6.06,7.88,1.94,1.94,0,0,0,8,9.81ZM7.19,18H8.94V10.75H7.19ZM18,18h1.75V13.56c0-2.32-.5-4.06-3.19-4.06a2.8,2.8,0,0,0-2.5,1.38h0V10H12.32v8h1.75V14c0-.75.16-1.44,1.12-1.44s1.25.76,1.25,1.49V18Z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <!-- 右侧联系表单 -->
        <div class="md:w-1/2 p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">发送消息</h2>
          
          <form>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">姓名 *</label>
                <input type="text" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">邮箱 *</label>
                <input type="email" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">电话</label>
                <input type="tel" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">主题</label>
                <select class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>产品咨询</option>
                  <option>技术支持</option>
                  <option>合作洽谈</option>
                  <option>意见反馈</option>
                  <option>其他</option>
                </select>
              </div>
            </div>
            
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-1">消息内容 *</label>
              <textarea rows="6" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required></textarea>
            </div>
            
            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">发送消息</button>
          </form>
        </div>
      </div>
    </div>

    <!-- 地图区域 -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-6 bg-gray-50 border-b border-gray-200">
        <h2 class="text-xl font-bold text-gray-800">我们的位置</h2>
      </div>
      <div class="h-96 bg-gray-200 flex items-center justify-center">
        <div class="text-center">
          <div class="text-gray-500 mb-2">地图加载中...</div>
          <div class="text-sm text-gray-500">此处将显示公司地址的地图</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'ContactPage'
}
</script> 