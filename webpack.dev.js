const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        host: '192.168.0.45',
        open: true,
        clientLogLevel: 'silent',
        port: 9000,
        historyApiFallback: true,
        hot: true,
    },
    devtool: 'inline-source-map',
})
