var gulp = require('gulp');
var cache = require('gulp-cached');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
// var minify = require('gulp-minifier');

gulp.task('third-party', function() {
  try {

    gulp.src(['./node_modules/bulma/**/*.css', './node_modules/bulma/**/*.sass'])
      .pipe(cache('bulma'))
      .pipe(gulp.dest('./app/lib/bulma'));

    // gulp.src(['./node_modules/jquery/dist/*.js', './node_modules/jquery/dist/*.js'])
    //   .pipe(cache('jquery'))
    //   .pipe(gulp.dest('./app/lib/jquery'));
  }
  catch (e) {
    return -1;
  }
  return 0;
});

gulp.task('styles', function() {
  gulp.src('./app/lib/bulma/bulma.sass')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./app/css'));

  gulp.src('./app/scss/styles.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.reload({stream: true}));
});

// gulp.task('scripts', function() {
//   gulp.src('./app/lib/jquery/jquery.js')
//     .pipe(gulp.dest('./app/js'));
// });

// gulp.task('minifier', function() {
//   gulp.src(['./app/css/*.*', './app/js/*.*']).pipe(minify({
//     minify: true,
//     collapseWhitespace: true,
//     conservativeCollapse: true,
//     minifyJS: true,
//     minifyCSS: true,
//     getKeptComment: function (content, filePath) {
//       var m = content.match(/\/\*![\s\S]*?\*\//img);
//       return m && m.join('\n') + '\n' || '';
//     }
//   })).pipe(gulp.dest('./dist'));
// });

gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  // gulp.watch('./app/js/*.js', ['scripts']);
  gulp.watch('./app/scss/*.scss', ['styles']);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
});

gulp.task('start', ['third-party', 'styles', 'serve']);
gulp.task('default', ['styles', 'serve']);