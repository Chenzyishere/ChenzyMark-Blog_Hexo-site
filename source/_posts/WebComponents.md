---
title: "WebComponents"
date: 2026-01-01 11:31:46
updated: 2026-03-25 17:52:39
tags:
  - frontend
  - javascript
  - html
  - web-components
description: "global.js负责初始化所有自定义的Web Components、绑定全局事件、提供跨组件通信能力，并确保主题在各种设备和交互场景下稳定运行。"
categories:
  - 前端知识库
  - JavaScript
---
![image-20251225165816604](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20251225165816604.png)

global.js负责初始化所有自定义的Web Components、绑定全局事件、提供跨组件通信能力，并确保主题在各种设备和交互场景下稳定运行。

1.global.js通常通过customElements.define()将JS类与HTML标签关联。

2.监听全局DOM事件（事件委托的方式）

Dawn使用事件委托(Event Delegation)高效处理用户交互，避免为每个按钮单独绑定事件。

当页面通过AJAX更新内容时，新插入的HTML中若包含了<>(WebComponents)组件，如果已经在global.js注册过，则浏览器可以直接自动升级新元素，无需调用new xxx()。

其实global.js是聚合器，本身没有实现具体的逻辑，只负责连接。