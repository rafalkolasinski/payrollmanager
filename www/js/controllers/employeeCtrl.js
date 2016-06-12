'use strict';
angular.module('PayrollManager')
.controller('EmployeeCtrl', function ($scope, $state, $timeout, $stateParams, $localForage, $ionicPopup, EmployeesService) {
	var local = $localForage;
	var id = $stateParams.employeeId;
	$scope.chartData = {
		data: [],
		labels: [],
		series: ['Series A'],
		colours: [
			{
			    fillColor: 'rgba(54, 177, 191, 1)',
			    strokeColor: 'rgba(54, 177, 191, 1)',
			    highlightFill: 'rgba(251, 177, 0, 1)',
			    highlightStroke: 'rgba(251, 177, 0, 1)'
			}
		]
	}

	$scope.strings = {
		PERSONAL_DATA: 'Personal data',
		PAYMENT_HISTORY: 'Payment history'
	}

	$scope.callEmployee = function() {
		var phone = $scope.employeeData.phone;
		window.plugins.CallNumber.callNumber(function(result) {
			console.log("Succesfully calling " + phone + ".", result)
		},
		function(err) {
			console.log('Couldn\'t make a call.', err);
		}, phone, true);
	}

	$scope.sendEmail = function() {
		var address = $stateParams.email;

		cordova.plugins.email.isAvailable(function(isAvailable) {
			if(!isAvailable) {
				var alertPopup = $ionicPopup.alert({
			    	title: 'Email sending not available',
			    	template: 'Please install or configure your native email app.'
			    });
			    alertPopup.then(function(res) {
					console.log('OK\'d the popup alert.', res);
			    });
			} else {
				cordova.plugins.email.open({
					to:      address,
					cc:      '',
				    bcc:     [],
				    subject: '',
				    body:    ''
				});
			}
		})
	}

	$scope.sortPayments = function(employeeData) {
		var data = employeeData.payments;

		data.sort(function(a, b) {
			return new Date(a.date).getTime() - new Date(b.date).getTime();
		});
	}

	$scope.getEmployeeData = function() {
		//setting recently accessed employee id in service
		EmployeesService.setRecentId(id);

		local.getItem(id).then(function(data) {
			$scope.employeeData = data;
			$scope.sortPayments($scope.employeeData);

			console.log('Got employee details.', $scope.employeeData);
			if($scope.employeeData.payments.length > 0) {
				$scope.generateChart();
			}
		}).catch(function(err) {
			console.log('Couldn\'t get employee details.', err);
		})
	}

	$scope.addPayment = function() {
		$state.go('main.newPayment');
	}

	$scope.generateChart = function() {
		var data = [];
		$scope.employeeData.payments.forEach(function(payment) {
			// date = payment.date.format('YYYY-MM-DD');
			$scope.chartData.labels.push(payment.date);
			data.push(payment.total);
		});

		$scope.chartData.data.push(data);

		console.log($scope.chartData);
	}

	$scope.init = function() {
		$scope.getEmployeeData();
	}

	$scope.init();
});
