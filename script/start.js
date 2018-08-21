import detect from 'detect-port'
import webpack from 'webpack'
import 'colors-cli/toxic'
import load from 'loading-cli'
import prepareUrls from 'local-ip-url/prepareUrls'

import { PORT } from './constant'
// import conf from './conf/webpack.config.dev'

const HOST = '0.0.0.0'

const loading = load(`Compiler is running...`.red).start();
loading.color = 'blue'

let start = async () => {
    let port = await detect(PORT);
    console.log(port, '里面的')

    console.log(process.env.HTTPS, 'https');
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const urls = prepareUrls({ protocol, host: HOST, port: PORT });

    console.log(`Dev Server Listening at Local: ${urls.localUrl.green}`);
    console.log(`              On Your Network: ${urls.lanUrl.green}`);
    loading.stop();

}
start();

console.log(PORT)

