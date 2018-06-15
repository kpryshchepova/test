var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');

var staticPathJS = ['public/js/*.js'];
var staticPathCSS = ['public/css/*.css'];

gulp.task('err', function() {
    return gulp.src(staticPathJS)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


gulp.task('css', function() {
    return gulp.src(staticPathCSS)
        .pipe(concat('all_css.css'))
        .pipe(gulp.dest('public/css/build'))
        .pipe(rename('all_css.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/css/build'));
});


gulp.task('scripts', function() {
    return gulp.src(staticPathJS)
        .pipe(concat('all_js.js'))
        .pipe(gulp.dest('public/js/build'))
        .pipe(rename('all_js.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js/build'));
});


gulp.task('watch', function() {
    gulp.watch(staticPathJS, ['err', 'scripts']);
    gulp.watch(staticPathCSS, ['err', 'css']);
});


gulp.task('default', ['err', 'css', 'scripts', 'watch']);