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
    const exists = fse.pathExistsSync(configName);

    exists ? overwrite(configName) : writeConfigFile(configName);
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
  const configContent = fse.readFileSync(path.resolve(__dirname, `../config/${configName}`), 'utf-8');
  fse.writeFileSync(configName, configContent);
  console.log(symbols.success, chalk.green(`${configName} config add successful.`));
  process.exit();
}

module.exports = addConfig;
