'use strict';

const rimraf = require('rimraf')
const path = require('path')

rimraf.sync(path.join(process.cwd(), 'lib'));