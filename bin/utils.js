const path = require('path')
const fs = require('fs')
const chalk = require('chalk');

const templatePath = path.join(__dirname, 'template.json')

const templateMap = getTemplateMap(templatePath)
const log = {
  error(info) {
    console.log(chalk.red(info))
  },
  warn(info) {
    console.log(chalk.yellow(info))
  },
  success(info) {
    console.log(chalk.green(info))
  },
  info(info) {
    console.log(chalk.white(info))
  },
}
function getTemplateMap(templatePath) {
  // 防止无此文件
  try {
    return JSON.parse(fs.readFileSync(templatePath))
  } catch (error) {
    return {}
  }
}

function updateTemplateFile(params) {
  fs.writeFileSync(templatePath, JSON.stringify(templateMap), 'utf-8')
}

function addTemplate(params) {
  const array = ["name", "giturl", "branch"]
  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    if(!params[item]) {
      return log.error(`template ${item} is empty`)
    }
  }
  // 赋值
  templateMap[params.name] = params
  updateTemplateFile()
  log.success('模板添加成功')
}

function deleteTemplate(name) {
  if(templateMap[name]) {
    delete templateMap[name]
    updateTemplateFile()
    log.success('模板删除成功')
  } else {
    log.warn('模板不存在')
  }
}

module.exports = {
  templateMap,
  log,
  addTemplate,
  deleteTemplate
}