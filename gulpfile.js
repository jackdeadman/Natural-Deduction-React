var debug = process.env.NODE_ENV !== "production";
var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var sass = require('gulp-sass');
var rename = require("gulp-rename");


gulp.task('sass:production', function () {
  return gulp.src('src/css/*.sass')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('src/css/'));
});

gulp.task('sass:debug', function () {
  return gulp.src('src/css/*.sass')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('src/css/'));
});

gulp.task("webpack-dev-server", function(callback) {
  // Start a webpack-dev-server
  var config = require('./webpack.config.js');
  var compiler = webpack(config);

  new WebpackDevServer(compiler, {
    contentBase: "src",
    inline: true,
    hot: true
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

    // keep the server alive or continue?
    callback();
  });
});

gulp.task('sass:watch', function() {
  debug
    ? gulp.watch('src/css/*.sass', ['sass:debug'])
    : gulp.watch('src/css/*.sass', ['sass:production']);
});

gulp.task('default', ['sass:watch', 'webpack-dev-server']);
