module.exports = {
    entry: './src/client.jsx',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },
    performance: {
        hints: false
    }
};