var browserify = require('browserify');
var es = require('event-stream');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var watchify = require('gulp-watchify');
var zip = require('gulp-zip');

var path = {
  'src': './src/js/*.js',
  'dest': './apps/js/',
  'appSrc': ['./apps/**/*', 'manifest.json'],
  'appZip': 'apps.zip',
  'appDest': './'
}

var watching = false;
gulp.task('enable-watch', function(){ watching = true; });

gulp.task('browserify', watchify(function(watchify){
  return gulp.src(path.src)
    .pipe(watchify({watch: watching}))
    .pipe(gulp.dest(path.dest));
}));

gulp.task('watchify', ['enable-watch', 'browserify']);

gulp.task('test', function(){
  return gulp.src(path.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('zip', function(){
  return gulp.src(path.appSrc)
    .pipe(zip(path.appZip))
    .pipe(gulp.dest(path.appDest))
});

gulp.task('pack', ['browserify', 'zip']);
