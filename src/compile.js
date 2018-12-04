import path from 'path';
import chokidar from 'chokidar';

let watchReady = false;
let preventDup = {};

export default {

    watch (cmd) {
        cmd.watch = false;
    
        let src = cmd.source || 'src';
        chokidar.watch(`.${path.sep}${src}`, {}).on('all', (evt, filepath) => {
            if ((evt === 'change' || evt === 'add') && watchReady && !preventDup[filepath]) {
                // preventDup[filepath] = evt;
                // cmd.file = path.relative(src, filepath);
                // util.log('文件: ' + filepath, '变更');
                // this.build(cmd);
                // setTimeout(() => {
                //     preventDup[filepath] = false;
                // }, 500);
            }
        }).on('ready', () => {
            watchReady = true;
            util.log('开始监听文件改动。', '信息');
        });
    }

}
