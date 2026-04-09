---
title: "前端八股文——web存储/HTTP/计算机网络"
date: 2025-11-03 22:00:32
updated: 2026-03-25 17:52:39
tags:
  - frontend
  - javascript
  - html
  - css
  - network
  - storage
description: "前端八股文——web存储/HTTP/计算机网络"
categories:
  - 前端知识库
  - 浏览器与网络
---
# 前端八股文——web存储/HTTP/计算机网络

掌握cookie，localStorage,sessionStorage

## 1.Cookie

本身用于浏览器和server通讯

被“借用”到本地存储来的

可用document.cookie = '...'来修改

其缺点：

存储大小限制为4KB

http请求时需要发送到服务端，增加请求数量。

只能用document.cookie='...'来修改，太过简陋

## 2.localStorage和sessionStorage

HTML5专门为存储来设计的，最大可以存5M

API简单易用，setItem getItem

不会随着http请求被发送到服务端

它们的区别：

localStorage数据会永久存储，除非代码删除或手动删除

sessionStorage数据只存在于当前会话，浏览器关闭则清空

一般用localStorage会多一些

## 3.HTTP

前端工程师做出网页，需要通过网络请求向后端获取数据，因此http协议是前端面试必考的内容

#### 1.http状态码

##### 1.1状态码分类

1xx - 服务器收到请求

2xx - 请求成功，如200

3xx -重定向，如302

4xx - 客户端错误，如404

5xx - 服务端错误，如500

##### 1.2 常见状态码

200 -成功

301 - 永久重定向（配合location，浏览器自动处理）

302 - 临时重定向（配合location，浏览器自动处理）

304 - 资源未被修改

403 - 没权限

404 - 资源未找到

500 - 服务器错误

504 - 网关超时

##### 1.3关于协议和规范

状态码都是约定出来的

要求大家都跟着执行

不要违反规范，例如IE浏览器

#### 2.http缓存

关于缓存的介绍

http缓存策略（强制缓存+协商缓存）

刷新操作方式，对缓存的影响

##### 关于缓存

什么是缓存？把一些不需要重新获取的内容再重新获取一次

为什么需要缓存？网络请求相比于CPU的计算和页面渲染是非常非常慢的

哪些资源可以被缓存？静态资源，比如js css img

##### 强制缓存

Cache-Control:

在Response Headers中

控制强制缓存的逻辑

例如Cache-Control：max-age=3153600(单位是秒)

Cache-Control有哪些值？

max-age:缓存最大过期时间

no-cache:可以在客户端存储资源，每次都必须去服务端做新鲜度校验，来决定从服务端获取新的资源（200）还是使用客户端缓存（304）

no-store：永远都不要在客户端存储资源，永远都去原始服务器获取资源

##### 4.3协商缓存（对比缓存）

服务端缓存策略

服务端判断客户端资源，是否和服务端资源一样

一致则返回304，否则返回200和最新的资源

![image-20251103213950748](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20251103213950748.png)

##### 资源标识：

在Response Headers中，有两种

Last-Modified：资源的最后修改时间

Etag:资源的唯一标识（一个字符串，类似于人类的指纹）

##### Last-Modified:

![image-20251103214101381](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20251103214101381.png)

服务端拿到if-Modified-Since之后拿这个时间去和服务端资源最后修改时间做比较，如果一致则返回304，不一致（也就是资源已经更新了）就返回200和新的资源及新的Last-Modified

Etag:

![image-20251103214134167](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20251103214134167.png)

其实Etag和Last-Modified一样的，只不过Etag是服务端对资源按照一定方式（比如contenthash）计算出来的唯一标识，就像人类指纹一样，传给客户端之后，客户端再传过来的时候，服务端会将其与现在的资源计算出来的唯一标识作比较，一致则返回304，不一致就返回200和新的资源和新的Etag

两者比较：

优先使用Etag

Last-Modified只能精确到秒级

如果资源被重复生成，而内容不变，则Etag更精确

综述

![image-20251103214626628](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20251103214626628.png)

4.4 三种刷新操作对HTTP缓存的影响

正常操作：地址栏输入url，跳转链接，前进后退等

手动刷新：f5，点击刷新按钮，右键菜单刷新

强制刷新：ctrl+f5，shift+command+r

正常操作：强制缓存有效、协商缓存有效

手动刷新：强制缓存失效，协商缓存有效

强制刷新：强制缓存失效，协商缓存失效

### 3. 面试

**对于更多面试中可能出现的问题，我还是建议精读这篇三元的文章：**[HTTP 灵魂之问，巩固你的 HTTP 知识体系](https://juejin.cn/post/6844904100035821575)。

GET和POST的区别

从缓存的角度，GET请求会被浏览器主动缓存下来，留下历史记录，而POST默认不会。

从编码的角度，GET只能进行URL编码，只能接受ASCII字符，而POST没有限制

从参数的角度，GET一般放在URL中，因此不安全，POST放在请求体中，更适合传输敏感信息

从幂等性的角度，GET是幂等的，而POST不是。（幂等表示执行相同的操作，结果也是相同的）

从TCP的角度，GET请求会把请求报文一次性发出去，而POST会分为两个TCP数据包，首先发header部分，如果服务器相应100(continue)，然后发body部分。（火狐浏览器除外，它的POST请求执法一个TCP包）

HTTP/2有哪些改进？（很大可能问原理）

头部压缩

多路复用

服务器推送

关于 HTTPS 的一些原理，可以阅读这篇文章：[这一次，彻底理解 https 原理](https://juejin.cn/post/6844904038509576199)。接着你可以观看这个视频进行更进一步的学习：[HTTPS 底层原理，面试官直接下跪，唱征服！](https://link.juejin.cn/?target=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2FBV1XL411b7KZ%3Fp%3D1)

关于跨域问题，大部分都是理论很强，阅读[聊聊跨域的原理与解决方法](https://link.juejin.cn/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F149734572%3Ffrom_voters_page%3Dtrue)