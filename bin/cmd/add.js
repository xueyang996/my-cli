const inquirer = require('inquirer');
const { addTemplate } = require('../utils')

module.exports = () => {
  return inquirer
  .prompt([
    {name: "name", message: '模板名称：', type: 'input'},
    {name: "describe", message: '模板描述：', type: 'input'},
    {name: "giturl", message: '模板地址：', type: 'input'},
    {name: "branch", message: '模板分支：', type: 'input'},
    {name: "script", message: '模板下载后执行的命令（会在模板下载的目录里执行）：', type: 'input'},
  ])
  .then(answers => {
    addTemplate(answers)
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });
}