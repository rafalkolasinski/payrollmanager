'use strict';
angular.module('PayrollManager')
.controller('NewEmployeeCtrl', ['$scope', '$localForage', function ($scope, $localForage) {
	var local = $localForage;

	$scope.employee = {
		address: 	'',
		city: 		'',
		country: 	'',
		email: 		'',
		firstname: 	'',
		gender: 	'',
		lastname: 	'',
		phone: 		'',
		payrolls: 	[]
	};

	$scope.errors = {
		'required' : 'This field is required.'
	};

	$scope.createNewEmployee = function() {
		console.log($scope.employee);
		var id = $scope.generateID();

		$scope.employee.id = id;

		// if($scope.)
		local.setItem(id, $scope.employee).then(function() {
			console.log("Finished saving!");
		}).catch(function(error) {
			console.log(err);
		});
	};

	$scope.generateID = function() {
		var id = '';
		id = Math.random().toString(36).substring(2, 18).toUpperCase();
		return id;
	};
}]);
