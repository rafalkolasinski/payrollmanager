'use strict';

angular.module('PayrollManager')
  .config(function ($httpProvider, $stateProvider, $urlRouterProvider) {
    console.log('asdf')
    //Application routing
    $stateProvider
      .state('main', {
        url: '/main',
        abstract: true,
        templateUrl: 'main/templates/menu.html',
        controller: 'MainCtrl'
      })
      .state('main.employees', {
        url: '/employees',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/employees.html',
            controller: 'EmployeesCtrl'
          }
        },
        cache: false
      })
      .state('main.newEmployee', {
        url: '/employees/new',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/newEmployee.html',
            controller: 'NewEmployeeCtrl'
          }
        },
        cache: false
      })
      .state('main.employeeDetail', {
        url: '/employees/detail',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/employeeDetail.html',
            controller: 'EmployeeCtrl'
          }
        },
        cache: false
      })
      .state('main.history', {
        url: '/history',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/history.html',
            controller: 'HistoryCtrl'
          }
        },
        cache: false
      })
      .state('main.settings', {
        url: '/settings',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/settings.html',
            controller: 'SettingsCtrl'
          }
        },
        cache: false
      });

      // ROUTING with ui.router
      $urlRouterProvider.otherwise('/main/employees');
  });
