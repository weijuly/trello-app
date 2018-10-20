module.exports = {
    entry: './src/client.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }]
    },
    resolve: {
        extensions: ['.js', '.json']
    }
};