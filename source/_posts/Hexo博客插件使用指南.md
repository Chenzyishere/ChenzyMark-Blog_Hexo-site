---
title: "Hexo博客插件使用指南"
date: 2026-04-09 12:00:00
updated: 2026-04-09 12:00:00
categories:
  - 前端知识库
  - 工程化
tags:
  - hexo
  - blog
  - plugin
description: "本项目已安装插件的用途、配置方法与常用命令汇总。"
---

# Hexo博客插件使用指南

这篇文档按“本博客当前已安装插件”整理，包含用途、配置位置、命令。

## 一、先看项目命令

```bash
npm run clean            # 清理缓存与生成文件
npm run build            # 生成静态站点（hexo generate）
npm run server           # 本地预览（hexo server）
npm run deploy           # 部署（需先配置 deploy）

npm run kb:normalize     # 批量补全 front-matter
npm run kb:check-images  # 检查文章里的本地绝对路径图片
npm run kb:map-categories # 批量映射分类树
```

## 二、核心与生成类插件

### 1. `hexo`

- 用途：Hexo 核心框架。
- 配置：`_config.yml`。
- 常用命令：

```bash
npx hexo clean
npx hexo generate
npx hexo server
```

### 2. `hexo-generator-index`

- 用途：生成首页列表。
- 配置位置：`_config.yml` 的 `index_generator`。

```yml
index_generator:
  path: ""
  per_page: 10
  order_by: -date
```

### 3. `hexo-generator-archive`

- 用途：生成归档页（按年月）。
- 配置位置：主要由 Hexo 自动处理，归档入口通常在主题菜单中配置。

### 4. `hexo-generator-category`

- 用途：生成分类页。
- 配置位置：
  - 文章 front-matter 的 `categories`
  - `source/categories/index.md` 中 `type: categories`

```md
---
title: 分类
type: categories
---
```

### 5. `hexo-generator-tag`

- 用途：生成标签页。
- 配置位置：
  - 文章 front-matter 的 `tags`
  - `source/tags/index.md` 中 `type: tags`

```md
---
title: 标签
type: tags
---
```

### 6. `hexo-generator-searchdb`

- 用途：生成本地搜索索引（`search.json`）。
- 配置位置：
  - `_config.butterfly.yml` 的 `search`

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

- 生效命令：

```bash
npm run build
```

## 三、渲染类插件

### 1. `hexo-renderer-marked`

- 用途：渲染 Markdown。
- 配置位置：`_config.yml`（高亮、代码块等）。

### 2. `hexo-renderer-ejs`

- 用途：渲染 `.ejs` 模板（主题/页面模板可能使用）。

### 3. `hexo-renderer-pug`

- 用途：渲染 `.pug` 模板。

### 4. `hexo-renderer-stylus`

- 用途：渲染 `.styl` 样式文件（Butterfly 主题会用到）。

## 四、服务与统计插件

### 1. `hexo-server`

- 用途：本地开发服务器。
- 命令：

```bash
npm run server
```

默认地址一般是 `http://localhost:4000`。

### 2. `hexo-wordcount`

- 用途：文章字数与阅读时长统计。
- 配置位置：`_config.butterfly.yml`

```yml
wordcount:
  enable: true
  post_wordcount: true
  min2read: true
  total_wordcount: true
```

## 五、主题相关

### 1. `theme: butterfly`（当前主题）

- 配置文件：`_config.butterfly.yml`
- 你目前已启用的重点能力：
  - 暗黑模式 `darkmode`
  - 目录 `toc`
  - 本地搜索 `search.local_search`
  - 字数统计 `wordcount`

### 2. `hexo-theme-landscape`

- 当前项目安装了这个主题包，但实际未启用（`_config.yml` 里是 `theme: butterfly`）。
- 只有把主题切到 `landscape` 才会生效。

## 六、安装与升级插件命令

### 安装新插件

```bash
npm install <plugin-name>
```

示例：

```bash
npm install hexo-generator-sitemap
```

### 升级依赖

```bash
npm update
```

### 安装后验证

```bash
npm run clean
npm run build
npm run server
```

## 七、你这个项目的实践建议

1. 每次加插件后先 `clean + build`，避免缓存干扰判断。
2. 插件配置尽量写在主配置或主题配置里，不要分散到多处。
3. 定期执行 `npm run kb:check-images`，避免本地路径图片上线失效。
