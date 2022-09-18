const gulp = require('gulp');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const connect = require('gulp-connect');
const sourcemaps = require('gulp-sourcemaps');

function compilePug(cb) {
    gulp.src('html/index.pug')
        .pipe(sourcemaps.init())
        .pipe(pug({ pretty: true }))
        .pipe(concat('index.html'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
    cb();
}

function compileSass(cb) {
    gulp.src('sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
    cb();
}

function compileJS(cb) {
    gulp.src('js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
    cb();
}

function conenct_and_watch(cb) {
    connect.server({
        port: 8000,
        root: './dist/',
        livereload: true,
    });

    gulp.watch('html/**/*.pug', compilePug);
    gulp.watch('sass/**/*.scss', compileSass);
    gulp.watch('sass/**/*.scss', compileSass);
    gulp.watch('js/**/*.js', compileJS);
    cb();
}

exports.default = conenct_and_watch;
