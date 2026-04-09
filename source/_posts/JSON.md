---
title: "JSON"
date: 2026-01-01 11:32:59
updated: 2026-03-25 17:52:39
tags:
  - frontend
  - javascript
  - json
description: "JSON(JavaScript Object Notation,JavaScript 对象表示法)"
categories:
  - 前端知识库
  - JavaScript
---
JSON(JavaScript Object Notation,JavaScript 对象表示法)

轻量级的数据交换格式，易于阅读和编写，以及机器解析和生成。

结构简单，只包含两种数据结构：对象(Object)、数组(Array)

数据类型支持：

字符串（必须双引号）

数字（整数或浮点数）

布尔值 true/false

null

对象

数组

JSON实例

```
{
  "name": "张三",
  "age": 30,
  "isStudent": false,
  "courses": ["数学", "物理"],
  "address": {
    "city": "北京",
    "postalCode": "100000"
  },
  "spouse": null
}
```

竞品XML对比

| 特性         | JSON                 | XML                |
| ------------ | -------------------- | ------------------ |
| 可读性       | 更简洁、易读         | 较冗长             |
| 体积         | 更小                 | 较大               |
| 解析速度     | 更快                 | 较慢               |
| 支持数据类型 | 原生支持基本数据类型 | 所有内容都是字符串 |

Token

1.身份认证中的Token

Web开发和API安全中，Token通常指用于身份验证和授权的凭证。

常见类型：

JWT(JSON Web Token)

一种开放标准，用于在各方之间安全传递信息作为JSON对象。

OAuth 2.0 Access Toekn

第三方登录（如：“使用微信/Google登录”）中，授权服务器办法的短期凭证，用于访问受保护的资源。

自然语言处理(NLP)与大模型中的Token

在AI和语言模型（如GPT、BERT、QWEN）中，token指文本被切分后的基本处理单元。

模型的输入/输出都以Token为单位。

Token数量！=字符数，一个汉字=1个token，英文可能会被拆分 如"unhappiness"->"un","happiness"。

大模型有最大上下文长度限制（如Qwen-Max支持32768超出则无法处理）

3.编译原理中的Token

在编程语言编译过程中，Token是词法分析器(Lexer)从源代码中识别出的最小语法单位。

## 总结对比

| 领域     | Token 含义         | 作用                    |
| -------- | ------------------ | ----------------------- |
| 网络安全 | 身份凭证（如 JWT） | 用户认证与授权          |
| AI/NLP   | 文本的基本单元     | 模型输入/输出的计量单位 |
| 编译器   | 源代码的词法单元   | 语法分析的基础          |
| 区块链   | 数字资产           | 价值载体或功能权限      |