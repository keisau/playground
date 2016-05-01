import gulp from 'gulp'
import webpack from 'gulp-webpack'

import { client, server } from './webpack.config.babel'

gulp.task('build:client', () =>
	gulp.src(client.entry.index)
	.pipe(webpack(client))
	.pipe(gulp.dest(client.output.path))
)

gulp.task('build:server', () =>
	gulp.src(server.entry.app)
	.pipe(webpack(server))
	.pipe(gulp.dest(server.output.path))
)

gulp.task('build:production', [ 'build:client', 'build:server' ])
