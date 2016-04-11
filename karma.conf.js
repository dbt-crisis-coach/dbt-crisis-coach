module.exports = function(config) {
  config.set({

    basePath: '',
    
    frameworks: ['browserify', 'jasmine'],

    files: [
      'app/pages/providers/phoneNumberUtil.js',
      'app/**/*.spec.js',
    ],
    preprocessors: {
      'app/pages/providers/phoneNumberUtil.js': ['browserify'],
      'app/**/*.spec.js': [ 'browserify' ]
    },

    logLevel: 'LOG_DEBUG',
    browserify: {
      debug: true,
      transform: [['babelify', { "presets": ["es2015"] }]],
      extensions: ['.js']
    },
    browsers: ['Chrome'],
    
    singleRun: false
  })
}