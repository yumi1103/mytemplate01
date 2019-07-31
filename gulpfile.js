const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require('gulp-autoprefixer');
const coffee = require ('gulp-coffee');
const paths = {
  'src': {
    'sass': './sass/*.sass',
    'coffee': './coffee/*.coffee'
  },
  'dest': {
    'css': './css/',
    'js': './js/',
  }
};

function styles() {
  return (
    gulp
      .src(paths.src.sass)
      .pipe(
        sass({
          outputStyle: "expanded"
        })
          .on("error", sass.logError)
      )
      .pipe(autoprefixer({browsers: ["last 2 versions", "ie >= 11", "Android >= 6","ios_saf >= 11"]}))
      .pipe(gulp.dest(paths.dest.css))
  );
}

function scripts() {
  return (
    gulp
      .src(paths.src.coffee)
      .pipe(
        coffee()
      )
      .pipe(gulp.dest(paths.dest.js))
  );
}

function watchFiles() {
  gulp.watch(paths.src.sass).on('change', gulp.series(styles));
  gulp.watch(paths.src.coffee).on('change', gulp.series(scripts));
}

gulp.task('default', gulp.series(watchFiles));