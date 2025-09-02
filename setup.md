# 快速设置指南

## 1. 数据库配置

### 创建 Neon 数据库
1. 访问 [Neon](https://neon.tech) 并注册账户
2. 创建新项目
3. 复制连接字符串

### 配置环境变量
创建 `.env` 文件：

```env
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
NEXTAUTH_SECRET="your-random-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## 2. 数据库迁移

```bash
# 生成 Prisma 客户端
npx prisma generate

# 推送数据库架构
npx prisma db push
```

## 3. 启动应用

### Next.js (网页端)
```bash
npm run dev
```
访问: http://localhost:3000

### React Native (移动端)
```bash
cd mobile
npm start
```

## 4. 测试功能

1. 在网页端创建一篇测试博客
2. 在移动端查看博客列表
3. 测试 Markdown 渲染和 CSS 样式

## 示例 Markdown 内容

```markdown
# 我的第一篇博客

这是一个 **测试博客**，展示了各种 Markdown 功能。

## 代码示例

```javascript
function hello() {
  console.log("Hello World!");
}
```

## 列表示例

### 优点
- 支持 Markdown
- 自定义样式
- 移动端支持

### 特殊样式

<div class="highlight">
这是一个高亮框，用于强调重要内容。
</div>

<div class="advantages">
<h4>优点</h4>
<ul>
<li>易于使用</li>
<li>功能丰富</li>
<li>响应式设计</li>
</ul>
</div>
``` 