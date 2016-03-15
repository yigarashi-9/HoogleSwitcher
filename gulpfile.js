var browserify = require('browserify');
var es = require('event-stream');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var zip = require('gulp-zip');

var js_path = './src/js/';
var js_files = [
  'popup.js',
  'options.js',
  'background.js'
]

gulp.task('build', function(){
  var tasks = js_files.map(function(entry){
    return browserify({entries: [js_path + entry]})
      .bundle()
      .pipe(source(entry))
      .pipe(gulp.dest('./apps/js'));
  });
  return es.merge.apply(null, tasks);
})

gulp.task('test', function(){
  return gulp.src('./src/js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('zip', function(){
  return gulp.src(['./apps/**/*', 'manifest.json'])
    .pipe(zip('apps.zip'))
    .pipe(gulp.dest('./'))
});

gulp.task('pack', ['build', 'zip']);
