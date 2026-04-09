# ChenzyMark Blog (Hexo)

这是我的 Hexo 博客工程仓库，主题为 `butterfly`。  
内容仓库与博客工程仓库已分离：文档更新后可自动同步并构建部署。

## 1. 项目结构

```text
.
├─ source/                     # 站点内容（文章、页面、分类、标签）
│  ├─ _posts/                  # 博客文章
│  ├─ categories/              # 分类页
│  ├─ tags/                    # 标签页
│  └─ taxonomy/                # 知识索引页（统一入口）
├─ themes/butterfly/           # 主题
├─ tools/                      # 内容维护脚本
├─ _config.yml                 # Hexo 主配置
└─ _config.butterfly.yml       # Butterfly 主题配置
```

## 2. 环境准备

```bash
npm install
```

Node 建议版本：`22.x`

## 3. 常用命令

```bash
npm run clean                  # 清理缓存和生成产物
npm run build                  # 生成静态文件（public）
npm run server                 # 本地预览（默认 http://localhost:4000）
npm run deploy                 # 部署（需先配置 deploy）

npm run kb:normalize           # 批量补全 front-matter
npm run kb:check-images        # 检查文章中的本地绝对路径图片
npm run kb:map-categories      # 批量映射分类树
```

## 4. 已使用插件与使用方法

### 核心与生成器

- `hexo`：Hexo 核心框架
- `hexo-generator-index`：首页文章列表生成
- `hexo-generator-archive`：归档页生成
- `hexo-generator-category`：分类页生成
- `hexo-generator-tag`：标签页生成
- `hexo-generator-searchdb`：生成本地搜索索引 `search.json`

本地搜索配置（`_config.butterfly.yml`）：

```yml
search:
  use: local_search
  local_search:
    preload: true
    top_n_per_article: 2
    pagination:
      enable: true
      hitsPerPage: 8
```

### 渲染器

- `hexo-renderer-marked`：Markdown 渲染
- `hexo-renderer-ejs`：EJS 模板渲染
- `hexo-renderer-pug`：Pug 模板渲染
- `hexo-renderer-stylus`：Stylus 样式渲染

### 服务与统计

- `hexo-server`：本地开发服务
- `hexo-wordcount`：字数/阅读时长统计

字数统计配置（`_config.butterfly.yml`）：

```yml
wordcount:
  enable: true
  post_wordcount: true
  min2read: true
  total_wordcount: true
```

## 5. 页面功能配置（分类/标签/知识索引）

### 分类页

`source/categories/index.md`：

```md
---
title: 分类
type: categories
---
```

### 标签页

`source/tags/index.md`：

```md
---
title: 标签
type: tags
---
```

### 知识索引页（统一入口）

`source/taxonomy/index.md`：用于统一导航进入分类与标签。

## 6. 文章规范（front-matter）

推荐字段：

```yml
---
title: 文章标题
date: 2026-04-09 12:00:00
updated: 2026-04-09 12:00:00
categories:
  - 前端知识库
  - JavaScript
tags:
  - frontend
  - javascript
description: 文章摘要
---
```

### 自动补全 front-matter

```bash
npm run kb:normalize
```

## 7. 图片资源规范

- 已启用 `post_asset_folder: true`（`_config.yml`）
- 建议图片与文章同目录管理（如 `source/_posts/文章名/图片.png`）
- 发布前检查本地绝对路径图片：

```bash
npm run kb:check-images
```

## 8. 内容仓库与自动同步

当前采用“文档仓库 + 博客仓库”分离方案：

- 文档仓库：`chenzymark-documents`
- 博客仓库：`ChenzyMark-Blog_Hexo-site`

流程：

1. 文档仓库更新 `source/**`
2. 触发博客仓库 workflow 同步内容
3. 自动 `clean + build`
4. 自动部署 GitHub Pages

## 9. 故障排查

### 同步成功但页面没更新

- 检查 workflow 是否执行了 `npm run clean` + `npm run build`
- 检查是否部署到了 Pages（Actions 中 `deploy-pages` 成功）

### repository-dispatch 报权限错误

- 检查 `BLOG_REPO_PAT` 是否有目标仓库访问权限
- 检查 `repository` 字段 owner/repo 是否准确

---

如需新增能力（如 sitemap/rss/评论系统），建议先在分支测试再合并到主分支。
