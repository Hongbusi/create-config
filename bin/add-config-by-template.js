const resolve = require('path').resolve;
const fse = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const symbols = require('log-symbols');

function addConfigByTemplate(templateName) {
  const configTemplates = {
    editorconfig: '.editorconfig',
    gitignore: '.gitignore'
  }

  const configName = configTemplates[templateName];

  try {
    const exists = fse.pathExistsSync(configName);
    exists ? overwriteExistingConfigFile(configName) : createConfigFile(configName);
  } catch (error) {
    console.log(symbols.error, chalk.red(console.error(error)));
  }
}

function overwriteExistingConfigFile(name) {
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `The '${name}' file already exists. Do you want to overwrite it?`
    }
  ]).then(({ confirm }) => {
    confirm ? createConfigFile(name) : process.exit();
  });
}

function createConfigFile(name) {
  try {
    fse.copySync(resolve(__dirname, `./configs-template/${name}`), name);
    console.log(symbols.success, chalk.green(`'${name}' file add successful.`));
    process.exit();
  } catch (error) {
    console.log(symbols.error, chalk.red(console.error(error)));
  }
}

module.exports = addConfigByTemplate;
