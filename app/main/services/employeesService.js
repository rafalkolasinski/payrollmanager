'use strict';
angular.module('PayrollManager')
.factory('EmployeesService', function () {
	var recentId = '';
	var employeesList = [];

	function setRecentId(id) {
		recentId = id;
	}

	function setEmployeesList(list) {
		employeesList = list;
	}

	return {
		getRecentId: function getRecentId() {
			return recentId;
		},
		getEmployeesList: function getEmployeesList() {
			return employeesList;
		},
		setRecentId: setRecentId,
		setEmployeesList: setEmployeesList
	};
});
