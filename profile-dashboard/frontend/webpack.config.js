const path = require('path');
const Dotenv = require('dotenv-webpack');
const crypto = require('crypto');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const theme = require('./theme');
const { ProvidePlugin } = require("webpack");

module.exports = (env, options) => {
    const outputPath = path.resolve(__dirname, 'build');
    const mode = !options.mode ? 'development' : options.mode;
    const outputFilename = mode === 'development' ? 'js/[name].js' : 'js/[name].[contenthash].js';

    const isProduction = options.mode === 'production';

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
            minimize: isProduction,
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        },
                    },
                }),
            ],
            splitChunks: {
                cacheGroups: {
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
                    kepler: {
                        test: /[\\/]node_modules[\\/]kepler.gl[\\/]/,
                        name: 'kepler',
                        chunks: 'all',
                        enforce: true,
                        priority: 35
                    },
                    antv: {
                        test: /[\\/]node_modules[\\/]@antv[\\/]/,
                        name: 'antv',
                        chunks: 'all',
                        enforce: true,
                        priority: 30
                    },
                    deck: {
                        test: /[\\/]node_modules[\\/]@deck.gl[\\/]/,
                        name: 'deck',
                        chunks: 'all',
                        enforce: true,
                        priority: 33
                    },
                    loaders: {
                        test: /[\\/]node_modules[\\/]@loaders.gl[\\/]/,
                        name: 'loaders',
                        chunks: 'all',
                        enforce: true,
                        priority: 31
                    },
                    lib: {
                        test(module) {
                            return module.size() > 80000 && /node_modules[\\/]/.test(module.identifier());
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
            },
            runtimeChunk: 'single',
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
                        'style-loader',
                        'css-loader',
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        'style-loader',
                        'css-loader',
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
                filename: path.resolve(outputPath, 'index.html'),
                inject: true,
                chunksSortMode: 'auto',
            }),
            new ProvidePlugin({
                process: 'process/browser',
            }),
            new CleanWebpackPlugin(),
            new webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: path.resolve(__dirname, 'build/bundle-report.html'),
                openAnalyzer: false,
                generateStatsFile: true,
                statsFilename: path.resolve(outputPath, 'stats.json'),
                statsOptions: { source: false }
            }),
        ],
    };

    if (config.mode === 'development') {
        config.plugins.push(
            new BundleAnalyzerPlugin({
                openAnalyzer: false
            })
        );

        config.devServer = {
            static: {
                directory: outputPath,
            },
            host: 'localhost',
            port: 3000,
            historyApiFallback: true,
            proxy: [{
                context: ['/api', '/login', '/logout'],
                target: 'http://localhost:8080',
                secure: false
            }],
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
            }
        };
        config.devtool = 'inline-source-map';
    }

    return config;
};
