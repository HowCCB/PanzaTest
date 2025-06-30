# PaperPanza GitHub Actions 部署指南

## 🚀 自动部署设置

本项目已配置 GitHub Actions 自动部署到 GitHub Pages。

### 📋 部署流程说明

1. **触发条件**：
   - 推送代码到 `main` 或 `master` 分支
   - 手动触发工作流

2. **部署步骤**：
   - 检出代码
   - 配置 GitHub Pages
   - 上传静态文件
   - 部署到 GitHub Pages

### ⚙️ 启用 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 **Settings** 标签页
3. 在左侧菜单中找到并点击 **Pages**
4. 在 "Source" 部分选择 **GitHub Actions**
5. 保存设置

### 🔧 工作流文件

项目包含两个 GitHub Actions 工作流：

#### 1. `static.yml` - 静态站点部署（推荐）
- 简化的静态站点部署流程
- 直接部署 HTML/CSS/JS 文件
- 适合纯前端项目

#### 2. `deploy.yml` - 完整 CI/CD 流程
- 包含 Node.js 环境设置
- 运行依赖安装和测试
- 适合需要构建步骤的项目

### 📁 目录结构

```
PaperPanza/
├── .github/
│   └── workflows/
│       ├── static.yml      # 静态站点部署
│       └── deploy.yml      # 完整 CI/CD
├── index.html              # 主页面
├── styles.css              # 样式文件
├── script.js               # JavaScript 文件
├── images/                 # 图片资源
├── package.json            # Node.js 配置
└── vercel.json            # Vercel 配置
```

### 🌐 访问网站

部署成功后，你可以通过以下地址访问网站：
- GitHub Pages: `https://你的用户名.github.io/仓库名`
- 自定义域名（如果配置）

### 🔍 监控部署状态

1. 在 GitHub 仓库中点击 **Actions** 标签页
2. 查看工作流运行状态
3. 点击具体的运行记录查看详细日志

### 📝 自定义配置

如需修改部署配置，编辑 `.github/workflows/` 目录下的 YAML 文件：

- 修改触发分支
- 添加环境变量
- 配置构建步骤
- 设置部署路径

### 🚨 常见问题

1. **权限错误**：确保仓库设置中启用了 Actions 权限
2. **Pages 未启用**：在 Settings > Pages 中选择 GitHub Actions 作为源
3. **路径错误**：检查工作流中的路径配置是否正确

### 🎯 最佳实践

- 定期检查 Actions 运行状态
- 保持工作流文件的简洁性
- 使用语义化的提交信息
- 在推送前本地测试功能

---

## 🔗 相关链接

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [工作流语法参考](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions) 