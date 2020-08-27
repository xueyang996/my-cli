#!/usr/bin/env node
const {program} = require('commander');
// const inquirer = require('inquirer');

const package = require('../package.json');
const addCmd = require('./cmd/add')
const deleteCmd = require('./cmd/delete')
const listCmd = require('./cmd/list')
const initCmd = require('./cmd/init')
program
  .version(package.version)
  .option('-f, --foo', 'enable some foo')  
  .option('-b, --bar', 'enable some bar')  
  .option('-B, --baz', 'enable some baz');

  program.on('--help', function(){  
   console.log('');  
   console.log('Examples:');  
   console.log('  $ custom-help --help');
   console.log('  $ custom-help -h');
  });

  program.command('add')
  .description('增加模板')
  .action(function() {
    addCmd()
  })
  program.command('init')
  .description('复制模板')
  .action(initCmd)

  program.command('delete')
  .description('删除模板')
  .action(function() {
    deleteCmd()
  })
  program.command('list')
  .description('模板列表')
  .action(listCmd)

  program.parse(process.argv);

