const { spawn } = require('child_process');
const inquirer = require('inquirer');

const { templateMap, log } = require('../utils');

function cloneGit(giturl) {
  const cloneRepo = spawn('dclone', [giturl]);
  cloneRepo.stdout.on('data', data => {
    log.info(data)
  })
  cloneRepo.stderr.on('data', data => {
    log.error(data)
  })
  cloneRepo.stderr.on('close', code => {
    log.success('下载结束，退出码为：'+ code)
    process.exit()
  })
}

module.exports = () => {
  const choices = Object.keys(templateMap || {})
  const url = process.argv.splice(3)[0]
  if(url) {
    return cloneGit(url)
  }
  return inquirer
  .prompt([
    {name: "name", message: '初始化模板：',  type: 'list', choices},
    {name: "fileName", message: '目标文件夹名称', type: 'input'},
  ])
  .then(answers => {
    const { name, fileName } = answers
    if(!name) {
      log.warn('未选择模板')
      process.exit()
    }
    const { giturl, branch, } = templateMap[name]
    // const cloneRepo = spawn('git', ['clone', '--branch', branch, giturl, fileName]);
    cloneGit(giturl)
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });
}