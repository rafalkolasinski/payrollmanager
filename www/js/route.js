'use strict';

angular.module('PayrollManager')
  .config(function ($httpProvider, $stateProvider, $urlRouterProvider) {
    //Application routing
    $stateProvider
      .state('intro', {
        url: '/',
        templateUrl: 'templates/intro.html',
        controller: 'IntroCtrl',
        cache: false
      })
      .state('main', {
        url: '/main',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'MainCtrl'
      })
      .state('main.employees', {
        url: '/employees',
        views: {
          'pageContent': {
            templateUrl: 'templates/employees.html',
            controller: 'EmployeesCtrl'
          }
        },
        cache: false
      })
      .state('main.newEmployee', {
        url: '/employees/new',
        views: {
          'pageContent': {
            templateUrl: 'templates/newEmployee.html',
            controller: 'NewEmployeeCtrl'
          }
        },
        cache: false
      })
      .state('main.employeeDetail', {
        url: '/employees/:employeeId',
        views: {
          'pageContent': {
            templateUrl: 'templates/employeeDetail.html',
            controller: 'EmployeeCtrl'
          }
        },
        cache: false
      })
      .state('main.history', {
        url: '/history',
        views: {
          'pageContent': {
            templateUrl: 'templates/history.html',
            controller: 'HistoryCtrl'
          }
        },
        cache: false
      })
      .state('main.settings', {
        url: '/settings',
        views: {
          'pageContent': {
            templateUrl: 'templates/settings.html',
            controller: 'SettingsCtrl'
          }
        },
        cache: false
      });

      // ROUTING with ui.router
      $urlRouterProvider.otherwise('/');
  });
