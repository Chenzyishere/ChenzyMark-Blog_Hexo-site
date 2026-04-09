---
title: "SEO优化"
date: 2026-01-01 11:32:26
updated: 2026-03-25 17:52:39
tags:
  - frontend
  - javascript
  - html
  - seo
  - network
  - json
description: "SEO优化"
categories:
  - 前端知识库
  - 浏览器与网络
---
# SEO优化

> SEO(Search Engine Optimization搜索引擎优化)，是指通过技术策略提高网站在搜索引擎（如Google\baidu\bing）自然（非付费）搜索结果中的排名，从而增加网站的可见性、流量和潜在用户转化率。

## 一、SEO类型

##### On-Page SEO（站内优化）

- 关键词研究与布局（标题、正文、H标签、URL、ALT标签等等）
- 内容质量（原创、有价值、结构清晰）
- 页面加载速度优化
- 移动端友好（响应式设计）
- 内部链接结构
- 原标签优化

##### Off-Page SEO（站外优化）

- 外部链接建设（高质量反向链接）
- 社交媒体推广
- 品牌提及

##### Technical SEO（技术SEO）

- 网站结构与爬虫可访问性(robots.txt\sitemap)
- HTTPS安全协议
- 结构化数据(Schema Markup)
- 避免重复内容
- 404错误与重定向设置
- 核心Web指标优化(Core Web Vitals)



## 二、HTML5语义化助力SEO

##### 1.**帮助搜索引擎理解页面结构**

搜索引擎爬虫通过解析HTML判断，哪部分是主要内容？哪部分是导航？哪部分是独立文章？

##### 2.提高内容的相关性权重

搜索引擎会优先抓取<main>/<article>中的内容，认为这些是页面的核心信息。而<aside>/<footer>中的内容权重较低，语义化标签相当于给搜索引擎提供内容优先级的提示。

##### 3.改善无障碍访问(Accessibility)间接利好SEO

Google等搜索引擎将可访问性作为用户体验的一部分，良好的无障碍设计可能可以间接提升SEO表现。

##### 4.代码简洁，利于爬虫抓取效率

语义化通常带来更清晰更少嵌套的HTML结构，减少冗余代码的同时加快页面解析速度，降低爬虫成本。

### 语义标签使用规范：

#### 标题层级规范

单页唯一：每个页面只保留1个，且包含页面核心关键词（如文章标题、商品名称），避免多个h1或h1放Logo。

层级连贯不跳级：h1->h2->h3，依次递进，反映内容逻辑

#### 链接语义化处理

用标签包裹可点击链接，href指向真实地址，添加aria-label描述，包含文字内容。如果是图片链接，设置文案隐藏在链接里面。

#### 图片语义化处理

必加alt属性，提供替代文本描述。alt内容应准确描述图片内容或功能。

对于装饰性图片，可使用空alt属性(alt="")



## 三、基础SEO优化方法与常见问题

1.页面标题优化：每个页面应有唯一描述性的标题

2.元描述优化：<meta name="description" content="">

应包含页面摘要 应包含主要关键词但避免堆砌



结构化数据应用

SEO结构化数据(Schema markup)是标准化的数据格式

用于向搜索引擎明确页面内容的含义

帮助搜索引擎更精准理解内容类型和关系



实现方式

常用格式：JSON-LD：所有类型的网站，尤其是动态内容（如电商商品页、新闻资讯页）、复杂数据结构（如包含评分、评论的画面）

Microdata:通过itemscope（定义数据范围）、itemtype（数据类型）、itemprop（属性）等属性标记内容

RDFa:通过vocab（词汇表）、typeof（数据类型）、property（属性）等属性标记数据，可嵌入HTML或XML中，可在搜索结果中展示“富摘要”。提升点击率和SEO效果。

常用数据类型：

1.文章/博客结构化数据：包含标题、作者、发布日期等信息，可在搜索结果中显示摘要和图片

2.商品结构化数据：包含价格、库存状态、评论等信息，可显示价格、评价星级等富摘要

3.视频结构化数据：包含视频时长、缩略图等等信息，可在搜索结果中直接显示视频预览

参考资源：

Google结构化数据文档：https://developers.google.com/search?hl=zh-cn

开发工具和验证器

链接状态检测

网站死链查询工具使用、状态查询工具分析重定向次数和跳转目标

孤岛页处理（网站中没有任何内部链接指向的页面）Google Search Console提示分析，内部链接结构检查

解决方案：建立内部链接网络，更新sitemap并提交GSC，定期检查链接结构

常见链接问题

404页面处理（代码设置重定向跳转或者shopify后台设置重定向）

多次重定向问题

尽量使用/blogs/news/xxx替代http://xxx.com/blogs（尽量使用相对路径）

国际化SEO策略

hreflang标签应用：明确页面针对的语言/地区，防止多语言版本被降权，提高点击率和转化率。

实现方式：

![image-20251225163559314](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20251225163559314.png)

![image-20251225163626107](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20251225163626107.png)

![image-20251225163637332](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20251225163637332.png)

