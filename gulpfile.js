var gulp = require('gulp'), // Сообственно Gulp JS
    csso = require('gulp-csso'), // Минификация CSS
//imagemin = require('gulp-imagemin'), // Минификация изображений
    uglify = require('gulp-uglify'), // Минификация JS
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    mainBowerFiles = require('main-bower-files'),
    gutil = require('gulp-util'),
    compass = require('gulp-compass');

// Собираем JS

//streamqueue({ objectMode: true },
//    gulp.src('./public/angular/config/*.js'),
//    gulp.src('./public/angular/services/**/*.js'),
//    gulp.src('./public/angular/modules/**/*.js'),
//    gulp.src('./public/angular/primitives/**/*.js'),
//    gulp.src('./public/js/**/*.js')
//)

gulp.task('js', function () {
    gulp.src(['./_dev/_scripts/*.js'])
        .pipe(concat('script.js')).on('error', log)
        .pipe(gulp.dest('./app/js')).on('error', log);
});

//gulp.task('sass', function () {
//    gulp.src(['./_dev/_sass/style.scss'])
//        .pipe(sass()).on('error', log)
//        .pipe(csso()).on('error', log)
//        .pipe(rename('style.min.css')).on('error', log)
//        .pipe(gulp.dest('./app/css')).on('error', log);
//});

gulp.task('sass', function () {
    gulp.src(['./_dev/_sass/*.scss'])
        .pipe(compass({
            css: './_dev/_sass',
            sass: './_dev/_sass'
        })).on('error', log)
        //.pipe(csso()).on('error', log)
        .pipe(rename('style.min.css')).on('error', log)
        .pipe(gulp.dest('./app/css')).on('error', log);
});

gulp.task("bower-files", function () {
    gulp.src(mainBowerFiles(
        {
            paths: {
                bowerDirectory: './_dev/_bower',
                bowerrc: '.bowerrc',
                bowerJson: 'bower.json'
            },
            includeDev: true,
            debugging: true
        }
    ))
        .pipe(gulp.dest("./app/js/vendor"));
});

gulp.task('index', function () {
    gulp.src('./_dev/_jade/_pages/*.html').on('error', log)
        .pipe(gulp.dest('./app')).on('error', log);
    gulp.src('./_dev/_sass/img/*').on('error', log)
        .pipe(gulp.dest('./app/css/img')).on('error', log);
});

gulp.task('img', function () {
    gulp.src('./_dev/_sass/img/*').on('error', log)
        .pipe(gulp.dest('./app/css/img')).on('error', log);
});

gulp.task('watch', function () {
    gulp.watch('./_dev/_sass/*.scss', ['sass']);
    gulp.watch('./_dev/_scripts/*.js', ['js']);
    gulp.watch('./_dev/_bower/**/*', ['bower-files']);
    gulp.watch('./_dev/_jade/_pages/*.html', ['index']);
    gulp.watch('./_dev/_sass/img/*', ['img']);
});


function log(error) {
    console.log([
        '',
        "----------ERROR MESSAGE START----------".bold.red.underline,
        ("[" + error.name + " in " + error.plugin + "]").red.bold.inverse,
        error.message,
        "----------ERROR MESSAGE END----------".bold.red.underline,
        ''
    ].join('\n'));
    this.end();
}