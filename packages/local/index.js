#!/usr/bin/env node

const path = require('path')
const fs = require('fs-extra')
const prompts = require('prompts')

// 再帰的にファイルをコピー
function copyFiles (srcPath, distPath) {
  fs.readdirSync(srcPath, { withFileTypes: true })
    .forEach(dirent => {
      const src = path.join(srcPath, dirent.name)
      const dist = path.join(distPath, dirent.name.replace(/\.template$/, ''))

      // if (!fs.existsSync(dist)) {
      //   fs.copyFileSync(src, dist)
      // }

      if (dirent.isDirectory()) {
        copyFiles(src, dist)
      } else {

      }

      console.log(src)
      console.log('>>>', dist)
      console.log('')
    })
  // const directoryPaths =
  //   fs.readdirSync(basePath, { withFileTypes: true })
  //       .map(dirent => this.getDirectoryPaths(path.join(basePath, dirent.name)))
  //
  // return [basePath, ...directoryPaths].flat()
}

(async () => {
  const response = await prompts({
    type: 'text',
    name: 'projectName',
    message: 'Please enter this project name',
    initial: path.basename(path.resolve('.'))
  })

  const projectName = response.projectName
  const templatePath = path.join(__dirname, 'template')

  copyFiles(path.join(__dirname, 'template'), path.resolve('.'))

  //
  //
  // // テンプレートのファイルとフォルダをコピー
  // fs.readdirSync(templatePath, { withFileTypes: true })
  //   .forEach(dirent => {
  //     const srcPath = path.join(templatePath, dirent.name)
  //
  //     // 雛形ファイルの拡張子 .template は取り除く
  //     const distPath = path.join(
  //       path.resolve('.'),
  //       dirent.name.replace(/\.template$/, '')
  //     )
  //
  //     fs.copySync(srcPath, distPath, { overwrite: false })
  //
  //     // 雛形ファイルにプロジェクト名を書き込み
  //     if (dirent.name.match(/\.template$/)) {
  //       const text = fs.readFileSync(distPath, 'utf-8')
  //         .replace(/{{ PROJECT_NAME }}/g, projectName)
  //
  //       fs.writeFileSync(distPath, text, 'utf-8')
  //     }
  //   })
})()
