#!/usr/bin/env node

const fse = require('fs-extra');
const program = require('commander');

// methods
const addConfig = require('../lib/addConfig');

// version
program.version(require('../package.json').version, '-v, --version');

// add config
program
  .command('add config')
  .description('请选择你要添加的配置项~')
  .action(() => {
    addConfig();
  });
