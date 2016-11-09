// require gulp
var gulp = require('gulp');
// require sass
var sass = require('gulp-sass');
// require Browser sync
var browserSync = require('browser-sync').create();
// require useref
var useref = require('gulp-useref');
// require uglify
var uglify = require('gulp-uglify');
// require gulpif
var gulpIf = require('gulp-if');
// require imagemin
var imagemin = require('gulp-imagemin');
// gulp cache
var cache = require('gulp-cache');
// cssnano
var cssnano = require('gulp-cssnano');
// del
var del = require('del');
// run sequence
var runSequence = require('run-sequence');



// init gulpIf and uglify
gulp.task('useref', function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});

// init browser sync
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
});

// Update SASS to CSS
gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// fonts
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})

// init imagemin
gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});

// init del (cleanup)
gulp.task('clean:dist', function() {
    return del.sync('dist');
})

// run sequence
gulp.task('build', function (callback) {
    runSequence('clean:dist',
        ['sass', 'useref', 'images', 'fonts'],
        callback
    )
})
gulp.task('default', function (callback) {
    runSequence(['sass','browserSync', 'watch'],
        callback
    )
})
// Watch Gulp Changes
gulp.task('watch', ['browserSync', 'sass'], function(){
    gulp.watch('app/scss/**/*.scss', ['sass']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});
