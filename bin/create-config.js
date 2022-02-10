#!/usr/bin/env node

const fse = require('fs-extra');
const resolve = require('path').resolve;
const program = require('commander');

const addConfig = require('../src/add-config');

const packageObj = fse.readJsonSync(resolve(__dirname, '../package.json'));

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
