<template>
  <main class="container mx-auto px-4 py-6">
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <!-- 头部横幅 -->
      <div class="bg-blue-600 py-12 px-6 text-white text-center">
        <h1 class="text-3xl font-bold mb-2">关于校招直通车</h1>
        <p class="text-xl">连接企业与求职者的桥梁，让校招更高效</p>
      </div>
      
      <!-- 主要内容 -->
      <div class="p-6">
        <!-- 平台简介 -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">平台简介</h2>
          <div class="prose max-w-none text-gray-700">
            <p class="mb-4">校招直通车是一个专注于校园招聘的综合服务平台，旨在解决传统招聘流程中的信息不对称、互动性差、效率低等问题，为企业和求职者搭建高效、智能的沟通桥梁。</p>
            <p class="mb-4">我们平台融合了企业展示、职位匹配、简历优化、社区交流等多种功能，通过数据分析和人工智能技术，提供个性化的求职推荐和简历分析服务，帮助求职者找到最适合的职位，也帮助企业发现最匹配的人才。</p>
            <p>无论是企业还是求职者，校招直通车都能为您提供全方位的支持，让招聘和求职过程更加高效、精准、便捷。</p>
          </div>
        </section>
        
        <!-- 我们的使命 -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">我们的使命</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-blue-50 p-6 rounded-lg">
              <div class="text-blue-600 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-12 w-12">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">提升效率</h3>
              <p class="text-gray-700">简化宣讲流程，减少信息获取成本，让企业和求职者都能更高效地完成招聘和求职</p>
            </div>
            <div class="bg-blue-50 p-6 rounded-lg">
              <div class="text-blue-600 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-12 w-12">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">精准匹配</h3>
              <p class="text-gray-700">通过智能算法，为求职者推荐最匹配的职位，为企业筛选最适合的人才</p>
            </div>
            <div class="bg-blue-50 p-6 rounded-lg">
              <div class="text-blue-600 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-12 w-12">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">个性化服务</h3>
              <p class="text-gray-700">根据用户需求和特点，提供定制化的简历优化、职位推荐和求职指导</p>
            </div>
          </div>
        </section>
        
        <!-- 团队介绍 -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">我们的团队</h2>
          <p class="text-gray-700 mb-6">校招直通车由一群热爱技术、关注教育和就业的年轻人创建。我们的团队成员来自顶尖高校和知名企业，拥有丰富的校园招聘和互联网产品经验。</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div class="text-center">
              <div class="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-3"></div>
              <h3 class="font-bold text-gray-800">张三</h3>
              <p class="text-gray-600 text-sm">创始人 & CEO</p>
            </div>
            <div class="text-center">
              <div class="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-3"></div>
              <h3 class="font-bold text-gray-800">李四</h3>
              <p class="text-gray-600 text-sm">技术负责人</p>
            </div>
            <div class="text-center">
              <div class="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-3"></div>
              <h3 class="font-bold text-gray-800">王五</h3>
              <p class="text-gray-600 text-sm">产品负责人</p>
            </div>
            <div class="text-center">
              <div class="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-3"></div>
              <h3 class="font-bold text-gray-800">赵六</h3>
              <p class="text-gray-600 text-sm">运营负责人</p>
            </div>
          </div>
        </section>
        
        <!-- 发展历程 -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">发展历程</h2>
          <div class="relative border-l-2 border-blue-600 pl-8 ml-4">
            <div class="mb-8 relative">
              <div class="absolute -left-12 mt-1.5 w-6 h-6 rounded-full border-2 border-blue-600 bg-white"></div>
              <h3 class="text-xl font-bold text-gray-800 mb-1">2021年9月</h3>
              <p class="text-gray-600 text-sm mb-2">项目启动</p>
              <p class="text-gray-700">团队组建，开始市场调研和产品规划</p>
            </div>
            <div class="mb-8 relative">
              <div class="absolute -left-12 mt-1.5 w-6 h-6 rounded-full border-2 border-blue-600 bg-white"></div>
              <h3 class="text-xl font-bold text-gray-800 mb-1">2022年3月</h3>
              <p class="text-gray-600 text-sm mb-2">产品上线</p>
              <p class="text-gray-700">校招直通车1.0版本正式上线，提供基础的校园招聘信息展示和简历投递功能</p>
            </div>
            <div class="mb-8 relative">
              <div class="absolute -left-12 mt-1.5 w-6 h-6 rounded-full border-2 border-blue-600 bg-white"></div>
              <h3 class="text-xl font-bold text-gray-800 mb-1">2022年9月</h3>
              <p class="text-gray-600 text-sm mb-2">业务扩展</p>
              <p class="text-gray-700">平台用户突破10万，覆盖全国50多所高校，合作企业超过200家</p>
            </div>
            <div class="relative">
              <div class="absolute -left-12 mt-1.5 w-6 h-6 rounded-full border-2 border-blue-600 bg-white"></div>
              <h3 class="text-xl font-bold text-gray-800 mb-1">2023年6月</h3>
              <p class="text-gray-600 text-sm mb-2">功能升级</p>
              <p class="text-gray-700">推出2.0版本，新增AI简历优化、智能职位匹配等核心功能，用户体验大幅提升</p>
            </div>
          </div>
        </section>
        
        <!-- 联系我们 -->
        <section>
          <h2 class="text-2xl font-bold text-gray-800 mb-4">联系我们</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p class="text-gray-700 mb-4">如果您有任何问题、建议或合作意向，欢迎通过以下方式联系我们：</p>
              <ul class="space-y-3">
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>contact@xiaozhaotongche.com</span>
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span>400-123-4567</span>
                </li>
                <li class="flex items-start text-gray-700">
                  <svg class="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>北京市海淀区中关村软件园23号楼5层</span>
                </li>
              </ul>
            </div>
            <div class="bg-gray-100 p-6 rounded-lg">
              <h3 class="text-lg font-bold text-gray-800 mb-4">留言反馈</h3>
              <form>
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                  <input type="text" class="w-full border border-gray-300 rounded-md px-3 py-2">
                </div>
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                  <input type="email" class="w-full border border-gray-300 rounded-md px-3 py-2">
                </div>
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1">留言内容</label>
                  <textarea rows="4" class="w-full border border-gray-300 rounded-md px-3 py-2"></textarea>
                </div>
                <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">提交</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script> 