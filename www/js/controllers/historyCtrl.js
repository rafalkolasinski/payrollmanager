'use strict';
angular.module('PayrollManager')
.controller('HistoryCtrl', function ($scope, $localForage, $ionicModal, CurrencyService) {
	var local = $localForage;
	$scope.payments = [];
	$scope.currency = '';
	$scope.currencies = [
		{
			name: '$',
			value: 'usd'
		},
		{
			name: 'PLN', 
			value: 'pln'
		},
		{
			name: '€',
			value: 'eur'
		}
	];
	$scope.paymentDetail = {
		firstname: '',
		lastname: '',
		type: '',
		id: '',
		date: '',
		healthcare: '',
		lifeAnnuity: '',
		hours: 0,
		paymentId: '',
		pension: '',
		rate: 0,
		sicknessInsurance: '',
		total: 0
	};

	$scope.strings = {
		HEALTHCARE: '(Healthcare)',
		LIFE_ANNUITY: '(Life annuity)',
		NOT_AVAILABLE: 'N/A',
		PENSION: '(Pension)',
		SICKNESS_INSURANCE: '(Sickness insurance)',
		TAX_DETAILS: 'Taxes & contributions'
	}

	$scope.getRecentPayments = function() {
		local.getItem('recentPayments').then(function(data) {
			$scope.payments = data;
			console.log('Successfully got recent payments.', $scope.payments);
		}).catch(function(err) {
			console.log('Couldn\'t get recent payments list.', err);
		})
	}

	$scope.getCurrency = function() {
		local.getItem('currency').then(function(data) {
			if(data === 'usd') {
				$scope.currency = $scope.currencies[0].name;
			} else if(data === 'pln') {
				$scope.currency = $scope.currencies[1].name;
			} else if(data === 'eur') {
				$scope.currency = $scope.currencies[2].name;
			}
			console.log('Successfully got currency.', $scope.currency);
		}).catch(function(err) {
			console.log('Couldn\'t get currency.', err);
		})
	}

	$scope.openPaymentDetailModal = function(id) {
		var selectedId = id;
		$scope.payments.forEach(function(payment) {
			if(payment.paymentId === selectedId) {
				$scope.paymentDetail = payment;
			}
		});

		$ionicModal.fromTemplateUrl('templates/paymentDetailModal.html', {
			controller: 'HistoryCtrl',
		    scope: $scope,
		    animation: 'slide-in-up'
		}).then(function(modal) {
		    $scope.paymentDetailModal = modal;
		    $scope.paymentDetailModal.show();
		});
		console.log($scope.paymentDetail);
	}

	$scope.hideModal = function() {
		if($scope.paymentDetailModal && typeof $scope.paymentDetailModal !== 'undefined') {
			$scope.paymentDetailModal.hide().then(function() {
		    	$scope.paymentDetailModal = null;
		    });
		}
	}

	$scope.init = function() {
		$scope.getRecentPayments();
		$scope.getCurrency();
	}

	$scope.init();
});
