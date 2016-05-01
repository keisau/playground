import webpack from 'webpack'
import path from 'path'

const jsPath = path.resolve(__dirname, 'src', 'js')
const buildPath = path.resolve(__dirname, 'dist')

const defineEnvPlugin = new webpack.DefinePlugin({
	'process.env': {
		'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'dev'),
	}
})
const plugins = [
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.UglifyJsPlugin({
		compress: { warnings: false }
	}),
	new webpack.optimize.OccurrenceOrderPlugin(),
	defineEnvPlugin
]

const output = {
	filename: '[name].js',
	libraryTarget: 'umd',
	path: buildPath,
	publicPath: '/'
}

const clientLoaders = [
	{ test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
	{ test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?name=assets/[hash:8].[ext]&limit=100000&minetype=application/font-woff' },
	{ test: /\.(ttf|eot)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=assets/[hash:8].[ext]' },
	{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=assets/[hash:8].[ext]' },
	{ test: /\.(png|jpe?g|gif)$/, loader: 'url?limit=16384&name=assets/images/[hash:8].[ext]' },
	{ test: /\.css$/, loader: 'style!css!resolve-url?name=[hash:8].[ext]' },
	{ test: /\.scss$/, loader: 'style!css!sass!resolve-url?name=[hash:8].[ext]!sass?sourceMap' },
	{ test: /\.json$/, loader: 'json' }
]

export const devServer = {
	entry: [ path.resolve(jsPath, 'index.js') ],
	output,
	module: {
		loaders: clientLoaders
	},
	devServer: {
		contentBase: buildPath,
		stats: {
			colors: true
		},
		inline: true,
		proxy: false,
		port: 8090,
		historyApiFallback: true
	},
	plugins: [ defineEnvPlugin ],
	debug: true,
	devtool: 'source-map'
}

export const client = {
	entry: {
		index: path.resolve(jsPath, 'index.js'),
	},
	output,
	module: {
		loaders: clientLoaders
	},
	plugins
}

export const server = {
	entry: {
		app: path.resolve(jsPath, 'app.js')
	},
	target: 'node',
	output,
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
			{ test: /\.json$/, loader: 'json' }
		]
	},
	plugins,
	devtool: 'source-map'
}

export default devServer
