#!/usr/bin/env node

const path = require('path');
const fse = require('fs-extra');
const program = require('commander');

const packageObj = fse.readJsonSync(path.resolve(__dirname, '../package.json'));

// version
program.version(packageObj.version, '-v, --version');

// add config
function addConfig() {
  console.log('addConfig');
}

program
  .command('add config')
  .description('请选择你要添加的配置项~')
  .action(() => {
    addConfig();
  });

// 解析命令行参数
program.parse(process.argv);
