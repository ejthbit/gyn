const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv')

const DEFAULT_TARGET_ENV = 'http://localhost:9000'
const TARGET_ENV = {
    prod: {
        API_BASE_URL: 'https://heroku.com',
        WEB_BASE_URL: 'https://vanek-gynekologie.cz/',
    },
    [DEFAULT_TARGET_ENV]: {
        API_BASE_URL: 'http://localhost:8080/bookings',
        WEB_BASE_URL: 'http://localhost:9000',
    },
}

const TARGET_ENV_CONFIG = TARGET_ENV[process.env.TARGET_ENV || DEFAULT_TARGET_ENV]

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
        clean: true,
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
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.config().parsed),
        }),
        new webpack.EnvironmentPlugin({
            API_BASE_URL: TARGET_ENV_CONFIG.API_BASE_URL,
            WEB_BASE_URL: TARGET_ENV_CONFIG.WEB_BASE_URL,
        }),
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            filename: './index.html',
        }),
    ],
}
