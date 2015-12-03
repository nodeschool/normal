var gulp = require('gulp'), 
      gp = require('gulp-load-plugins')({
             rename: {
               'gulp-ruby-sass': 'sass'
             }
           });

var config = {
     sassPath: './sass',
     otherDir: './other_components'
}

gulp.task('connect', function() {
	gp.connect.server({
		root: [
			'./'
		],
		livereload: true
	});
});

gulp.task('reload', function () {
  gulp.src(['./*.html','./img/*'])
    .pipe(gp.connect.reload());
});

gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['css','reload']); 
     gulp.watch(['./index.html'], ['reload']); 
});

gulp.task('css', function() { 
  return gp.sass('./sass/style.scss', {
             style: 'compressed',
             loadPath: [
                 './sass',
                 config.otherDir + '/bootstrap/scss',
                 config.bowerDir + '/font-awesome/scss',
             ]
         })
    .on('error', gp.sass.logError)
    .pipe(gulp.dest('./css'));
});

  gulp.task('default', ['css']);
  gulp.task('serve', ['connect', 'watch']);
