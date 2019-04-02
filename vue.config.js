const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
    publicPath: '.',
    configureWebpack: config => {
        return {
            plugins: [
                new CompressionPlugin({
                    test: /\.js$|\.html$|\.css/,
                    threshold: 10240,
                    deleteOriginalAssets: false
                })
            ]
        }
    }
};