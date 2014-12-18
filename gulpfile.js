var gulp = require('gulp'), // Сообственно Gulp JS
    csso = require('gulp-csso'), // Минификация CSS
//imagemin = require('gulp-imagemin'), // Минификация изображений
    uglify = require('gulp-uglify'), // Минификация JS
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    mainBowerFiles = require('main-bower-files'),
    gutil = require('gulp-util');

// Собираем JS
gulp.task('js', function () {
    gulp.src(['./_dev/_scripts/*.js'])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./app/js'));
});

gulp.task('sass', function () {
    gulp.src(['./_dev/_sass/style.scss'])
        .pipe(sass())
        .pipe(csso())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./app/css'));
});


gulp.task("bower-files", function () {
    gulp.src(mainBowerFiles(
        {
            paths: {
                bowerDirectory: './_dev/_bower',
                bowerrc: '.bowerrc',
                bowerJson: 'bower.json'
            },
            includeDev:true,
            debugging:true
        }
    ))
        .pipe(gulp.dest("./app/js/vendor"));
});

gulp.task('watch', function () {
    gulp.watch('./_dev/_sass/*.scss',['sass']);
    gulp.watch('./_dev/_scripts/*.js',['js']);
    gulp.watch('./_dev/_bower/**/*',['bower-files']);
});

//// Копируем и минимизируем изображения
//
//gulp.task('images', function() {
//    gulp.src('./assets/img/**/*')
//        .pipe(imagemin())
//        .pipe(gulp.dest('./public/img'))
//
//});