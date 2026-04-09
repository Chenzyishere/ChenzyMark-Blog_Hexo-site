---
title: "Codex Update Log"
date: 2026-03-25 18:08:13
updated: 2026-04-09 00:00:00
tags:
  - frontend
  - maintenance
categories:
  - 博客维护
  - 更新日志
description: "记录 Codex 在项目中的每次改动。"
---

# Codex Update Log

用于记录 Codex 在项目中的每次更新位置与目的，便于回溯。

## 记录规则

- 日期：`YYYY-MM-DD`
- 范围：本次改动涉及的文件路径
- 说明：一句话描述改动目的

## 更新记录

| 日期 | 范围 | 说明 |
| --- | --- | --- |
| 2026-03-25 | `_config.yml` | 启用 `post_asset_folder: true`，用于规范文章资源管理。 |
| 2026-03-25 | `_config.butterfly.yml` | 启用 `local_search` 并配置分页与预加载。 |
| 2026-03-25 | `package.json`, `package-lock.json` | 新增 `kb:normalize`、`kb:check-images` 命令并安装搜索依赖。 |
| 2026-03-25 | `tools/normalize-frontmatter.mjs` | 新增 front-matter 自动补全脚本。 |
| 2026-03-25 | `tools/check-local-images.mjs` | 新增本地绝对路径图片检测脚本。 |
| 2026-03-25 | `source/_posts/*.md` | 批量补齐 `updated/categories/tags/description`。 |
| 2026-03-25 | `source/_posts/codex_log.md` | 初始化 Codex 更新日志文档。 |
| 2026-04-09 | `tools/map-categories.mjs`, `package.json`, `source/_posts/*.md` | 批量映射文章到分类树并完成构建验证。 |
| 2026-04-09 | `source/_posts/codex_log.md` | 修复日志文档乱码，统一为 UTF-8 中文内容。 |

| 2026-04-09 | _config.butterfly.yml | 更新主题色（theme_color）与全站背景（background），并关闭 header/footer mask 以提升背景可见度。 |
| 2026-04-09 | _config.butterfly.yml | 将站点切换为深色主题：深色渐变背景、冷色系 theme_color，并设置 display_mode: dark。 |
| 2026-04-09 | source/categories/index.md, source/tags/index.md | 补充分类页与标签页 front-matter（type/description/top_img），并完成构建验证。 |
| 2026-04-09 | source/taxonomy/index.md, _config.butterfly.yml | 新增统一的知识索引页面（taxonomy），并将菜单改为单入口。 |
| 2026-04-09 | _config.butterfly.yml | 导航菜单改为中文（首页/项目/归档/知识索引/清单/友链/关于）。 |
