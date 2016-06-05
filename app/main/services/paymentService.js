'use strict';
angular.module('PayrollManager')
.factory('PaymentService', function () {
	var currency = '';

	function setCurrency(val) {
		recentId = val;
	}

	return {
		getCurrency: function getCurrency() {
			return currency;
		},
		setCurrency: setCurrency
	};
});
