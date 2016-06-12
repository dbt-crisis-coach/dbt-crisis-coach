exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4723/wd/hub',
  specs: ['app/**/*.e2eSpec.js'],
  // baseUrl: 'http://10.0.2.2:8000',
  useAllAngular2AppRoots: true,
  // allScriptsTimeout: 20000,
  
  
  capabilities: {
    platformName: 'Android',
    platformVersion: '5.1',
    deviceName: 'Android Simulator',
    browserName: "",
    autoWebview: true,
    app: 'platforms/android/build/outputs/apk/android-debug.apk'
  },
  
  onPrepare: function() {
    var wd = require('wd'),
        protractor = require('protractor'),
        wdBridge = require('wd-bridge')(protractor, wd)
    wdBridge.initFromProtractor(exports.config)
  }
}