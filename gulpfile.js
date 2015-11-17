var gulp = require('gulp'), 
    gp = require('gulp-load-plugins')({
      rename: {
        'gulp-ruby-sass': 'sass'
      }
    });

var config = {
     sassPath: './sass',
     bowerDir: './bower_components' ,
    otherDir: './other_components'
}

gulp.task('bower', function() { 
    return gp.bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*') 
        .pipe(gulp.dest('./fonts')); 
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

// Rerun the task when a file changes
 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
});

  gulp.task('default', ['bower', 'icons', 'css']);
