// Core
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const gulpIf = require('gulp-if');
const debug = require('gulp-debug');
const browserSync = require('browser-sync').create();

// Path
const scssPath = 'src/scss/**/*.scss';
const htmlPath = 'src/html/**/*.html';
const dest = 'public';

// Tasks
const scss = 'scss';
const html = 'html';
const watch = 'watch';

const isProduction = false;

gulp.task(scss, function () {
  return gulp
    .src(scssPath)
    .pipe(gulpIf(!isProduction, sourcemaps.init()))
    .pipe(autoprefixer())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('bundle.css'))
    .pipe(gulpIf(isProduction, cleanCss()))
    .pipe(gulpIf(!isProduction, sourcemaps.write()))
    .pipe(gulp.dest(`${dest}/css`));
});

gulp.task(html, function () {
  return gulp.src(htmlPath).pipe(gulp.dest(dest));
});

gulp.task(watch, function () {
  gulp.watch(scssPath, gulp.parallel([scss]));
  gulp.watch(htmlPath, gulp.parallel([html]));
});

gulp.task('default', gulp.series([scss, html, watch]));
