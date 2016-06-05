'use strict';

angular.module('PayrollManager', [
  'ionic',
  'ngCordova',
  'LocalForageModule'
  // TODO: load other modules selected during generation
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

	//add possible global event handlers here

})
