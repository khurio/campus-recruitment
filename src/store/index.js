import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    isLoggedIn: false,
    enterprises: [],
    upcomingTalks: [],
    posts: [],
    hotTopics: []
  },
  getters: {
    getUser: state => state.user,
    isLoggedIn: state => state.isLoggedIn,
    getEnterprises: state => state.enterprises,
    getUpcomingTalks: state => state.upcomingTalks,
    getPosts: state => state.posts,
    getHotTopics: state => state.hotTopics
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      state.isLoggedIn = !!user
    },
    setEnterprises(state, enterprises) {
      state.enterprises = enterprises
    },
    setUpcomingTalks(state, talks) {
      state.upcomingTalks = talks
    },
    setPosts(state, posts) {
      state.posts = posts
    },
    setHotTopics(state, topics) {
      state.hotTopics = topics
    }
  },
  actions: {
    // 模拟登录
    login({ commit }, { username, password }) {
      // 实际应用中这里会调用API
      return new Promise((resolve) => {
        setTimeout(() => {
          // 模拟用户数据
          const user = {
            id: 1,
            name: '张三',
            avatar: null,
            email: 'zhangsan@example.com',
            phone: '13812345678',
            school: '北京大学',
            major: '计算机科学与技术',
            education: '本科',
            graduationYear: '2024',
            jobIntentions: ['前端开发', '产品经理'],
            introduction: '计算机科学与技术专业应届毕业生，熟悉前端开发技术栈，曾参与多个Web项目开发。具有良好的学习能力和团队协作精神，追求用技术创造价值。'
          }
          commit('setUser', user)
          resolve(user)
        }, 1000)
      })
    },
    // 登出
    logout({ commit }) {
      commit('setUser', null)
    },
    // 获取企业列表
    fetchEnterprises({ commit }) {
      // 模拟企业数据
      return new Promise((resolve) => {
        setTimeout(() => {
          const enterprises = [
            {
              id: 1,
              name: '腾讯科技有限公司',
              logo: null,
              industry: '互联网/IT',
              scale: '大型企业',
              talkTime: '2023-11-15 14:00',
              description: '腾讯是中国领先的互联网增值服务提供商，主要在中国提供社交网络、音乐、网络游戏、电子商务和移动支付等服务。公司通过其多元化的服务组合，力求满足中国互联网用户不断变化的需求。',
              positions: ['产品经理', '前端开发', '后端开发', '算法工程师', '测试工程师'],
              location: '线上宣讲'
            },
            {
              id: 2,
              name: '阿里巴巴集团',
              logo: null,
              industry: '互联网/电商',
              scale: '大型企业',
              talkTime: '2023-11-18 10:00',
              description: '阿里巴巴集团是全球领先的电子商务公司，致力于帮助中小企业拓展业务。通过旗下的淘宝、天猫等电商平台，以及蚂蚁金服等金融科技服务，阿里巴巴正在改变人们的生活和工作方式。',
              positions: ['Java开发', '数据分析', '产品运营', '用户体验设计'],
              location: '北京总部'
            },
            {
              id: 3,
              name: '华为技术有限公司',
              logo: null,
              industry: '通信/科技',
              scale: '大型企业',
              talkTime: '2023-11-20 15:30',
              description: '华为是全球领先的ICT（信息与通信）基础设施和智能终端提供商，致力于把数字世界带入每个人、每个家庭、每个组织，构建万物互联的智能世界。',
              positions: ['软件工程师', '硬件工程师', '研发工程师', '算法专家'],
              location: '深圳南山区'
            }
          ]
          commit('setEnterprises', enterprises)
          commit('setUpcomingTalks', enterprises) // 简化，实际可能是过滤后的数据
          resolve(enterprises)
        }, 1000)
      })
    },
    // 获取社区帖子
    fetchPosts({ commit }) {
      // 模拟帖子数据
      return new Promise((resolve) => {
        setTimeout(() => {
          const posts = [
            {
              id: 1,
              title: '腾讯产品经理面试经验分享',
              author: '用户名',
              avatar: null,
              category: '经验分享',
              createTime: '2023-11-10 14:32',
              content: '上周参加了腾讯产品经理的面试，这里分享一下面试过程和一些常见问题。整个面试分为三轮，第一轮主要是自我介绍和项目经验，第二轮是产品设计和用户分析，第三轮是HR面...',
              views: 356,
              comments: 42,
              likes: 78
            },
            {
              id: 2,
              title: '拿到阿里和字节的offer，该如何选择？',
              author: '程序员小李',
              avatar: null,
              category: '求职咨询',
              createTime: '2023-11-09 10:15',
              content: '最近收到了阿里和字节的offer，岗位都是后端开发工程师。阿里薪资稍低但团队很稳定，字节薪资高但据说加班比较多。作为应届生，更看重哪个因素比较好？有没有在这两家公司工作过的前辈给点意见？',
              views: 482,
              comments: 65,
              likes: 103
            },
            {
              id: 3,
              title: '华为研发岗前端面试题分享',
              author: '前端小王',
              avatar: null,
              category: '面试题讨论',
              createTime: '2023-11-08 16:40',
              content: '昨天参加了华为的前端面试，记录一下几道比较有代表性的技术题：\n1. 讲一下盒模型和BFC\n2. Promise的原理和实现\n3. Vue的响应式原理\n4. 如何优化前端性能\n大家有答案或者思路可以在评论区讨论~',
              views: 275,
              comments: 38,
              likes: 86
            }
          ]
          commit('setPosts', posts)
          resolve(posts)
        }, 1000)
      })
    },
    // 获取热门话题
    fetchHotTopics({ commit }) {
      // 模拟热门话题数据
      return new Promise((resolve) => {
        setTimeout(() => {
          const topics = [
            { id: 1, name: '应届生求职', count: 1200 },
            { id: 2, name: '互联网大厂面经', count: 986 },
            { id: 3, name: '前端开发', count: 756 },
            { id: 4, name: '简历优化', count: 682 },
            { id: 5, name: '实习经验', count: 521 }
          ]
          commit('setHotTopics', topics)
          resolve(topics)
        }, 1000)
      })
    }
  },
  modules: {
  }
}) 