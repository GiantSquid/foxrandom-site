var gulp = require('gulp');
var webserver = require('gulp-webserver');
var vulcanize = require('gulp-vulcanize');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');

gulp.task('default', function() {
    gulp.src('')
        .pipe(webserver({
            livereload: false,
            directoryListing: false,
            open: false,
            fallback: 'index.html'
        }));
});

gulp.task('build', function () {
    var DEST_DIR = 'build';

    return gulp.src('index.html')
        .pipe(vulcanize({
            dest: DEST_DIR,
            strip: true,
            inline: true
        }))
        .pipe(gulp.dest(DEST_DIR));
});

gulp.task('css', function () {
    var processors = [
        autoprefixer({browsers: ['last 2 versions']}),
        mqpacker,
        csswring
    ];
    return gulp.src('**/**/**/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./'));
});