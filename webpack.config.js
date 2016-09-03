var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/js/client');
var APP_DIR = path.resolve(__dirname, 'client/scripts');

const uglify = new webpack.optimize.UglifyJsPlugin({
	compress: {
		warnings: false,
	},
});

const nodeEnv = new webpack.DefinePlugin({
	'process.env': {
		NODE_ENV: JSON.stringify('production'),
	},
});

var config = {
	entry: APP_DIR + '/app.js',
	output: {
		path: BUILD_DIR,
		filename: 'app.js',
	},
	module: {
		loaders: [{
			test: /\.jsx?/,
			include: APP_DIR,
			loader: 'babel',
		}],
	},
};

if (process.env.NODE_ENV === 'production') {
	config.plugins = [uglify, nodeEnv];
}

module.exports = config;
