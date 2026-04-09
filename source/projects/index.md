---
title: 项目
date: 2026-04-09 13:20:00
layout: page
top_img: false
description: 项目与实践记录。
---

<style>
.projects-wrap {
  max-width: 920px;
  margin: 0 auto;
  display: grid;
  gap: 18px;
}

.project-card {
  position: relative;
  border-radius: 20px;
  padding: 1px;
  background: linear-gradient(135deg, rgba(125, 190, 255, .85), rgba(102, 224, 205, .85));
  box-shadow: 0 16px 34px rgba(20, 40, 75, .18);
}

.project-card-inner {
  border-radius: 19px;
  padding: 28px;
  background: linear-gradient(160deg, rgba(242, 248, 255, .97), rgba(233, 244, 255, .97));
  color: #304256;
}

.project-badge {
  display: inline-block;
  font-size: 12px;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: #2e6fb2;
  background: rgba(125, 190, 255, .22);
  border: 1px solid rgba(88, 166, 255, .4);
  border-radius: 999px;
  padding: 4px 10px;
  margin-bottom: 14px;
}

.project-title {
  margin: 0;
  font-size: 26px;
  line-height: 1.2;
  color: #1f3550;
}

.project-desc {
  margin: 10px 0px 16px 0px !important;
  color: #4f6278;
  line-height: 1.8;
}

.project-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 22px;
}

.project-stack span {
  display: inline-block;
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(199, 222, 245, .42);
  color: #355071;
  border: 1px solid rgba(125, 170, 214, .45);
}

.project-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.project-btn {
  display: inline-block;
  border-radius: 12px;
  text-decoration: none !important;
  font-weight: 600;
  padding: 10px 14px;
  transition: transform .18s ease, box-shadow .18s ease, opacity .18s ease;
}

.project-btn:hover {
  transform: translateY(-1px);
}

.project-btn.primary {
  background: linear-gradient(135deg, #75bcff, #63e1d1);
  color: #0d2c45 !important;
  box-shadow: 0 8px 20px rgba(99, 225, 209, .26);
}

.project-btn.ghost {
  border: 1px solid rgba(125, 170, 214, .45);
  color: #355071 !important;
  background: rgba(199, 222, 245, .35);
}

.project-empty {
  padding: 20px;
  border: 1px dashed rgba(125, 170, 214, .45);
  border-radius: 12px;
  color: #4f6278;
}
</style>
<script id="project-data" type="application/json">
[
  {
    "badge": "Featured Project",
    "name": "ai-agent",
    "description": "一个面向 AI Agent 场景的前端项目，聚焦任务编排、交互体验与状态管理。",
    "stack": ["React", "Vite", "Tailwind CSS", "Zustand"],
    "projectUrl": "https://ai-agent.chenzymark.space",
    "repoUrl": "https://github.com/Chenzyishere/ai-agent"
  },
  {
    "badge": "Featured Project",
    "name": "教育资源推荐算法设计",
    "description": "一个基于用户行为的教育资源推荐算法设计，用于为用户提供个性化的学习资源。该研究对比了Pure-CF/DKT/SAKT/KG-SAKT四种算法。",
    "stack": ["pyTorch","SAKT","KG-SAKT"],
    "projectUrl": "https://github.com/Chenzyishere/Education_Recommender_System",
    "repoUrl": "https://github.com/Chenzyishere/Education_Recommender_System"
  },
    {
    "badge": "Featured Project",
    "name": "安卓客户端教育推荐系统",
    "description": "一个简易的教育资源MOOC平台。",
    "stack": ["Android","Java"],
    "projectUrl": "https://github.com/Chenzyishere/Android-JavaLearningPlatform",
    "repoUrl": "https://github.com/Chenzyishere/Android-JavaLearningPlatform"
  }
]
</script>

<div class="projects-wrap" id="projects-wrap"></div>

<script>
(() => {
  const dataNode = document.getElementById('project-data')
  const wrap = document.getElementById('projects-wrap')
  if (!dataNode || !wrap) return

  let list = []
  try {
    list = JSON.parse(dataNode.textContent || '[]')
  } catch (err) {
    wrap.innerHTML = '<div class="project-empty">项目 JSON 解析失败，请检查逗号与引号格式。</div>'
    return
  }

  if (!Array.isArray(list) || list.length === 0) {
    wrap.innerHTML = '<div class="project-empty">暂无项目，请在上方 JSON 中添加配置。</div>'
    return
  }

  const safeHref = (url) => {
    if (!url) return '#'
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) return url
    return '#'
  }

  list.forEach((item) => {
    const card = document.createElement('div')
    card.className = 'project-card'

    const inner = document.createElement('div')
    inner.className = 'project-card-inner'

    const badge = document.createElement('span')
    badge.className = 'project-badge'
    badge.textContent = item.badge || 'Project'

    const title = document.createElement('h2')
    title.className = 'project-title'
    title.textContent = item.name || '未命名项目'

    const desc = document.createElement('p')
    desc.className = 'project-desc'
    desc.textContent = item.description || '暂无描述。'

    const stack = document.createElement('div')
    stack.className = 'project-stack'
    ;(Array.isArray(item.stack) ? item.stack : []).forEach((s) => {
      const tag = document.createElement('span')
      tag.textContent = s
      stack.appendChild(tag)
    })

    const actions = document.createElement('div')
    actions.className = 'project-actions'

    const projectBtn = document.createElement('a')
    projectBtn.className = 'project-btn primary'
    projectBtn.href = safeHref(item.projectUrl)
    projectBtn.target = '_blank'
    projectBtn.rel = 'noopener noreferrer'
    projectBtn.textContent = '查看项目'

    const repoBtn = document.createElement('a')
    repoBtn.className = 'project-btn ghost'
    repoBtn.href = safeHref(item.repoUrl)
    repoBtn.target = '_blank'
    repoBtn.rel = 'noopener noreferrer'
    repoBtn.textContent = '查看仓库'

    actions.appendChild(projectBtn)
    actions.appendChild(repoBtn)

    inner.appendChild(badge)
    inner.appendChild(title)
    inner.appendChild(desc)
    inner.appendChild(stack)
    inner.appendChild(actions)

    card.appendChild(inner)
    wrap.appendChild(card)
  })
})()
</script>
