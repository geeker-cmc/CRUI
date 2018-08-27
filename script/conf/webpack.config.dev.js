import webpack from 'webpack'
import path from 'path'
import loaderUtils from 'loader-utils';
import paths from './path'
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes'
import autoprefixer from 'autoprefixer'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import FriendlyErrorsWebpackPlugin from '@nuxtjs/friendly-errors-webpack-plugin'
import pkg from '../../package.json'

export default {
    mode: 'development',
    entry: [
        require.resolve('react-hot-loader/patch'),
        require.resolve('webpack-hot-dev-clients/webpackHotDevClient'),
        paths.appIndexJs
    ],
    output: {
        publicPath: '/',
        filename: 'js/[name].js'
    },
    resolve: {
        alias: { }
    },
    module: {
        strictExportPresence: true,
        rules: [
            { 
                test: /\.(js|mjs|jsx)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            eslintPath: require.resolve('eslint'),
                            configFile: require.resolve('../../.eslintrc.js')
                        },
                        loader: require.resolve('eslint-loader')
                    }
                ],
                include: paths.appSrc
            },
            {
                oneOf: [
                    {
                        test: /\.(css|less)$/,
                        use: [
                            require.resolve('style-loader'),
                            {
                                loader: require.resolve('css-loader'),
                                options: { importLoaders: 1}
                            },
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    ident: 'postcss',
                                    plugins: () => [
                                        postcssFlexbugsFixes,
                                        autoprefixer({
                                            browsers: [
                                              '>1%',
                                              'last 4 versions',
                                              'Firefox ESR',
                                            ],
                                            flexbox: 'no-2009',
                                          }),
                                    ]
                                }
                            },
                            require.resolve('resolve-url-loader'),
                            require.resolve('less-loader')
                        ]
                    },
                    {
                        test: /\.(png|jpg)(\?.+)?$/,
                        use: [
                            {
                                loader: require.resolve('file-loader')
                            }
                        ]
                    },
                    {
                        test: /\.(js|jsx|mjs)$/,
                        include: [ paths.appDocs, paths.appSrc ],
                        loader: require.resolve('babel-loader'),
                        options: {
                            cacheDirectory: true,
                            plugins: ['react-hot-loader/babel']
                        }
                    },
                    {
                        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
                        use: [
                            {
                                loader: require.resolve('file-loader'),
                                options: {
                                    name: 'static/fonts/[name].[hash:8].[ext]'
                                }

                            }
                        ]
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml
        }),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(pkg.version)

        }),
        new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    ]
}