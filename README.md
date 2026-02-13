# 剧本转漫画生成器

这是一个基于 Next.js 和 Google Gemini 2.5 Flash 的剧本转漫画网站。

## 功能特点

- 📝 **剧本输入**: 简单易用的文本输入界面
- 🎬 **智能分镜**: 使用Gemini 2.5 Flash自动将剧本分解为多个场景
- 🎨 **AI绘图**: 使用Gemini 2.5 Flash生成高质量漫画图片
- ✨ **实时预览**: 即时查看生成的漫画效果
- 🌓 **深色模式**: 支持明暗主题切换

## 技术栈

- **前端框架**: Next.js 15 + React 18
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **AI服务**: Google Gemini 2.5 Flash (分镜 + 图片生成)

## 安装步骤

1. 确保你已安装 Node.js (推荐 v18 或更高版本)

2. 安装依赖:
```bash
npm install
```

3. 配置环境变量:
在项目根目录创建 `.env.local` 文件,添加你的 Gemini API 密钥:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

获取API密钥:
- 访问 [Google AI Studio](https://ai.google.dev/)
- 登录Google账号
- 点击 "Get API Key" 创建密钥

4. 运行开发服务器:
```bash
npm run dev
```

5. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 使用方法

1. 在左侧文本框中输入你的剧本
2. 点击"生成漫画"按钮
3. 等待AI处理(分镜+图片生成)
4. 在右侧查看生成的漫画

## 剧本格式示例

```
场景1: 小明走在放学的路上,天空突然下起了雨。
小明: "糟糕,忘记带伞了!"

场景2: 小红撑着伞走过来。
小红: "小明,我们一起走吧!"

场景3: 两人一起走在雨中,雨伞下传来欢笑声。
```

## 项目结构

```
script-to-comic/
├── app/
│   ├── api/
│   │   ├── storyboard/      # 剧本分镜API
│   │   └── generate-image/  # 图片生成API
│   ├── globals.css          # 全局样式
│   ├── layout.tsx           # 布局组件
│   └── page.tsx             # 主页面
├── public/                  # 静态资源
├── .env.local              # 环境变量(需自行创建)
├── next.config.ts          # Next.js配置
├── tailwind.config.ts      # Tailwind配置
└── package.json            # 依赖配置
```

## 注意事项

- Gemini API有免费额度,超出后会产生费用
- 图片生成需要一定时间,请耐心等待
- 建议每次输入3-5个场景的剧本,避免等待时间过长
- Gemini 2.5 Flash支持图片生成功能

## 未来改进

- [ ] 添加图片编辑功能
- [ ] 支持自定义画风选择
- [ ] 添加对话框和文字编辑
- [ ] 支持导出PDF格式
- [ ] 添加用户登录和历史记录
- [ ] 优化生成速度

## 许可证

MIT
