'use strict';
angular.module('PayrollManager')
.controller('NewEmployeeCtrl', ['$scope', function ($scope) {
	$scope.employee = {};

	$scope.createNewEmployee = function() {
		console.log($scope.employee);
	};
}]);
