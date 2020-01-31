#!/usr/bin/env node

const path = require('path')
const fs = require('fs-extra')

const projectName = path.basename(path.resolve('.'))
const basePath = path.join(__dirname, 'template')

fs.readdirSync(basePath, { withFileTypes: true })
  .forEach(dirent => {
    const srcPath = path.join(basePath, dirent.name)
    const distPath = path.join(path.resolve('.'), dirent.name)

    fs.copySync(srcPath, distPath, { overwrite: false })

    if (dirent.name === '.env.assets') {
      fs.writeFileSync(distPath, fs.readFileSync(distPath, 'utf-8')
        .replace(/{{ PROJECT_NAME }}/g, projectName), 'utf-8')
    }
  })

const envfilePath = path.join(path.resolve('.'), '.env')
if (!fs.existsSync(envfilePath)) {
  fs.writeFileSync(envfilePath, `COMPOSE_PROJECT_NAME=${projectName}\n`, 'utf-8')
}
