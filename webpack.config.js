const NodemonPlugin = require('nodemon-webpack-plugin');
const path = require('path');
const fs = require('fs');

const env = process.env.NODE_ENV || 'development';
const isProduction = env !== 'development';

const externals = {};
fs.readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => {externals[mod] = `commonjs ${mod}`; });

module.exports = {
    externals,
    context: path.resolve('./src'),
    target: 'node',
    mode: env,
    entry: {
        index: './index.ts',
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
        sourceMapFilename: '[name].map',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve('./src'), 'node_modules'],
        alias: {
            routes: path.resolve(__dirname, 'src/routes/'),
            models: path.resolve(__dirname, 'src/models/'),
            services: path.resolve(__dirname, 'src/services/'),
        },
    },
    plugins: [
        !isProduction && new NodemonPlugin()
    ]
};
