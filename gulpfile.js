let gulp = require('gulp');
let sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('sass', () => {
    return gulp.src('app/scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
          stream: true
        }))
});

gulp.task('watch', () => {
    gulp.watch('app/scss/main.scss', gulp.series('sass'));
});

