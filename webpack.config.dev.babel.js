import webpack from 'webpack'
import path from 'path'

const buildPath = __dirname

export default {
	entry: [ path.resolve(__dirname, 'src', 'js', 'index.js') ],
	output: {
		filename: 'bundle.js',
		libraryTarget: 'umd',
		path: buildPath,
		publicPath: '/'
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
			{ test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?name=assets/[hash:8].[ext]&limit=100000&minetype=application/font-woff' },
			{ test: /\.(ttf|eot)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=assets/[hash:8].[ext]' },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=assets/[hash:8].[ext]' },
			{ test: /\.(png|jpe?g|gif)$/, loader: 'url?limit=16384&name=assets/images/[hash:8].[ext]' },
			{ test: /\.css$/, loader: 'style!css!resolve-url?name=[hash:8].[ext]' },
			{ test: /\.scss$/, loader: 'style!css!sass!resolve-url?name=[hash:8].[ext]!sass?sourceMap' },
			{ test: /\.json$/, loader: 'json' },
		]
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
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'dev'),
			}
		})
	],
	debug: true,
	devtool: 'eval-source-map'
}
