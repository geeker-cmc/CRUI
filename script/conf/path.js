const path = require('path');
const fs = require('fs');


const appDirectiry = fs.realpathSync(process.cwd());//process.cwd()返回当前目录路径 

const resolveApp = relativePath => path.resolve(appDirectiry, relativePath);

const exists = _path => fs.existsSync(_path);//当前路径是否存在

const isDir = _path => exists(_path) && fs.statSync(_path).isDirectory();


module.exports = {
    appHtml: resolveApp('script/public/index.html'),
    appIndexJs: resolveApp('docs/index.js'),
    appSrc: resolveApp('docs/index.js'),
    appDocs: resolveApp('docs')
}