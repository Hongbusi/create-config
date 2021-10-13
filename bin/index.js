#!/usr/bin/env node

const path = require('path');
const fse = require('fs-extra');
const program = require('commander');


const packageObj = fse.readJSONSync(path.resolve(__dirname, '../package.json'));

// version
program.version(packageObj.version, '-v, --version');
