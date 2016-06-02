'use strict';

angular.module('PayrollManager', [
  'ionic',
  'ngCordova',
  'LocalForageModule'
  // TODO: load other modules selected during generation
])

	.config(['$localForageProvider', function($localForageProvider) {
		$localForageProvider.config({
			driver: 'localStorageWrapper',
			name: 'pm',
			version: 1.0,
			storeName: 'employees',
			description: 'Employees DB with personal data and recent payrolls.'
		});
	}])

	.run(function ($ionicPlatform) {
		$ionicPlatform.ready(function () {
	  		//save to use plugins here
		});

	//add possible global event handlers here

})
