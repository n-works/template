#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const prompts = require('prompts')

// 再帰的にテンプレートファイルをコピー
function copyTemplateFiles (srcPath, distPath, projectName) {
  fs.readdirSync(srcPath, { withFileTypes: true })
    .forEach(dirent => {
      const src = path.join(srcPath, dirent.name)

      // 雛形ファイルの拡張子 .template は取り除く
      const dist = path.join(distPath, dirent.name.replace(/\.template$/, ''))

      if (dirent.isDirectory()) {
        if (!fs.existsSync(dist)) {
          fs.mkdirSync(dist, { recursive: true })
        }
        copyTemplateFiles(src, dist, projectName)
      } else {
        if (!fs.existsSync(dist)) {
          fs.copyFileSync(src, dist)

          // 雛形ファイルにプロジェクト名を書き込み
          if (dirent.name.match(/\.template$/)) {
            const text = fs.readFileSync(dist, 'utf-8')
              .replace(/{{ PROJECT_NAME }}/g, projectName)

            fs.writeFileSync(dist, text, 'utf-8')
          }
        }
      }
    })
}

(async () => {
  const response = await prompts({
    type: 'text',
    name: 'projectName',
    message: 'Please enter this project name',
    initial: path.basename(path.resolve('.'))
  })

  copyTemplateFiles(
    path.join(__dirname, 'template'),
    path.resolve('.'),
    response.projectName
  )
})()
