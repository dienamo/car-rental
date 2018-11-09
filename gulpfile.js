const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

gulp.task('sass', function() {
    gulp.src('src/styles/*.scss')
        .pipe(sass({outputStyle: 'compressed'})).on('error', sass.logError)
        .pipe(concat('style.css')) // this is what was missing
        .pipe(gulp.dest('./public/css')); // output to theme root
});

gulp.task('default', function () {
    gulp.watch('src/styles/*.scss', ['sass']);
});
