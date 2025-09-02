# Next.js + React Native 全栈博客网站

这是一个使用 Next.js 作为后端、React Native 作为移动端的全栈博客网站，支持 Markdown 编写和自定义 CSS 样式渲染，数据存储在 Neon PostgreSQL 数据库中。

## 功能特性

- ✅ **Markdown 编辑器**: 支持实时预览的 Markdown 编辑器
- ✅ **自定义样式**: 使用提供的 CSS 样式渲染博客内容
- ✅ **数据库存储**: 使用 Neon PostgreSQL 数据库存储博客数据
- ✅ **响应式设计**: 支持桌面和移动端访问
- ✅ **React Native 客户端**: 原生移动应用体验
- ✅ **API 接口**: RESTful API 支持 CRUD 操作

## 技术栈

### 后端 (Next.js)
- **Next.js 14**: React 全栈框架
- **TypeScript**: 类型安全
- **Prisma**: 数据库 ORM
- **Neon**: PostgreSQL 数据库
- **Marked**: Markdown 解析器

### 前端 (React Native)
- **Expo**: React Native 开发平台
- **React Native Render HTML**: HTML 内容渲染
- **Axios**: HTTP 客户端

## 项目结构

```
blog-rn/
├── src/                    # Next.js 应用
│   ├── app/               # App Router 页面
│   │   ├── api/posts/     # 博客 API 路由
│   │   ├── blog/[slug]/   # 博客详情页
│   │   └── page.tsx       # 首页
│   ├── components/        # React 组件
│   │   ├── BlogPost.tsx   # 博客文章组件
│   │   ├── BlogEditor.tsx # 博客编辑器组件
│   │   └── BlogList.tsx   # 博客列表组件
│   ├── lib/               # 工具库
│   │   ├── db.ts          # 数据库连接
│   │   └── markdown.ts    # Markdown 处理
│   └── styles/            # 样式文件
│       └── blog.css       # 博客自定义样式
├── mobile/                # React Native 应用
│   └── App.tsx           # 移动端主应用
├── prisma/               # 数据库配置
│   └── schema.prisma     # 数据库模型
└── package.json
```

## 快速开始

### 1. 安装依赖

```bash
# 安装 Next.js 依赖
npm install

# 安装 React Native 依赖
cd mobile
npm install
cd ..
```

### 2. 数据库配置

1. 在 [Neon](https://neon.tech) 创建一个新的数据库项目
2. 复制数据库连接字符串
3. 创建 `.env` 文件并添加数据库 URL：

```env
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. 数据库迁移

```bash
# 生成 Prisma 客户端
npx prisma generate

# 推送数据库架构到 Neon
npx prisma db push
```

### 4. 启动开发服务器

```bash
# 启动 Next.js 开发服务器
npm run dev
```

访问 http://localhost:3000 查看网站。

### 5. 启动 React Native 应用

```bash
# 进入移动端目录
cd mobile

# 启动 Expo 开发服务器
npm start

# 或者直接启动特定平台
npm run ios     # iOS 模拟器
npm run android # Android 模拟器
npm run web     # 网页版
```

## 使用说明

### 网页端

1. **创建博客**: 点击"创建博客"按钮，输入标题和 Markdown 内容
2. **预览功能**: 在编辑器中点击"预览"按钮查看渲染效果
3. **发布博客**: 点击"发布博客"按钮将内容保存到数据库
4. **查看博客**: 在博客列表中点击标题查看完整文章

### 移动端

1. **浏览博客**: 启动应用后可以看到所有已发布的博客文章
2. **阅读文章**: 点击博客卡片阅读完整内容
3. **网页跳转**: 点击"在网页中打开"按钮跳转到网页版进行编辑

## Markdown 支持

支持标准 Markdown 语法，包括：

- 标题 (H1-H6)
- 段落和换行
- **粗体** 和 *斜体*
- 列表 (有序和无序)
- 代码块和行内代码
- 链接和图片
- 引用块
- 表格

## 自定义样式

项目使用自定义 CSS 样式 (`src/styles/blog.css`)，包含：

- 渐变背景和卡片设计
- 响应式布局
- 特殊样式类：
  - `.highlight`: 高亮框
  - `.analogy`: 类比说明框
  - `.advantages`: 优点列表
  - `.disadvantages`: 缺点列表
  - `.application-scenarios`: 应用场景
  - `.code-block`: 代码块
  - `.step-list`: 步骤列表

## API 接口

### GET /api/posts
获取所有已发布的博客文章

### POST /api/posts
创建新的博客文章
```json
{
  "title": "文章标题",
  "markdown": "Markdown 内容"
}
```

### GET /api/posts/[slug]
根据 slug 获取特定博客文章

## 部署

### Next.js 部署

推荐使用 Vercel 部署：

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### React Native 部署

使用 Expo 构建：

```bash
cd mobile

# 构建 iOS 应用
eas build --platform ios

# 构建 Android 应用
eas build --platform android
```

## 开发注意事项

1. **数据库连接**: 确保 Neon 数据库 URL 正确配置
2. **API 地址**: 在 React Native 应用中更新 `API_BASE_URL` 为实际部署地址
3. **CORS 配置**: 如果需要跨域访问，在 Next.js 中配置 CORS
4. **环境变量**: 不要将敏感信息提交到版本控制

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
