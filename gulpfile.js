var gulp        = require('gulp');
var gutil       = require('gulp-util');
var jshint      = require('gulp-jshint');
var compass     = require('gulp-compass');
var browserify  = require('gulp-browserify');
var reactify    = require('reactify');
var react       = require('gulp-react');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

gulp.task('bsync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("**/*.html").on("change", browserSync.reload);
    gulp.watch(['js/**/*.js', '!js/vendors/**'], ['scripts', 'jshint']);
    gulp.watch('scss/**/*.scss', ['compass']);
});

gulp.task('jshint', function() {
    return gulp.src(['js/**/*.js', '!js/vendors/**'])
    .pipe(react())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', function() {
    gulp.src('js/app.js')
    .pipe(browserify({
        debug : false,
        transform: [reactify]
    }))
    .pipe(gulp.dest('./build/js'))
    .pipe(reload({stream: true}));
});

gulp.task('compass', function() {
    gulp.src('scss/app.scss')
    .pipe(compass({
        config_file: 'config.rb',
        css: 'build/css',
        sass: 'scss'
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['compass', 'bsync']);
gulp.task('heroku', ['compass', 'scripts']);
