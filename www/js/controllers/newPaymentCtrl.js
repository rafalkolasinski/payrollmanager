'use strict';
angular.module('PayrollManager')
.controller('NewPaymentCtrl', function ($scope, $state, $localForage, $ionicModal, EmployeesService) {
	var local = $localForage;
	var id = EmployeesService.getRecentId();

	$scope.currentDate = moment().format('YYYY-MM-DD');
	$scope.customDate = false;
	$scope.employeeData = {};

	$scope.errors = {
		'required' : 'This field is required.'
	};

	$scope.taxRates = {
		healthcare: 0.0775,
		lifeAnnuity: 0.015,
		pension: 0.0975,
		sicknessInsurance: 0.0245
	}

	$scope.strings = {
		CUSTOM_DATE: 'Set custom date?',
		DATE: 'Date',
		HEALTHCARE: 'Healthcare',
		HOURS: 'Number of hours worked',
		LIFE_ANNUITY: 'Life annuity',
		PAYMENT_TYPE: 'Payment type',
		PAYDAY: 'Payday',
		PENSION: 'Pension',
		RATE: 'Salary rate',
		SICKNESS_INSURANCE: 'Sickness insurance'
	}
	
	$scope.payment = {
		date: $scope.currentDate,
		healthcare: {
			checked: false,
			value: ''
		},
		hours: '',
		lifeAnnuity: {
			checked: false,
			value: ''
		},
		pension: {
			checked: false,
			value: ''
		},
		rate: '',
		sicknessInsurance: {
			checked: false,
			value: ''
		},
		total: ''
	}

	var paymentKeys = Object.keys($scope.payment);
	var taxRatesKeys = Object.keys($scope.taxRates);

	console.log($scope.payment);

	$scope.calcTotal = function() {
			var total = 0;
			var taxes = 0;

			$scope.payment.total = $scope.payment.rate * $scope.payment.hours;

			if($scope.employeeData.payment === 'hourly') {
				paymentKeys.forEach(function(pKey) {
					taxRatesKeys.forEach(function(tKey){
						if(pKey === tKey) {
							if($scope.payment[pKey].checked === true) {
								//adding tax values up
								taxes += $scope.taxRates[tKey];
								//setting tax value
								$scope.payment[pKey].value = $scope.payment.total * $scope.taxRates[tKey];
							}
						}
					});
				});
			} else if($scope.employeeData.payment === 'salary') {
				taxRatesKeys.forEach(function(key) {
					taxes += $scope.taxRates[key];
				});
			}

			if(taxes > 0) {
				$scope.payment.total -= $scope.payment.total * taxes;
			}
			$scope.payment.total = $scope.payment.total.toFixed(2);
	}

	$scope.customDateVisible = function() {
		$scope.customDate = !$scope.customDate;
	}

	$scope.getEmployeeData = function() {
		local.getItem(id).then(function(data) {
			$scope.employeeData = data;
			console.log('Got employee details.', $scope.employeeData);

			if($scope.employeeData.payment === 'salary') {
				$scope.payment = {
					date: $scope.currentDate,
					healthcare: {
						checked: true,
						value: ''
					},
					hours: 160,
					lifeAnnuity: {
						checked: true,
						value: ''
					},
					pension: {
						checked: true,
						value: ''
					},
					rate: '',
					sicknessInsurance: {
						checked: true,
						value: ''
					},
					total: 0
				}
			}
		}).catch(function(err) {
			console.log('Couldn\'t get employee details.', err);
		})
	}

	$scope.openModal = function() {
		$scope.payment.date = moment($scope.payment.date).format('YYYY-MM-DD');
		$scope.calcTotal();

		$ionicModal.fromTemplateUrl('templates/savePaymentModal.html', {
			controller: 'newPaymentCtrl',
		    scope: $scope,
		    animation: 'slide-in-up'
		}).then(function(modal) {
		    $scope.savePaymentModal = modal;
		    $scope.savePaymentModal.show();
		});
		console.log($scope.payment);
	}

	$scope.hideModal = function() {
		if(typeof $scope.savePaymentModal !== 'undefined') {
			$scope.savePaymentModal.hide().then(function() {
		    	$scope.savePaymentModal = null;
		    });
		}
	}

	$scope.savePayment = function() {
		$scope.employeeData.payments.push($scope.payment);

		local.setItem(id, $scope.employeeData).then(function(value) {
			console.log('Successfully saved payment.', value);
			$scope.hideModal();
			$state.go('main.employeeDetail', {"employeeId": $scope.employeeData.id});
		}).catch(function(err) {
			console.log('Couldn\'t save payment.', err);
		});
		console.log('lols')
	}

	$scope.init = function() {
		$scope.getEmployeeData();
	}

	//initializing the controller to get data
	$scope.init();
});
