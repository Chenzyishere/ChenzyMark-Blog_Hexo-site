import fs from 'node:fs/promises'
import path from 'node:path'

const postsDir = path.join(process.cwd(), 'source', '_posts')

const map = {
  'codex_log.md': ['博客维护', '更新日志'],
  'hello-world.md': ['前端知识库', '工程化'],
  'JSON.md': ['前端知识库', 'JavaScript'],
  'SEO优化.md': ['前端知识库', '浏览器与网络'],
  'vw&vh&em&rem.md': ['前端知识库', 'HTML-CSS'],
  'WebComponents.md': ['前端知识库', 'JavaScript'],
  '前端八股文_HTML和CSS.md': ['前端知识库', 'HTML-CSS'],
  '前端八股文_JS基础.md': ['前端知识库', 'JavaScript'],
  '前端八股文_JS基础_ES6新特性.md': ['前端知识库', 'JavaScript'],
  '前端八股文_JS基础（更仔细的版本）.md': ['前端知识库', 'JavaScript'],
  '前端八股文_React.md': ['前端知识库', 'React'],
  '前端八股文_Vue专题.md': ['前端知识库', 'Vue'],
  '前端八股文_web存储HTTP计算机网络.md': ['前端知识库', '浏览器与网络'],
  '前端存储.md': ['前端知识库', '浏览器与网络'],
  '前端性能优化.md': ['前端知识库', '性能优化'],
  '项目相关问题.md': ['前端知识库', '工程化']
}

const parseFrontmatter = (raw) => {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!m) return null
  return { frontmatter: m[1], body: raw.slice(m[0].length) }
}

const replaceCategories = (frontmatter, categories) => {
  const lines = frontmatter.split(/\r?\n/)
  const out = []
  let skipping = false

  for (const line of lines) {
    if (/^categories:/.test(line)) {
      skipping = true
      continue
    }

    if (skipping) {
      if (/^\s+-\s+/.test(line) || /^\s+/.test(line)) continue
      skipping = false
    }

    out.push(line)
  }

  out.push('categories:')
  for (const c of categories) out.push(`  - ${c}`)
  return out.join('\n').replace(/\n{3,}/g, '\n\n')
}

const run = async () => {
  const files = await fs.readdir(postsDir)
  let changed = 0

  for (const file of files) {
    if (!file.endsWith('.md')) continue
    const categories = map[file]
    if (!categories) continue

    const full = path.join(postsDir, file)
    const raw = await fs.readFile(full, 'utf8')
    const parsed = parseFrontmatter(raw)
    if (!parsed) continue

    const nextFm = replaceCategories(parsed.frontmatter, categories)
    const next = `---\n${nextFm}\n---\n${parsed.body}`

    if (next !== raw) {
      await fs.writeFile(full, next, 'utf8')
      changed++
      console.log(`mapped: ${file} => ${categories.join(' / ')}`)
    }
  }

  console.log(`map-categories: changed ${changed} file(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
