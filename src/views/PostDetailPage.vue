<template>
  <main class="container mx-auto px-4 py-6">
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-gray-600">加载帖子内容中...</p>
    </div>

    <div v-else-if="post" class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- 左侧帖子内容 -->
      <div class="lg:col-span-3 space-y-6">
        <!-- 帖子主体 -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6">
            <!-- 帖子标题 -->
            <h1 class="text-2xl font-bold text-gray-800 mb-4">{{ post.title }}</h1>
            
            <!-- 作者信息 -->
            <div class="flex justify-between items-center mb-6">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <p class="font-medium text-gray-800">{{ post.author }}</p>
                  <p class="text-sm text-gray-600">{{ post.createTime }}</p>
                </div>
              </div>
              <span class="px-3 py-1 rounded text-sm" :class="getCategoryClass(post.category)">{{ post.category }}</span>
            </div>
            
            <!-- 帖子内容 -->
            <div class="prose max-w-none text-gray-800 mb-6">
              <p>{{ post.content }}</p>
            </div>
            
            <!-- 帖子标签 -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span v-for="(tag, index) in ['校招', '面经', '互联网']" :key="index" class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{{ tag }}</span>
            </div>
            
            <!-- 帖子互动 -->
            <div class="flex justify-between items-center pt-4 border-t border-gray-200">
              <div class="flex space-x-4">
                <button 
                  @click="toggleLike" 
                  class="flex items-center text-gray-500 hover:text-blue-600"
                  :class="{'text-blue-600': isLiked}"
                >
                  <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                  </svg>
                  <span>{{ post.likes }} 点赞</span>
                </button>
                <button 
                  @click="focusCommentInput" 
                  class="flex items-center text-gray-500 hover:text-blue-600"
                >
                  <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                  </svg>
                  <span>{{ post.comments }} 评论</span>
                </button>
                <button class="flex items-center text-gray-500 hover:text-blue-600">
                  <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path>
                  </svg>
                  <span>分享</span>
                </button>
              </div>
              <button 
                @click="toggleCollect" 
                class="flex items-center text-gray-500 hover:text-blue-600"
                :class="{'text-blue-600': isCollected}"
              >
                <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                </svg>
                <span>{{ isCollected ? '已收藏' : '收藏' }}</span>
              </button>
            </div>
          </div>
        </div>
        
        <!-- 评论区 -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 class="text-xl font-bold text-gray-800">评论 ({{ comments.length }})</h2>
          </div>
          
          <!-- 评论输入框 -->
          <div class="p-6 border-b border-gray-200">
            <textarea 
              ref="commentInput"
              v-model="commentText" 
              rows="3" 
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder="写下你的评论..."
            ></textarea>
            <div class="flex justify-between items-center mt-3">
              <div class="flex space-x-2">
                <button class="text-gray-500 hover:text-blue-600">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd"></path>
                  </svg>
                </button>
                <button class="text-gray-500 hover:text-blue-600">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path>
                  </svg>
                </button>
              </div>
              <button 
                @click="addComment" 
                class="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
                :disabled="!commentText.trim()"
              >
                发布评论
              </button>
            </div>
          </div>
          
          <!-- 评论列表 -->
          <div class="divide-y divide-gray-200">
            <div v-if="comments.length === 0" class="p-6 text-center">
              <p class="text-gray-600">暂无评论，快来发表第一条评论吧！</p>
            </div>
            <div v-for="(comment, index) in comments" :key="index" class="p-6">
              <div class="flex">
                <div class="flex-shrink-0 mr-3">
                  <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
                </div>
                <div class="flex-grow">
                  <div class="flex justify-between items-start">
                    <div>
                      <p class="font-medium text-gray-800">{{ comment.author }}</p>
                      <p class="text-sm text-gray-600">{{ comment.time }}</p>
                    </div>
                    <div class="flex items-center text-gray-500 text-sm">
                      <span class="mr-2">{{ comment.floor }}楼</span>
                      <button class="hover:text-blue-600">举报</button>
                    </div>
                  </div>
                  <div class="mt-2 text-gray-800">
                    <p>{{ comment.content }}</p>
                  </div>
                  <div class="mt-3 flex items-center text-sm">
                    <button class="flex items-center text-gray-500 hover:text-blue-600 mr-4">
                      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                      </svg>
                      <span>{{ comment.likes }}</span>
                    </button>
                    <button @click="replyTo(comment, index)" class="text-gray-500 hover:text-blue-600">回复</button>
                  </div>
                  
                  <!-- 回复列表 -->
                  <div v-if="comment.replies && comment.replies.length > 0" class="mt-4 ml-4 pl-4 border-l-2 border-gray-100 space-y-4">
                    <div v-for="(reply, replyIndex) in comment.replies" :key="replyIndex" class="mb-3">
                      <div class="flex justify-between items-start">
                        <div class="flex items-start">
                          <div class="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                          <div>
                            <p class="font-medium text-gray-800">{{ reply.author }} 
                              <span class="font-normal text-gray-600">回复</span> 
                              {{ reply.replyTo }}
                            </p>
                            <p class="text-sm text-gray-600">{{ reply.time }}</p>
                          </div>
                        </div>
                      </div>
                      <div class="mt-2 text-gray-800 ml-10">
                        <p>{{ reply.content }}</p>
                      </div>
                      <div class="mt-2 ml-10 flex items-center text-sm">
                        <button class="flex items-center text-gray-500 hover:text-blue-600 mr-4">
                          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                          </svg>
                          <span>{{ reply.likes }}</span>
                        </button>
                        <button @click="replyToReply(comment, reply, index)" class="text-gray-500 hover:text-blue-600">回复</button>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 回复输入框 -->
                  <div v-if="replyingTo === index" class="mt-4 ml-4">
                    <div class="flex">
                      <input 
                        v-model="replyText" 
                        type="text" 
                        class="flex-grow border border-gray-300 rounded-l-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        :placeholder="`回复 ${replyingToName}...`"
                      />
                      <button 
                        @click="addReply(comment, index)" 
                        class="bg-blue-600 text-white px-3 py-1 rounded-r-md hover:bg-blue-700"
                      >
                        回复
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 右侧侧边栏 -->
      <div class="lg:col-span-1 space-y-6">
        <!-- 作者信息卡片 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="font-bold text-gray-800 mb-4">关于作者</h3>
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
            <div>
              <p class="font-medium text-gray-800">{{ post.author }}</p>
              <p class="text-sm text-gray-600">活跃用户</p>
            </div>
          </div>
          <div class="flex justify-around text-center text-gray-700 mb-4">
            <div>
              <p class="font-medium">12</p>
              <p class="text-xs text-gray-500">帖子</p>
            </div>
            <div>
              <p class="font-medium">256</p>
              <p class="text-xs text-gray-500">获赞</p>
            </div>
            <div>
              <p class="font-medium">48</p>
              <p class="text-xs text-gray-500">粉丝</p>
            </div>
          </div>
          <button class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">关注作者</button>
        </div>
        
        <!-- 相关话题 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="font-bold text-gray-800 mb-4">相关话题</h3>
          <div class="space-y-3">
            <a v-for="(topic, index) in relatedTopics" :key="index" href="#" class="flex items-center text-gray-700 hover:text-blue-600">
              <span class="text-lg mr-2">#</span>
              <span>{{ topic.name }}</span>
              <span class="ml-auto text-sm text-gray-500">{{ topic.count }}</span>
            </a>
          </div>
        </div>
        
        <!-- 相关帖子 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="font-bold text-gray-800 mb-4">相关帖子</h3>
          <div class="space-y-4">
            <a v-for="(relatedPost, index) in relatedPosts" :key="index" href="#" class="block">
              <p class="font-medium text-gray-800 hover:text-blue-600">{{ relatedPost.title }}</p>
              <div class="flex justify-between items-center mt-1 text-sm text-gray-600">
                <span>{{ relatedPost.author }}</span>
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path>
                  </svg>
                  {{ relatedPost.views }}
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="bg-white rounded-lg shadow-md p-6 text-center">
      <p class="text-gray-600">未找到相关帖子</p>
      <router-link to="/community" class="mt-4 inline-block text-blue-600 hover:underline">返回社区首页</router-link>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PostDetailPage',
  data() {
    return {
      loading: true,
      post: null,
      isLiked: false,
      isCollected: false,
      commentText: '',
      replyingTo: null,
      replyingToName: '',
      replyText: '',
      comments: [
        {
          author: '用户A',
          time: '2023-11-10 15:30',
          content: '感谢分享，对我准备面试很有帮助！请问一面的编程题难度大吗？',
          likes: 5,
          floor: 1,
          replies: [
            {
              author: '楼主',
              replyTo: '用户A',
              time: '2023-11-10 16:05',
              content: '一面的编程题难度适中，主要考察基础算法和数据结构，比如链表、树、排序等，建议多刷LeetCode中等难度题目。',
              likes: 3
            }
          ]
        },
        {
          author: '用户B',
          time: '2023-11-10 17:42',
          content: '我最近也收到了这家公司的面试邀请，但我没有项目经验，有什么建议吗？',
          likes: 2,
          floor: 2,
          replies: []
        }
      ],
      relatedTopics: [
        { name: '互联网大厂面经', count: '986帖' },
        { name: '校招', count: '654帖' },
        { name: '前端开发', count: '452帖' },
        { name: '面试技巧', count: '321帖' }
      ],
      relatedPosts: [
        { title: '字节跳动前端面试经验总结', author: '前端小李', views: 325 },
        { title: '如何准备大厂技术面试', author: '面试达人', views: 217 },
        { title: '校招季：简历如何获得HR青睐', author: '求职指南', views: 198 }
      ]
    }
  },
  computed: {
    ...mapGetters({
      posts: 'getPosts'
    })
  },
  created() {
    this.fetchPostData()
  },
  methods: {
    async fetchPostData() {
      this.loading = true
      try {
        // 如果Store中没有帖子数据，则先获取
        if (!this.posts || this.posts.length === 0) {
          await this.$store.dispatch('fetchPosts')
        }
        
        // 根据路由参数找到对应帖子
        const postId = parseInt(this.$route.params.id)
        this.post = this.posts.find(p => p.id === postId)
        
        if (!this.post) {
          console.error('Post not found with ID:', postId)
        }
      } catch (error) {
        console.error('Failed to fetch post data:', error)
      } finally {
        this.loading = false
      }
    },
    getCategoryClass(category) {
      const classMap = {
        '经验分享': 'bg-blue-100 text-blue-800',
        '求职咨询': 'bg-green-100 text-green-800',
        '内推信息': 'bg-yellow-100 text-yellow-800',
        '面试题讨论': 'bg-purple-100 text-purple-800'
      }
      return classMap[category] || 'bg-gray-100 text-gray-800'
    },
    toggleLike() {
      this.isLiked = !this.isLiked
      if (this.isLiked) {
        this.post.likes++
      } else {
        this.post.likes--
      }
    },
    toggleCollect() {
      this.isCollected = !this.isCollected
      // 实际应用中这里会调用API保存收藏状态
      const action = this.isCollected ? '收藏' : '取消收藏'
      alert(`已${action}该帖子`)
    },
    focusCommentInput() {
      this.$refs.commentInput.focus()
    },
    addComment() {
      if (!this.commentText.trim()) return
      
      this.comments.push({
        author: '当前用户',
        time: new Date().toLocaleString(),
        content: this.commentText,
        likes: 0,
        floor: this.comments.length + 1,
        replies: []
      })
      
      this.post.comments++
      this.commentText = ''
    },
    replyTo(comment, index) {
      this.replyingTo = index
      this.replyingToName = comment.author
      this.replyText = ''
    },
    replyToReply(comment, reply, index) {
      this.replyingTo = index
      this.replyingToName = reply.author
      this.replyText = ''
    },
    addReply(comment, index) {
      if (!this.replyText.trim()) return
      
      if (!comment.replies) {
        comment.replies = []
      }
      
      comment.replies.push({
        author: '当前用户',
        replyTo: this.replyingToName,
        time: new Date().toLocaleString(),
        content: this.replyText,
        likes: 0
      })
      
      this.replyingTo = null
      this.replyText = ''
      this.post.comments++
    }
  }
}
</script> 