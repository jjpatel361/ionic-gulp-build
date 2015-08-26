var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var ngAnnotate = require('gulp-ng-annotate');
var uglify=require('gulp-uglify');
var minifyHTML=require('gulp-minify-html');
var runSequence = require('run-sequence');


var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

/*Common tasks*/

var inputfilePaths={
    css:['www/css/**/*'],
    img:['www/img/**/*'],
    js:['www/js/**/*'],
    html:['www/templates/**/*'],
    basehtml:['www/index.html'],
    libs:['www/lib/**/*']

}
var outputfilePaths={
    css:'www-dist/css',
    img:'www-dist/img',
    js:'www-dist/js',
    html:'www-dist/templates',
    libs:'www-dist/lib',
    basehtml:'www-dist/'
}

gulp.task('lint', function() {
  return gulp.src('./www/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

/*Simply move files to destination*/
gulp.task('move-files',function () {
      return gulp.src(inputfilePaths.libs)
              .pipe(gulp.dest(outputfilePaths.libs))
})

gulp.task('minify-css',function () {
    return gulp.src(inputfilePaths.css)
          .pipe(minifyCss({keepSpecialComments: 0}))
          //.pipe(rename({ extname: '.min.css' }))
          .pipe(gulp.dest(outputfilePaths.css))
});

gulp.task('compress-img',function () {
    return gulp.src(inputfilePaths.img)
          .pipe(imagemin())
          .pipe(gulp.dest(outputfilePaths.img))
});

gulp.task('minify-js',function () {
    return gulp.src(inputfilePaths.js)
           .pipe(ngAnnotate())
           .pipe(uglify())
           .pipe(gulp.dest(outputfilePaths.js))
});

//Compress index.html
gulp.task('move-index',function () {
  //You can minify index.html as well
  return gulp.src(inputfilePaths.basehtml)
     .pipe(gulp.dest(outputfilePaths.basehtml))
});

gulp.task('minify-html',['move-index'],function () {
    return gulp.src(inputfilePaths.html)
           .pipe(minifyHTML())
           .pipe(gulp.dest(outputfilePaths.html))
});

gulp.task('build-prod',function () {
    runSequence('minify-html','minify-js','compress-img','minify-css','move-files');
})
