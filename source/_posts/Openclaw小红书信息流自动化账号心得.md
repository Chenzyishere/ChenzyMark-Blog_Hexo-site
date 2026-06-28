---
title: "Openclaw小红书信息流自动化账号心得"
date: 2026-06-28 12:00:00
updated: 2026-06-28 12:00:00
tags:
  - openclaw
  - xiaohongshu
  - automation
  - ai-agent
description: "使用 Openclaw 搭建小红书信息流自动发布工作流，包括 AI 文案编辑、封面生成、无头浏览器自动发布全流程实践。"
---

这个周末开始尝试折腾小红书自动发布工作流，打算用已经部署在阿里云2核2G服务器的Openclaw进行试验信息流编辑+自动发布全流程。

## Openclaw方案制定

首先我是先让Openclaw先给出小红书信息流自动发布的方案，然后让他在ClawHub和Github搜索已经成熟的skills进行参考。然后让他将制定好的方案拆分成多个skills。最后的方案是制作一个龙虾弟小红书每日要闻。分成三个skills来制作：1.kimi search+fetch等等获取当日要闻并且完成文案编辑。2.调用阿里云百炼中的生图模型生成一个封面图3.Openclaw自动发布到小红书。利用linux里的无头浏览器，然后登录小红书的账号给他操作。![image-20260628120206002](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20260628120206002.png)![image-20260628115917622](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20260628115917622.png)


## 文案编辑

文案编辑是解决的最容易的。获取了Kimi的API key，然后发给Openclaw让他给你配好，就可以用Kimi Search了。Kimi新用户有15元的web search额度。使用起来还行。但是不知道为什么27号就发现它挂了，用不了。但是Openclaw通过web_fetch等等其他的方式还可以搜到今日要闻，所以就先没管了。

## 调用生图模型

沿着一开始的方案，Openclaw使用了百炼里的qwen生图，但是生成的封面图文字全部变形。

![image-20260628120140010](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20260628120140010.png)

我反馈给Openclaw后它给出了另外一个方案，利用qwen的底图，然后再用Pillow来生成文字。虽然文字正常了，但是美观度不行。
![image-20260628120020237](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20260628120020237.png)

我就让他在github里找了ui-ux-pro-max skill来重新生成，并且最后选择了用HTML生成图排版的效果来做，效果好了很多。最后再让他优化了几版，感觉还过得去。

![image-20260628120009474](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20260628120009474.png)

## 小红书发布流程

我让Openclaw参考了这个来做小红书发布的自动化。但是由于是Linux服务器，没有GUI。它好像只能在无头浏览器里面弄，登录的过程又要给他发cookie，操作并不直观。而且可能是服务器内存太小的缘故，它做着做着就卡住了。
做到这里，我感觉Openclaw部署在低端便宜服务器的上限可能还是太低了，正在考虑是否要转成在自己的电脑里用WSL来跑Openclaw。

![image-20260628115905740](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20260628115905740.png)
![image-20260628120628970](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20260628120628970.png)

## 费用预期

当项目有点进展时，我看了下deepseek platform近两日的数据，发现Token消耗量是比我想象中要夸张得多的：26-28号，deepseek-v4-pro消耗了近4亿的token，烧了80-90元。当初使用deepseek是看中它在国内的性价比，但是用来做Openclaw，这个费用金额依然远远超乎了我的预期。如果是更换到其他家的模型，可能一天的消耗会再高好几倍。

为了减轻一点费用开销，我让Openclaw切换默认模型为deepseek-v4-flash，在需要coding任务的时候在切换成v4-pro。希望能有用吧。

----最新消息----
它跑不动了，被小红书风控了。转战wsl。

![image-20260628113839973](https://chenzyishere.oss-cn-guangzhou.aliyuncs.com/img_for_typora/image-20260628113839973.png)