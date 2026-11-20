import { readdir, readFile } from 'node:fs/promises'
import { relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = new URL('../wiki/', import.meta.url)
const base = fileURLToPath(root)
const dirs = ['', 'fuentes/', 'negocio/', 'proyecto/']
const notes = new Map()
const problems = []

for (const dir of dirs) {
  const directory = new URL(dir, root)
  for (const filename of await readdir(directory)) {
    if (!filename.endsWith('.md')) continue
    const file = new URL(filename, directory)
    const key = relative(base, fileURLToPath(file)).split(sep).join('/').replace(/\.md$/, '')
    notes.set(key, await readFile(file, 'utf8'))
  }
}

const index = notes.get('index')
const inIndex = new Set()
for (const [name, text] of notes) {
  const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!frontmatter || !['type', 'updated', 'tags'].every(key => new RegExp('^' + key + ':', 'm').test(frontmatter[1]))) {
    problems.push(name + ': faltan propiedades YAML')
  }
  for (const [, target] of text.matchAll(/\[\[([^|#\]]+)(?:#[^|\]]+)?(?:\|[^\]]+)?\]\]/g)) {
    if (!notes.has(target)) problems.push(name + ': enlace roto a ' + target)
    if (name === 'index') inIndex.add(target)
  }
}
if (!index) problems.push('Falta index.md')
for (const name of notes.keys()) {
  if (name !== 'index' && !inIndex.has(name)) problems.push(name + ': falta en el índice')
}
const log = notes.get('log')
if (!log || !/^## \[\d{4}-\d{2}-\d{2}\] (ingest|query|lint|build|decision) \| .+/m.test(log)) {
  problems.push('La bitácora requiere al menos una entrada con fecha y tipo')
}
if (problems.length) {
  console.error(problems.join('\n'))
  process.exitCode = 1
} else {
  console.log('Wiki verificada: ' + notes.size + ' notas, con enlaces y propiedades válidos.')
}
