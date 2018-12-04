'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var watchReady = false;
var preventDup = {};

exports.default = {
    watch: function watch(cmd) {
        cmd.watch = false;

        var src = cmd.source || 'src';
        _chokidar2.default.watch('.' + _path2.default.sep + src, {}).on('all', function (evt, filepath) {
            if ((evt === 'change' || evt === 'add') && watchReady && !preventDup[filepath]) {
                // preventDup[filepath] = evt;
                // cmd.file = path.relative(src, filepath);
                // util.log('文件: ' + filepath, '变更');
                // this.build(cmd);
                // setTimeout(() => {
                //     preventDup[filepath] = false;
                // }, 500);
            }
        }).on('ready', function () {
            watchReady = true;
            util.log('开始监听文件改动。', '信息');
        });
    }
};