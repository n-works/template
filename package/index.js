#!/usr/bin/env node

const path = require('path')
const fs = require('fs-extra')

const projectName = path.basename(path.resolve('.'))
const basePath = path.dirname(__dirname)
const direntIgnore = new Set([
  path.basename(__dirname), '.git', 'node_modules'
])

fs.readdirSync(basePath, { withFileTypes: true })
  .filter(dirent => !direntIgnore.has(dirent.name))
  .forEach(dirent => {
    const srcPath = path.join(basePath, dirent.name)
    const distPath = path.join(path.resolve('.'), dirent.name)

    fs.copySync(srcPath, distPath, { overwrite: false })

    if (dirent.name === '.env.local') {
      fs.writeFileSync(distPath, fs.readFileSync(distPath, 'utf-8')
        .replace(/{{ PROJECT_NAME }}/g, projectName), 'utf-8')
    }
  })
