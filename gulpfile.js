var gulp = require('gulp');
var webpack = require('webpack-stream');
var sass = require('gulp-sass');

gulp.task('default', function() {
  return gulp.src('./src/js/client.js')
    .pipe(webpack({
    context: __dirname + "/src/js",
    entry: "./client.js",
    output: {
        path: __dirname + "/src/js",
        filename: "js/client.min.js",
    }}))
    .pipe(gulp.dest('dist/'))
});

gulp.task('sass', function () {
  return gulp.src('./src/css/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
