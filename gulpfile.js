let gulp = require('gulp');
let sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'docs'
    },
  })
})

gulp.task('sass', () => {
    return gulp.src('docs/scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('docs/css'))
        .pipe(browserSync.reload({
          stream: true
        }))
});

gulp.task('watch', () => {
    gulp.watch('docs/scss/main.scss', gulp.series('sass'));
});

