const resolve = require('path').resolve;
const fse = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const symbols = require('log-symbols');

const configTemplates = {
  editorconfig: '.editorconfig',
  gitignore: '.gitignore'
};

function addConfigByTemplate(templateName) {
  const configName = configTemplates[templateName];

  try {
    const exists = fse.pathExistsSync(configName);
    exists ? overwriteExistingConfigFile(templateName) : createConfigFile(templateName);
  } catch (error) {
    console.log(symbols.error, chalk.red(console.error(error)));
  }
}

function overwriteExistingConfigFile(name) {
  const configName = configTemplates[name];

  inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `The '${configName}' file already exists. Do you want to overwrite it?`
    }
  ]).then(({ confirm }) => {
    confirm ? createConfigFile(name) : process.exit();
  });
}

function createConfigFile(name) {
  const configName = configTemplates[name];

  try {
    fse.copySync(resolve(__dirname, `./configs-template/${name}`), configName);
    console.log(symbols.success, chalk.green(`'${configName}' file add successful.`));
    process.exit();
  } catch (error) {
    console.log(symbols.error, chalk.red(console.error(error)));
  }
}

module.exports = addConfigByTemplate;
