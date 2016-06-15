'use strict';
angular.module('PayrollManager')
.controller('SettingsCtrl', function ($scope, $log, $http, $timeout, $ionicModal, $localForage) {
	var local = $localForage;
	var initials = '';
	var temp = '';
	$scope.currentUsername = '';
	$scope.userInfo = {
		newUsername: ''
	}
	$scope.currencies = [
		{
			name: 'PLN', 
			value: 'pln'
		},
		{
			name: '$',
			value: 'usd'
		},
		{
			name: '€',
			value: 'eur'
		}
	];

	$scope.currencyInfo = {
		currency: $scope.currencies[0].value
	}

	$scope.getCurrentUsername = function() {
		local.getItem('username').then(function(data) {
			$scope.currentUsername = data;
		}).catch(function(err) {
			console.log('Couldn\'t get current username.', err);
		})
	}

	$scope.getCurrency = function() {
		local.getItem('currency').then(function(data) {
			$scope.currencyInfo.currency = data;
		}).catch(function(err) {
			console.log('Couldn\'t get currency.', err);
		})
	}

	$scope.$on('$destroy', function() {
		if($scope.usernameModal && typeof $scope.usernameModal !== 'undefined'){
    		$scope.usernameModal.remove();
		}
	});

	$scope.hideModal = function() {
		if($scope.usernameModal && typeof $scope.usernameModal !== 'undefined') {
			$scope.usernameModal.hide().then(function() {
		    	$scope.usernameModal = null;
		    });
		} else if($scope.currencyModal && typeof $scope.currencyModal !== 'undefined') {
			$scope.currencyModal.hide().then(function() {
		    	$scope.currencyModal = null;
		    });
		}
	}

	$scope.makeInitials = function(){
		initials = '';
		if($scope.userInfo.newUsername.indexOf(' ') >= 0) {
			temp = $scope.userInfo.newUsername.split(/[ ,]+/);
			temp.forEach(function(word) {
				initials += word.charAt(0).toUpperCase();
			})
		} else {
			initials = username.charAt(0).toUpperCase();
		}

		return initials;
	}

	$scope.openModal = function(modalName) {
		var path = '';
		if(modalName === 'username') {
			path = 'templates/changeUsernameModal.html';
		} else if(modalName = 'currency') {
			path = 'templates/changeCurrencyModal.html';
		}

		$ionicModal.fromTemplateUrl(path, {
			controller: 'settingsCtrl',
		    scope: $scope,
		    animation: 'slide-in-up'
		}).then(function(modal) {
			if(modalName === 'username') {
			    $scope.usernameModal = modal;
			    $scope.usernameModal.show();
			} else if(modalName === 'currency') {
				$scope.currencyModal = modal;
			    $scope.currencyModal.show();
			}
		});
	}

	$scope.changeUsername = function() {
		local.setItem('username', $scope.userInfo.newUsername).then(function(value) {
			$scope.$emit('usernameChanged', {username: $scope.userInfo.newUsername});
			$scope.hideModal();
		}).catch(function(err) {
			console.log('Couldn\'t set new username.', err);
		});

		$scope.makeInitials();
		local.setItem('initials', initials).then(function() {
			$scope.hideModal();
		}).catch(function(err) {
			console.log('Couldn\'t save initials.', err);
		});

		$scope.getCurrentUsername();
		$scope.userInfo.username = '';
	}

	$scope.changeCurrency = function() {
		local.setItem('currency', $scope.currencyInfo.currency).then(function(value) {
			$scope.hideModal();
		}).catch(function(err) {
			console.log('Couldn\'t change currency.', err);
		})
	}

	//init func
	$scope.init = function() {
		$scope.getCurrentUsername();
		$scope.getCurrency();
	}

	$scope.init();
});
