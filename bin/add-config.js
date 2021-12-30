const resolve = require('path').resolve;
const fse = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const symbols = require('log-symbols');

const configs = ['commitlint'];
const configsTemplate = fse.readdirSync(resolve(__dirname, './configs-template'));

const addConfigByTemplate = require('./add-config-by-template');
const addConfigByCommand = require('./add-config-by-command');

function addConfig() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'configName',
      message: 'Select config',
      choices: [...configs, ...configsTemplate]
    }
  ]).then(({ configName }) => {
    if (configsTemplate.includes(configName)) {
      addConfigByTemplate(configName);
      return;
    }

    if (configs.includes(configName)) {
      addConfigByCommand(configName);
      return;
    }

    console.log(symbols.info, chalk.red(`Invalid configuration name!
  Please go ${chalk.green('https://github.com/Hongbusi/create-config/issues')}, submit your comments.`));
    process.exit();
  });
}

module.exports = addConfig;
