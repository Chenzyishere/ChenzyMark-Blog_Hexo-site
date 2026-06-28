const fs = require('node:fs')
const path = require('node:path')

const pad = n => String(n).padStart(2, '0')
const formatDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`

const descriptionFromBody = (body) => {
  const cleaned = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]*)]\([^)]+\)/g, '$1')
    .replace(/[#>*`]/g, ' ')
    .replace(/^\s*[-+]\s+/gm, '')
    .replace(/\r/g, '')

  const lines = cleaned
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && line.toLowerCase() !== '[toc]')

  const first = lines[0] || 'Frontend knowledge note.'
  return first.replace(/\s+/g, ' ').slice(0, 120)
}

const inferTags = (name, body) => {
  const text = `${name} ${body}`.toLowerCase()
  const tagMap = [
    ['react', 'react'],
    ['vue', 'vue'],
    ['javascript', 'javascript'],
    ['js', 'javascript'],
    ['typescript', 'typescript'],
    ['html', 'html'],
    ['css', 'css'],
    ['performance', 'performance'],
    ['seo', 'seo'],
    ['http', 'network'],
    ['network', 'network'],
    ['storage', 'storage'],
    ['webcomponents', 'web-components'],
    ['json', 'json']
  ]

  const tags = []
  for (const [kw, tag] of tagMap) {
    if (text.includes(kw) && !tags.includes(tag)) tags.push(tag)
  }

  if (!tags.includes('frontend')) tags.unshift('frontend')
  return tags
}

const parseFrontmatter = (raw) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) return null
  return {
    frontmatter: match[1],
    body: raw.slice(match[0].length)
  }
}

const hasField = (frontmatter, field) => new RegExp(`^${field}:`, 'm').test(frontmatter)
const ensureQuoted = (s) => `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`

const inferTitle = (fileName, body) => {
  const heading = body.match(/^#\s+(.+)$/m)
  if (heading) return heading[1].trim()
  return path.basename(fileName, '.md')
}

hexo.on('before_generate', function () {
  const postsDir = path.join(hexo.source_dir, '_posts')
  const nowString = formatDate(new Date())

  let entries
  try {
    entries = fs.readdirSync(postsDir).filter(name => name.endsWith('.md'))
  } catch {
    return
  }

  let changed = 0

  for (const file of entries) {
    const fullPath = path.join(postsDir, file)
    const raw = fs.readFileSync(fullPath, 'utf8')
    const parsed = parseFrontmatter(raw)

    let frontmatter = ''
    let body = raw

    if (parsed) {
      frontmatter = parsed.frontmatter
      body = parsed.body
    } else {
      const stat = fs.statSync(fullPath)
      const title = inferTitle(file, body)
      frontmatter = `title: ${ensureQuoted(title)}\ndate: ${formatDate(stat.mtime)}`
    }

    const additions = []

    if (!hasField(frontmatter, 'updated')) additions.push(`updated: ${nowString}`)
    if (!hasField(frontmatter, 'categories')) additions.push('categories:\n  - 前端知识库')

    if (!hasField(frontmatter, 'tags')) {
      const tags = inferTags(file, body)
      additions.push(`tags:\n${tags.map(tag => `  - ${tag}`).join('\n')}`)
    }

    if (!hasField(frontmatter, 'description')) {
      const desc = descriptionFromBody(body)
      additions.push(`description: ${ensureQuoted(desc)}`)
    }

    if (additions.length === 0 && parsed) continue

    const next = `---\n${frontmatter.trimEnd()}\n${additions.join('\n')}\n---\n${body}`
    fs.writeFileSync(fullPath, next, 'utf8')
    changed++
  }

  if (changed > 0) {
    hexo.log.info(`auto-normalize-frontmatter: updated ${changed} post(s)`)
  }
})
