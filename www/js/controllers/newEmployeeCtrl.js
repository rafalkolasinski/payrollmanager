'use strict';
angular.module('PayrollManager')
.controller('NewEmployeeCtrl', function ($rootScope, $scope, $localForage, $ionicLoading, $ionicHistory) {
	var local = $localForage;
	$scope.maxDate = moment().subtract(16, 'years').format('YYYY-MM-DD');

	$scope.employee = {
		address: 	'',
		city: 		'',
		country: 	'',
		email: 		'',
		firstname: 	'',
		lastname: 	'',
		payment: 	'',
		phone: 		'',
		payrolls: 	[]
	};

	$scope.errors = {
		'required' : 'This field is required.',
		'email' : 'This is not a valid email address format.'
	};

	$scope.createNewEmployee = function() {
		var id = $scope.generateID();

		$scope.employee.id = id;

		local.setItem(id, $scope.employee).then(function() {
			$ionicHistory.goBack();
			console.log("Finished saving!", $scope.employee);
		}).catch(function(err) {
			console.log(err);
		});
	};

	$scope.generateID = function() {
		var id = '';
		id = Math.random().toString(36).substring(2, 18).toUpperCase();
		return id;
	};
});
