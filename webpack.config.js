const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (env) {
    if (env.mode === 'test') {
        return {
            mode: 'development',
            devtool: 'source-map',
            entry: {
                index: './example/index.js'
            },
            output: {
                path: path.resolve(__dirname, 'dist'),
                filename: 'index.[hash].js',
            },

            module: {
                rules: [
                    {
                        test: /.css$/,
                        loader: ['style-loader', 'css-loader']
                    },
                    {
                        test: /\.(png|jpg|gif)$/,
                        use: [
                            {
                                loader: 'url-loader',
                                options: {
                                    limit: 8192
                                }
                            }
                        ]
                    }
                ]
            },

            plugins: [
                new HtmlWebpackPlugin({
                    template: './example/index.html',
                }),
            ]
        }
    }

    else if (env.mode === 'build') {
        return {
            mode: 'production',
            entry: {
                index: './src/index.js'
            },
            output: {
                path: path.resolve(__dirname, 'build'),
                filename: 'ol-side-by-side.min.js',
                libraryTarget: 'umd',
                libraryExport: 'default',
                library: 'OlSideBySideControl'
            },
            externals: {
                ol: 'ol'
            },
            module: {
                rules: [
                    {
                        test: /.css$/,
                        use: [MiniCssExtractPlugin.loader, 'css-loader'],
                        //loader: ['style-loader', 'css-loader']
                    },
                    {
                        test: /\.(png|jpg|gif)$/,
                        use: [
                            {
                                loader: 'url-loader',
                                options: {
                                    limit: 8192
                                }
                            }
                        ]
                    }
                ]
            },  
            plugins: [
                new MiniCssExtractPlugin({
                    filename: 'ol-side-by-side.css',
                })
            ]  
        }
    }
}