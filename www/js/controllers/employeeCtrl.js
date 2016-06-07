'use strict';
angular.module('PayrollManager')
.controller('EmployeeCtrl', function ($scope, $stateParams, $localForage, EmployeesService) {
	var local = $localForage;
	var id = $stateParams.employeeId;

	$scope.strings = {
		PERSONAL_DATA: 'Personal data'
	}

	$scope.getEmployeeData = function() {
		//setting recently accessed employee id in service
		EmployeesService.setRecentId(id);

		local.getItem(id).then(function(data) {
			$scope.employeeData = data;
			console.log('Got employee details.', $scope.employeeData);
		}).catch(function(err) {
			console.log('Couldn\'t get employee details.', err);
		})
	}

	$scope.init = function() {
		$scope.getEmployeeData();
	}

	$scope.init();
});
