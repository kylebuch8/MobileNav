var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'),
    runSequence = require('run-sequence');

gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: './app'
        }
    });

    gulp.watch(['./app/**/*.js', './app/**/*.html', './app/**/*.css']).on('change', browserSync.reload);
    gulp.watch('./app/**/*.less', ['less']);
});

gulp.task('less', function () {
    return gulp.src('./app/less/main.less')
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./app/styles'));
});

gulp.task('clean', function (cb) {
    del('./dist/**/*', cb);
});

gulp.task('clean:cordova', function (cb) {
    del('./cordova/www/**/*', cb);
});

gulp.task('copy', ['clean'], function () {
    return gulp.src(['./app/**/*', '!./app/less/**/*'], { base: './app' })
        .pipe(gulp.dest('./dist'));
});

gulp.task('copy:cordova', ['clean:cordova'], function () {
    return gulp.src(['./app/**/*', '!./app/less/**/*'], { base: './app' })
        .pipe(gulp.dest('./cordova/www'));
});

gulp.task('build:cordova', ['copy:cordova']);

gulp.task('default', []);
