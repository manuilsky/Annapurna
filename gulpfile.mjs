import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import sourcemaps from "gulp-sourcemaps";

const sass = gulpSass(dartSass);

const paths = {
  scss: "./scss/**/*.scss",
  css: "./dist/css/",
};

function compileSass() {
  return gulp
    .src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      }),
    )
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.css));
}

function watchFiles() {
  gulp.watch(paths.scss, compileSass);
}

export default gulp.series(compileSass, watchFiles);
export { watchFiles, compileSass };
