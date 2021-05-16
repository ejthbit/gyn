const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const DEFAULT_TARGET_ENV = 'http://localhost:3000'
const TARGET_ENV = {
    localhost: {
        API_BASE_URL: 'https://localhost:8080',
        WEB_BASE_URL: 'http://localhost:3000',
    },
    [DEFAULT_TARGET_ENV]: {
        API_BASE_URL: 'https://heroku.com',
        WEB_BASE_URL: 'https://vanek-gynekologie.cz/',
    },
}

const TARGET_ENV_CONFIG = TARGET_ENV[process.env.TARGET_ENV || DEFAULT_TARGET_ENV]
const ROUTES_PUBLIC_PATH = TARGET_ENV_CONFIG.PUBLIC_PATH || '/'

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        clientLogLevel: 'silent',
        port: 9000,
        historyApiFallback: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: 'defaults',
                                    },
                                ],
                                '@babel/preset-react',
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            API_BASE_URL: TARGET_ENV_CONFIG.API_BASE_URL,
            WEB_BASE_URL: TARGET_ENV_CONFIG.WEB_BASE_URL,
            ROUTES_PUBLIC_PATH,
        }),
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            filename: './index.html',
        }),
    ],
}
