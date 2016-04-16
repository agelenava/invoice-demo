var path = require('path');
var webpack = require('webpack');

var config = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'public/js'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    externals: {
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            query: {
                plugins: ['transform-runtime'],
                presets: ['es2015', 'stage-0', 'react'],
            },
            exclude: /node_modules/,
            include: __dirname
        },
            {
                test: /\.(s?)css$/,
                loaders: ['style', 'css', 'sass'],
                exclude: /node_modules/,
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url?limit=10000!img?progressive=true',
                exclude: /node_modules/,
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file" }]
    }
};

if (process.env.NODE_ENV === 'production') {
    config.bail = true;
    config.debug = false;
    config.profile = false;
    config.devtool = false;
    config.plugins.push(new webpack.optimize.OccurenceOrderPlugin(true));
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({output:{comments: false}}));
    config.entry = ['./index'];
}

module.exports = config;
