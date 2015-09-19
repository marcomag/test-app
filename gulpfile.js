var gulp        = require('gulp');
var gutil       = require('gulp-util');
var jshint      = require('gulp-jshint');
var compass     = require('gulp-compass');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

gulp.task('bsync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("**/*.html").on("change", browserSync.reload);
    gulp.watch('**/*.js', ['jshint']);
    gulp.watch('**/*.scss', ['compass']);
});

gulp.task('jshint', function() {
    return gulp.src(['**/*.js', '!js/vendors/**', '!bower_components/**', '!node_modules/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(reload({stream: true}));
});

gulp.task('compass', function() {
    gulp.src('scss/**/*.scss')
    .pipe(compass({
        config_file: 'config.rb',
        css: 'css',
        sass: 'scss'
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['jshint', 'bsync', 'compass']);
