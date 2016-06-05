'use strict';
angular.module('PayrollManager')
.factory('UserService', function () {
	var username = '';

	function setUsername(name) {
		username = name;
	}

	return {
		getUsername: function getUsername() {
			return username;
		},
		setUsername: setUsername
	};
});
