// Karma configuration
// Generated on Fri Sep 29 2017 15:33:08 GMT+0200 (Central Europe Daylight Time)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-babel-preprocessor'
        ],

        // list of files / patterns to load in the browser
        files: [
            //'js/**/*.js',
            //'tests/**/*.js',
            "node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js",
            "js/**/*.es6",
            "test/**/*.es6"
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "js/**/*.js": ["babel"],
            "test/**/*.js": ["babel"]
        },

        "babelPreprocessor": {
            options: {
                sourceMap: "inline"
            },
            filename: function(file) {
                return file.originalPath.replace(/\.js$/, ".es6.js");
            },
            sourceFileName: function(file) {
                return file.originalPath;
            }
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // browsers: ['Chrome', 'Chrome_without_security'], // You may use 'ChromeCanary', 'Chromium' or any other supported browser 

        // you can define custom flags 
        customLaunchers: {
            Chrome_without_security: {
                base: 'Chrome',
                flags: ['--disable-web-security']
            }
        },


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,


        // 'progress' is added by default
        // add 'htmlDetailed'
        reporters: ['progress', 'htmlDetailed'],


        // notify karma of the available plugins
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-html-detailed-reporter',
            'karma-chrome-launcher'
        ],

        // configure the HTML-Detailed-Reporter to put all results in one file    
        htmlDetailed: {
            splitResults: false
        }
    })
}