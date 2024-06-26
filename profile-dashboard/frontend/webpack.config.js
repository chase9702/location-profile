const path = require('path');
const Dotenv = require('dotenv-webpack');
const crypto = require('crypto');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');


const theme = require('./theme');
const {ProvidePlugin} = require("webpack");

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
                isProduction
                    ? new TerserPlugin({
                        terserOptions: {
                            compress: {
                                drop_console: true,
                            },
                        },
                    })
                    : null,
            ].filter(Boolean),
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
                            return (module.size() > 80000 && /node_modules[/\\]/.test(module.identifier()));
                        },
                        name(module) {
                            const hash = crypto.createHash('sha1');
                            hash.update(module.libIdent({context: __dirname}));
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
                    use: 'babel-loader',
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: !isProduction,
                            },
                        },
                    ],
                },
                {
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: !isProduction,
                            },
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: !isProduction,
                                lessOptions: {
                                    modifyVars: theme,
                                    javascriptEnabled: true,
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|svg)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name][ext]',
                    },
                },
            ],
        },
        plugins: [
            new Dotenv(),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                filename: path.resolve(outputPath, 'index.html')
            }),
            new ProvidePlugin({
                process: 'process/browser',
            }),
            new MiniCssExtractPlugin({
                filename: isProduction ? 'css/[name].[contenthash].css' : 'css/[name].css',
            }),
            isProduction &&
            new CompressionPlugin({
                algorithm: 'gzip',
                test: /\.(js|css|html|svg)$/,
                threshold: 10240,
                minRatio: 0.8,
            }),
        ].filter(Boolean),
    };

    if (config.mode === 'development') {
        config.plugins = [
            ...config.plugins,
            new BundleAnalyzerPlugin({
                openAnalyzer: false
            })
        ];

        config.devServer = {
            static: {
                directory: outputPath // 정적 파일 경로
            },
            host: 'localhost',
            port: 3000,
            // open: true,
            historyApiFallback: true,
            proxy: [{
                context: ['/api', '/login', '/logout'],
                // context: ['/api'],
                target: 'http://localhost:8080',
                secure: false
            }],
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
                // https: true
            }
        };
        config.devtool = 'inline-source-map';
    }

    return config;
};
