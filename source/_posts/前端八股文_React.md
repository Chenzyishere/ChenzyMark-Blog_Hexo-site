---
title: "前端八股文_React"
date: 2025-11-20 22:47:08
updated: 2026-03-25 17:52:39
tags:
  - frontend
  - react
  - javascript
  - html
  - network
description: "React18的更新"
categories:
  - 前端知识库
  - React
---
### React18的更新

并发模式 更新render API

自动批处理 Suspense支持SSR

startTransition useTransition

useDeferredValue useId

提供给第三库的Hook



JSX是什么 和JS有什么区别

JSX是JavaScript语法的拓展，允许编写类似于HTML的代码，可以编译为常规的JavaScript函数调用，从而为创建组件标记提供了一种更好的方法。

JSX代码如下：

```
<div className = "sidebar" />
```

转换为以下JS代码

```
React.createElement(
	'div',
	{className:'sidebar'}	
)
```

简述React的生命周期

React的生命周期分为三个阶段：Mounting Receive_props unmounting

组件挂载时（组件状态的初始化、读取初始state和props以及两个生命周期方法，只会在初始化时运行一次）

componentWillMount会在render之前调用（在此调用setState,是不会触发re-render的，而是会进行state的合并，因此此时的this.state不是最新的，在render中才可以获取更新后的this.state）

componentDidMount会在render之后调用





React事件机制和原生DOM事件流的区别

react事件是绑定到document上面的，而原生的是绑定到dom上的

相对绑定的地方来说，dom上面的事件要优先于document上的事件执行



Redux工作原理

Redux是React的第三方状态管理库，创建于上下文API存在之前，它基于存储的状态容器的概念，组件可以从该容器中作为props接收数据。更新存储区的唯一方法是向存储区发送一个操作，

![image-20251120224436171](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20251120224436171.png)