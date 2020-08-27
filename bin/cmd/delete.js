const inquirer = require('inquirer');
const { deleteTemplate, templateMap } = require('../utils')

module.exports = () => {
  const choices = Object.keys(templateMap || {})
  return inquirer
  .prompt([
    {name: "name", message: '要删除模板名称', type: 'list', choices},
  ])
  .then(answers => {
    if(answers.name) {
      deleteTemplate(answers.name)
    }
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });
}