module.exports = {
    entry: './src/client/index.jsx',
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
        }, {
            test: /\.(ttf|eot|woff|woff2|otf|svg)$/,
            use: [
                'file-loader'
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