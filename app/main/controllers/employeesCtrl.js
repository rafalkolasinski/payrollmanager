'use strict';
angular.module('PayrollManager')
.controller('EmployeesCtrl', ['$scope', '$localForage', function ($scope, $localForage) {
	var local = $localForage;
	$scope.employees = [];

	$scope.getEmployees = function() {

	}
}]);
