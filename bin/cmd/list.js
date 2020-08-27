const { templateMap, log } = require('../utils')

module.exports = () => {
  const choices = Object.keys(templateMap || {})
  choices.forEach(template => {
    const { name, describe, giturl, branch, script, } = templateMap[template]
    log.success('================')
    log.info('模板名称：'+ name)
    log.info('模板描述：'+ describe)
    log.info('模板地址：'+ giturl)
    log.info('模板分支：'+ branch)
    log.info('模板下载后执行的命令（会在模板下载的目录里执行）：'+ script)
  })
}