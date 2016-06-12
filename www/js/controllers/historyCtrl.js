'use strict';
angular.module('PayrollManager')
.controller('HistoryCtrl', function ($scope, $localForage) {
	var local = $localForage;
	$scope.payments = [];

	$scope.getRecentPayments = function() {
		local.getItem('recentPayments').then(function(data) {
			$scope.payments = data;
			console.log('Successfully got recent payments.', $scope.payments);
		}).catch(function(err) {
			console.log('Couldn\'t get recent payments list.', err);
		})
	}

	$scope.init = function() {
		$scope.getRecentPayments();
	}

	$scope.init();
});
