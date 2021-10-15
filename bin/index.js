#!/usr/bin/env node

const path = require('path');
const fse = require('fs-extra');
const program = require('commander');

const addConfig = require('./addConfig');

const packageObj = fse.readJsonSync(path.resolve(__dirname, '../package.json'));

// version
program.version(packageObj.version, '-v, --version');

// add
program
  .command('add')
  .description('add config')
  .action(() => {
    addConfig();
  });

// 解析命令行参数
program.parse(process.argv);
