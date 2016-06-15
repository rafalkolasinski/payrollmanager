'use strict';
angular.module('PayrollManager')
.factory('CurrencyService', function () {
	var rates = {};
	var currency = '';
	function setExchangeRates(obj) {
		rates = obj;
	}

	function setCurrency(value) {
		currency = value;
	}

	return {
		getExchangeRates: function getExchangeRates() {
			return rates;
		},
		getCurrency: function getCurrency() {
			return currency;
		},
		setExchangeRates: setExchangeRates,
		setCurrency: setCurrency
	};
});
