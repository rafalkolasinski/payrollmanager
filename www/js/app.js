// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('PayrollManager', [
  'ionic',
  'LocalForageModule'
  ])

  //configuring localForage plugin
  .config(['$localForageProvider', function($localForageProvider){
    $localForageProvider.config({
        driver      : 'localStorageWrapper',
        name        : 'pm',
        version     : 1.0,
        storeName   : 'employees',
        description : 'Employees DB with personal info and recent payroll history.'
    })
  }])

  .run(function ($rootScope, $ionicPlatform) {

    $ionicPlatform.ready(function () {
      $rootScope.currentYear = moment().year();
        //save to use plugins here
    });
  })