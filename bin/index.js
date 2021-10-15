#!/usr/bin/env node

const path = require('path');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const symbols = require('log-symbols');
const program = require('commander');

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

function addConfig() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'configName',
      message: `Select config`,
      choices: fse.readdirSync(path.resolve(__dirname, '../config'))
    }
  ]).then((answers) => {
    const { configName } = answers;

    const exists = fse.pathExistsSync(configName);

    if (exists) {
      console.log(symbols.error, chalk.red(`${configName} config already exists.`));
      process.exit();
    }

    const configContent = fse.readFileSync(path.resolve(__dirname, `../config/${configName}`), 'utf-8');
    fse.writeFileSync(configName, configContent);
    console.log(symbols.success, chalk.green(`${configName} config add successful.`));
    process.exit();
  });
}

// 解析命令行参数
program.parse(process.argv);
