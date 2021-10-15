const path = require('path');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const symbols = require('log-symbols');

function addConfig() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'configName',
      message: 'Select config',
      choices: fse.readdirSync(path.resolve(__dirname, '../config'))
    }
  ]).then(({ configName }) => {
    try {
      const exists = fse.pathExistsSync(configName);
      exists ? overwrite(configName) : writeConfigFile(configName);
    } catch (error) {
      console.log(symbols.error, chalk.red(console.error(error)));
    }
  });
}

function overwrite(configName) {
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `The '${configName}' file already exists. Do you want to overwrite it?`
    }
  ]).then(({ confirm }) => {
    confirm ? writeConfigFile(configName) : process.exit();
  });
}

function writeConfigFile(configName) {
  try {
    fse.copySync(path.resolve(__dirname, `../config/${configName}`), configName);
    console.log(symbols.success, chalk.green(`'${configName}' file add successful.`));
    process.exit();
  } catch (error) {
    console.log(symbols.error, chalk.red(console.error(error)));
  }
}

module.exports = addConfig;
