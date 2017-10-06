var gulp = require('gulp'),
var karma = require('gulp-karma');

gulp.task('test', function() {
    var testFiles = [
        "js/**/*.js",
        "tests/**/*.js",
    ];
    // Be sure to return the stream 
    return gulp.src(testFiles)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'watch'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero 
            throw err;
        });
});