'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('欢迎使用minigame-cli');

_commander2.default.version(require('../../package.json').version, '-v, --version').usage('<command> [options]');

_commander2.default.command('build').description('build your project').action(require('./wepy-build')).option('-f, --file <file>', '待编译wpy文件').option('-s, --source <source>', '源码目录').option('-t, --target <target>', '生成代码目录').option('-o, --output <type>', '编译类型：web，weapp。默认为weapp').option('-p, --platform <type>', '编译平台：browser, wechat，qq。默认为browser').option('-w, --watch', '监听文件改动').option('--no-cache', '对于引用到的文件，即使无改动也会再次编译');

_commander2.default.parse(process.argv);