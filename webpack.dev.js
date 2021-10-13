const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        open: true,
        port: 9000,
        historyApiFallback: true,
        hot: true,
    },
    devtool: 'inline-source-map',
})
