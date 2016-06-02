'use strict';
angular.module('PayrollManager')
.factory('EmployeesFactory', function () {
	var recentId = '';

	function setRecentId(id) {
		recentId = id;
	}

	return {
		getRecentId: function getRecentId() {
			return recentId;
		},
		setRecentId: setRecentId
	};
});
