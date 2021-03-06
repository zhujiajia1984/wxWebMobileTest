const path = require('path');

module.exports = {
    entry: ['babel-polyfill', 'whatwg-fetch', './src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: [path.join(__dirname, "dist"), path.join(__dirname)],
        port: 18357,
        historyApiFallback: true,
    },
    externals: {
        'wx': 'wx'
    },
    // devtool: 'source-map', // source-map
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        }, {
            test: /\.css$/,
            use: [
                { loader: "style-loader" },
                { loader: "css-loader" },
            ]
        }, {
            test: /\.less$/,
            use: [
                { loader: "style-loader" },
                { loader: "css-loader" },
                {
                    loader: "less-loader",
                    options: {
                        modifyVars: {
                            // '@brand-primary': '#1AAD19',
                            '@brand-primary': '#FBCF0B',
                            '@brand-primary-tap': '#FFE15F',
                        }
                    }
                }
            ]
        }, ]
    }
}