'use strict';
angular.module('PayrollManager')
.controller('MainCtrl', function($scope, $http, $localForage, UserService, CurrencyService) {
	console.log('Main controller')
	var local = $localForage;

	$scope.$on('usernameChanged', function(event, data) {
		console.log("Got new username in MainCtrl: ", data.username);
		$scope.getUserdata();
	})

	$scope.getUserdata = function() {
		local.getItem('username').then(function(data) {
			console.log(data)
			$scope.username = data;
			console.log("Got username: ", $scope.username);
		}).catch(function(err) {
			console.log('Couldn\'t get username.', err);
		});

		local.getItem('initials').then(function(data) {
			console.log(data)
			$scope.initials = data;
			console.log("Got initials: ", $scope.initials);
		}).catch(function(err) {
			console.log('Couldn\'t get initials.', err);
		});
	}

	$scope.getExchangeRates = function() {
		$http({
			method: 'GET',
			url: 'https://api.fixer.io/latest?base=PLN'
		}).then(function(res) {
			console.log('Got exchange rates.', res);
			CurrencyService.setExchangeRates({pln: 1, usd: res.data.rates.USD, eur: res.data.rates.EUR});
		}, function(err) {
			console.log('Couldn\'t get exchange rates.', err);
		});
	}

	$scope.checkCurrency = function() {
		local.getItem('currency').then(function(data) {
			if(!data || typeof data === 'undefined') {
				local.setItem('currency', 'pln').then(function(value) {
					console.log('Successfully set default currency.');
				}).catch(function(err) {
					console.log('Couldn\'t set default currency.', err);
				})
			}
		}).catch(function(err) {
			console.log('Couldn\'t check currency.', err);
		});
	}

	$scope.init = function() {
		if(!$scope.username && !$scope.initials) {
			$scope.getUserdata();
		}
		$scope.getExchangeRates();
		$scope.checkCurrency();
	}

	$scope.init();
});
