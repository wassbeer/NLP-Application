const gulp = require('gulp');

const babel = require('gulp-babel');
const gulpUtil = require('gulp-util');

const DIST_FOLDER = 'dist';

const USAGE = `
-----------------------------------------------------------------------------
*  NLP APPLICATION BUILD
*  NLP Application build main gulp file.
-----------------------------------------------------------------------------
`

gulp.task('scripts', () => {
  return gulp.src([
    'src/scripts/*'
  ])
  .pipe(babel())
  .pipe(gulp.dest(DIST_FOLDER + '/scripts'))
  .on('finish', () => {
    gulpUtil.log('Built and compiled folder scripts');
  });
});

gulp.task('test', () => {
  return gulp.src([
    'test/*'
  ])
  .pipe(babel())
  .pipe(gulp.dest(DIST_FOLDER + '/test'))
  .on('finish', () => {
    gulpUtil.log('Built and compiled folder test');
  });
});


gulp.task('default', (done) => {
  gulpUtil.log(gulpUtil.colors.cyan(USAGE));
  done();
});

gulp.task('build', gulp.parallel('scripts', 'test'));