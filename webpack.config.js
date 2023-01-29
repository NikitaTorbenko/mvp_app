const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const path = require('path')

let mode = 'development'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}

module.exports = {
    mode: mode,

    entry: {
        main: path.join(process.cwd(), 'src', 'index.js')
    },

    output: {
        filename: '[name].[contenthash].js',
        assetModuleFilename: "assets/[hash][ext][query]",
        clean: true
    },

    devtool: (process.env.NODE_ENV === 'production') ? 'source-map' : 'eval',

    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(process.cwd(), 'src', 'index.pug')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
    ],

    module: {
        rules: [
            {
                test: /\.m?js$/i,
                exclude: /(node_modules|bower-components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.pug$/i,
                loader: "pug-loader",
                exclude: /(node_modules|bower-components)/
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource"
            },
            {
                test: /\.(png|svg|jpe?g|gif|tiff|webp)$/i,
                type: "asset/resource"
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: "file-loader",
                options: {
                    name: 'images/[name].[ext]'
                }
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    (mode === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {}
                                    ]
                                ]
                            }
                        }
                    },
                    'sass-loader'
                ],
            },
            {
                test: /\.html$/i,
                loader: "html-loader"
            }
        ],
    },
}