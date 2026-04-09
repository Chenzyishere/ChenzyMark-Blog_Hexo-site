import fs from 'node:fs/promises'
import path from 'node:path'

const postsDir = path.join(process.cwd(), 'source', '_posts')
const imagePattern = /!\[[^\]]*]\(([^)]+)\)/g

const isLocalAbsolutePath = (src) => {
  const cleaned = src.trim().replace(/^<|>$/g, '')
  return /^[a-zA-Z]:\\/.test(cleaned) || cleaned.includes('typora-user-images')
}

const run = async () => {
  const files = (await fs.readdir(postsDir)).filter(name => name.endsWith('.md'))
  const issues = []

  for (const file of files) {
    const fullPath = path.join(postsDir, file)
    const content = await fs.readFile(fullPath, 'utf8')

    let match
    while ((match = imagePattern.exec(content)) !== null) {
      const src = match[1]
      if (!isLocalAbsolutePath(src)) continue

      const upto = content.slice(0, match.index)
      const line = upto.split(/\r?\n/).length
      issues.push(`${path.join('source', '_posts', file)}:${line} -> ${src}`)
    }
  }

  if (issues.length === 0) {
    console.log('check-local-images: no local absolute image paths found.')
    return
  }

  console.log('check-local-images: found local absolute image paths:')
  for (const issue of issues) console.log(issue)
  process.exitCode = 1
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
