const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    entry: './src/index.js',
    mode: "development",
    output: {
        assetModuleFilename: 'images/[hash][ext][query]',
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './src/assets', to: './assets' },
            ]
        }),
    ],
};