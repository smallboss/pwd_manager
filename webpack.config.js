const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 0;

module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            { test: /\.js$/,  exclude: [/node_modules/, /public/], loaders: ["react-hot-loader", "babel-loader"] },
            { test: /\.css$/, exclude: [/node_modules/, /public/], loaders: ["style-loader", "css-loader", "autoprefixer-loader"] },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: path.join(__dirname, 'public', 'index.html'),
            template: path.join(__dirname, 'src', 'index.html')
        })
    ]
};

if(NODE_ENV){
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({compress:{ warnings: false }})
    );
}