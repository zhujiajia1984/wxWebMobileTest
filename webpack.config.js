const path = require('path');

module.exports = {
    entry: ['./src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 18357,
        historyApiFallback: true,
    },
    devtool: 'source-map', // source-map
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
                            '@brand-primary': '#1AAD19',
                            '@brand-primary-tap': '#179B16',
                        }
                    }
                }
            ]
        }, ]
    }
}