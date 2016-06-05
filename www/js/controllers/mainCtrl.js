'use strict';
angular.module('PayrollManager')
.controller('MainCtrl', function($scope, $localForage, UserService) {
	console.log('Main controller')
	var local = $localForage;

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

	$scope.init = function() {
		if(!$scope.username && !$scope.initials) {
			$scope.getUserdata();
		}
	}


	$scope.init();
});
