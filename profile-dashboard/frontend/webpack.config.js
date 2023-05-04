const path = require('path');
const Dotenv = require('dotenv-webpack');
const crypto = require('crypto');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const theme = require('./theme');

module.exports = (env, options) => {
    const outputPath = path.resolve(__dirname, 'build');
    const mode = !options.mode ? 'development' : options.mode;
    const outputFilename = mode === 'development' ? 'js/[name].js' : 'js/[name].[contenthash].js';

    const config = {
        mode: mode,
        entry: {
            app: ['./src/index.tsx']
        },
        output: {
            path: outputPath,
            publicPath: '/',
            filename: outputFilename,
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    default: false,
                    vendors: false,
                    defaultVendors: false,
                    core: {
                        test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                        name: 'core',
                        chunks: 'all',
                        priority: 60
                    },
                    antd: {
                        test: /[\\/]node_modules[\\/]antd[\\/]/,
                        name: 'antd',
                        chunks: 'all',
                        priority: 50
                    },
                    'ant-design': {
                        test: /[\\/]node_modules[\\/]@ant-design[\\/]/,
                        name: 'ant-design',
                        chunks: 'all',
                        enforce: true,
                        priority: 40
                    },
                    antv: {
                        test: /[\\/]node_modules[\\/]@antv[\\/]/,
                        name: 'antv',
                        chunks: 'all',
                        enforce: true,
                        priority: 30
                    },
                    lib: {
                        test(module) {
                            return (module.size() > 80000 && /node_modules[/\\]/.test(module.identifier()));
                        },
                        name(module) {
                            const hash = crypto.createHash('sha1');
                            hash.update(module.libIdent({ context: __dirname }));
                            return `common.${hash.digest('hex').substring(0, 8)}`;
                        },
                        chunks: 'all',
                        enforce: true,
                        priority: 20
                    },
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'commons',
                        chunks: 'all',
                        enforce: true,
                        priority: 10
                    }
                }
            }
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            alias: {
                '@src': path.resolve(__dirname, 'src')
            },
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'less-loader', // compiles less to css
                            options: {
                                sourceMap: true,
                                lessOptions: {
                                    modifyVars: theme,
                                    javascriptEnabled: true,
                                }
                            },
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'fonts/'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new Dotenv(),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                filename: path.resolve(outputPath, 'index.html')
            }),
        ],
    };

    if (config.mode === 'development') {
        config.plugins = [
            ...config.plugins,
            new BundleAnalyzerPlugin({
                openAnalyzer: false
            })
        ];

        config.devServer = {
            // hot: true,
            // inline: true,
            // contentBase: outputPath,
            // host: 'local-cube.kakao.com',
            port: 3000,
            // publicPath: '/',
            // open: true,
            // openPage: 'login',
            historyApiFallback: true,
            // proxy: [{
            //     context: ['/api', '/login', '/logout'],
            //     target: 'http://local-cube.kakao.com:8080',
            //     secure: false
            // }],
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
                https: true
            }
        };
        config.devtool = 'inline-source-map';
    }

    return config;
};
