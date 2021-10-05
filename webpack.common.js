const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv')

const WEB_BASE_URL = process.env.NODE_ENV !== 'production' ? '/' : process.env.PROD_WEB_BASE_CONTEXT_PATH

module.exports = {
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components/'),
            '@utilities': path.resolve(__dirname, 'src/utils/'),
            '@assets': path.resolve(__dirname, 'src/assets/'),
        },
    },
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: WEB_BASE_URL,
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage',
                                        corejs: 3,
                                        targets: '> 0.25%, not dead',
                                    },
                                ],
                                '@babel/preset-react',
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|mtl|obj)$/,
                use: [require.resolve('url-loader')],
            },
            {
                test: /.(css|less)$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.config().parsed),
        }),
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            filename: './index.html',
            favicon: './src/favicon.ico',
            web_base_url: process.env.PROD_WEB_BASE_CONTEXT_PATH,
        }),
    ],
}
