'use strict';
angular.module('PayrollManager')
.factory('CurrencyService', function () {
	var rates = {};

	function setExchangeRates(obj) {
		rates = obj;
	}

	return {
		getExchangeRates: function getExchangeRates() {
			return rates;
		},
		setExchangeRates: setExchangeRates
	};
});
