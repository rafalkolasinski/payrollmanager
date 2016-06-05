'use strict';
angular.module('PayrollManager')
.factory('UserService', function () {
	var username = '';
	var initials = '';

	function setUsername(name) {
		username = name;
	}

	function setInitals(string) {
		initials = string;
	}

	return {
		getUsername: function getUsername() {
			return username;
		},
		getInitials: function getInitials() {
			return initials;
		},
		setUsername: setUsername,
		setInitials: setInitals
	};
});
