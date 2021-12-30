const resolve = require('path').resolve;
const fse = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const symbols = require('log-symbols');

const configs = ['commitlint'];
const configsTemplate = fse.readdirSync(resolve(__dirname, './configs-template'));

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
      addTemplateConfig(configName);
      return;
    }

    if (configs.includes(configName)) {
      addConfigViaCommand(configName);
      return;
    }

    console.log(symbols.info, chalk.red(`Invalid configuration name!
  Please go ${chalk.green('https://github.com/Hongbusi/create-config/issues')}, submit your comments.`));
    process.exit();
  });
}

function addTemplateConfig(name) {
  try {
    const exists = fse.pathExistsSync(name);
    exists ? overwrite(name) : writeConfigFile(name);
  } catch (error) {
    console.log(symbols.error, chalk.red(console.error(error)));
  }
}

function overwrite(name) {
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `The '${name}' file already exists. Do you want to overwrite it?`
    }
  ]).then(({ confirm }) => {
    confirm ? writeConfigFile(name) : process.exit();
  });
}

function writeConfigFile(name) {
  try {
    fse.copySync(resolve(__dirname, `./configs-template/${name}`), name);
    console.log(symbols.success, chalk.green(`'${name}' file add successful.`));
    process.exit();
  } catch (error) {
    console.log(symbols.error, chalk.red(console.error(error)));
  }
}

function addConfigViaCommand(name) {
  const funs = {
    commitlint: addCommitlint,
  };

  funs[name]();
}

function addCommitlint() {
  console.log('addCommitlint');
}

module.exports = addConfig;
