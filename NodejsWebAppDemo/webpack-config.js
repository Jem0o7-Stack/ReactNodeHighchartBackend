'use strict';
var path = require('path');
//var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: "./src/js/index.js",
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "./app-bundle.js",
        publicPath: '/'
    },
    resolve: {
        extensions: ['.Webpack.js', '.web.js', '.ts', '.js', '.jsx', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,         // Match both .js and .jsx files
                exclude: [/node_modules/],
                    
                loader: "babel-loader",
                query:
                    {
                        presets: ['react']
                    }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]       
    }
   
}