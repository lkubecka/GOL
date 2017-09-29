var gulp = require('gulp'),
    shell = require('gulp-shell');

gulp.task('server', ['node', 'karma']);

gulp.task('node', shell.task('node ./app.js'));
gulp.task('karma', shell.task('powershell -Command "./karma.ps1"'));

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