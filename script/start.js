import detect from 'detect-port'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import 'colors-cli/toxic'
import load from 'loading-cli'
import prepareUrls from 'local-ip-url/prepareUrls'
import OpenBrowsers from 'open-browsers'
import { PORT } from './constant'
import conf from './conf/webpack.config.dev'

// import conf from './conf/webpack.config.dev'

const HOST = '0.0.0.0'

const loading = load(`Compiler is running...`.red).start();
loading.color = 'blue'

const compiler = webpack(conf);

let start = async () => {
    let port = await detect(PORT);
    console.log(port, '里面的')

    console.log(process.env.HTTPS, 'https');
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const urls = prepareUrls({ protocol, host: HOST, port: PORT });

    compiler.hooks.done.tap('done', () => {
        loading.stop();
         /* eslint-disable */
    console.log(`Dev Server Listening at Local: ${urls.localUrl.green}`);
    console.log(`              On Your Network: ${urls.lanUrl.green}`);
    /* eslint-enable */
    })
    
    const devServer = new WebpackDevServer(compiler, {
        publicPath: conf.output.publicPath,
        hot: true,
        historyApiFallback: true,
        quiet: true
    })

    devServer.listen(PORT, HOST, err => {
        if(err){
            return console.log(err)
        }

        OpenBrowsers(urls.localUrl)

        [ 'SIGINT', 'SIGTERM' ].forEach(sig => {
            process.on(sig, () => {
                devServer.close();
                process.exit();
            })
        })
    })

}
start();

console.log(PORT)

