// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var db = null;

angular.module('dbt', ['ionic', 'ngCordova', 'dbt-contact'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
    initDB();

  });
  
  function initDB() {
    db = $cordovaSQLite.openDB('dbt.db');    
    // $cordovaSQLite.execute(db, "DROP TABLE IF EXISTS Numbers;");	
    // $cordovaSQLite.execute(db, "DROP TABLE IF EXISTS Contacts;");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Contacts (ContactId integer primary key, Name text, ImportId integer)");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Numbers (NumberId integer primary key, ContactId integer, Type text, Number text, Pref bool, FOREIGN KEY(ContactId) REFERENCES Contacts(ContactId))");	
  }
})
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  
  $stateProvider.state('home', {
    cache: false,
    url: '/home',
    templateUrl: 'templates/home.html'
  })
  
  $stateProvider.state('communications', {
    url: '/communications/:ContactId',
    templateUrl: 'templates/communicationList.html'
  })
  
    $stateProvider.state('addContact', {
    url: '/addContact',
    templateUrl: 'templates/addContact.html'
  })
  
  $stateProvider.state('profile', {
    url: '/profile/:ContactId',
    templateUrl: 'templates/profile.html'
  })
});
