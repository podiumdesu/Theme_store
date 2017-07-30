const path = require('path');
module.export = {
	entry: __dirname + '/www/static/js/entry.js',
	output: {
        path: path.join(__dirname, '/www/static/dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.js|jsx$/, loaders: ['babel'] }
        ]
    }
}