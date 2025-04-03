# 校招直通车

校招直通车 - 连接企业与求职者的桥梁

## 项目简介

校招直通车是一个为高校学生和招聘企业搭建的桥梁平台，旨在提供一站式的校园招聘解决方案。平台集成了企业宣讲、在线答疑、简历投递、职位匹配等功能，帮助学生更高效地找到合适的工作机会，也使企业能够更便捷地招募到优秀的人才。

## 主要功能

- **首页**：展示平台概况和最新招聘信息
- **企业页**：企业可以发布招聘信息和宣讲会安排
- **用户管理**：用户注册、登录和个人信息管理
- **简历管理**：学生可以创建和管理自己的简历
- **职位匹配**：基于学生技能和企业需求的智能匹配
- **社区交流**：用户可以分享求职经验和交流
- **后台管理**：系统管理员可以管理平台内容和用户

## 技术栈

- 前端：Vue.js 3、Vue Router、Vuex、Tailwind CSS
- 构建工具：Vite
- 其他依赖：Axios、Dayjs

## 安装和运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 贡献指南

欢迎对本项目进行贡献！如果您发现任何问题或有改进建议，请创建 Issue 或提交 Pull Request。

## 许可证

本项目采用 MIT 许可证进行授权。

## 项目介绍

校招直通车是一个连接企业与求职者的平台，旨在提供高效、便捷的校园招聘服务。

## 部署指南

### 本地开发
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 生产环境部署

#### 构建项目
```bash
npm run build
```

#### 部署到Cloudflare Workers
1. 安装Wrangler CLI
```bash
npm install -g wrangler
```

2. 登录到Cloudflare账号
```bash
wrangler login
```

3. 部署静态资产
```bash
wrangler deploy --assets=./dist
```

或者使用配置文件部署:
```bash
# 确保wrangler.toml文件存在后
wrangler deploy
```

## 管理后台
管理后台路径: `/admin/dashboard`
默认管理员账号: admin
默认密码: admin123

## 特性
- 企业宣讲信息展示
- 在线互动问答
- 简历投递与管理
- 企业信息展示
- 后台管理系统 