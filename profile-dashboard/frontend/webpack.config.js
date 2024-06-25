const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');

const theme = require('./theme');

module.exports = (env, options) => {
    const isProduction = options.mode === 'production';
    const outputPath = path.resolve(__dirname, 'build');
    const config = {
        mode: isProduction ? 'production' : 'development',
        entry: './src/index.tsx',
        output: {
            path: outputPath,
            publicPath: '/',
            filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
        },
        optimization: {
            minimize: isProduction,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        },
                    },
                }),
                new CssMinimizerPlugin(),
            ],
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 20000,
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        reuseExistingChunk: true,
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                            return `npm.${packageName.replace('@', '')}`;
                        },
                    },
                },
            },
            runtimeChunk: 'single',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            alias: {
                '@src': path.resolve(__dirname, 'src'),
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
                filename: 'index.html',
                inject: true,
                chunksSortMode: 'auto',
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: isProduction ? 'css/[name].[contenthash].css' : 'css/[name].css',
            }),
            new webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/,
            }),
            isProduction &&
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: path.resolve(__dirname, 'build/bundle-report.html'),
                openAnalyzer: true,
                // generateStatsFile: true,
                // statsOptions: { source: false }
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
        config.plugins.push(
            new BundleAnalyzerPlugin({
                openAnalyzer: false
            })
        );

        config.devServer = {
            static: {
                directory: outputPath
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
    }

    config.devtool = 'inline-source-map';

    return config;
};
