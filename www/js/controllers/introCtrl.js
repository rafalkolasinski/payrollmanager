'use strict';
angular.module('PayrollManager')
.controller('IntroCtrl', function ($rootScope, $scope, $state, $location, $localForage, UserService) {
	var local = $localForage;
	var username = '';
	var initials = '';
	var temp = [];
	$scope.user = {};

	$scope.makeInitials = function(){
		if(username.indexOf(' ') >= 0) {
			temp = username.split(/[ ,]+/);
			temp.forEach(function(word) {
				initials += word.charAt(0).toUpperCase();
			})
		} else {
			initials = username.charAt(0).toUpperCase();
		}

		return initials;
	}

	// Called to navigate to the main app
	$scope.startApp = function() {
		if(!window.localStorage.hasOwnProperty('didTutorial') || typeof window.localStorage['didTutorial'] === "undefined" || window.localStorage['didTutorial'] === "false"){
			username = $scope.user.username;

			//saving username
			local.setItem('username', username).then(function() {
				console.log("Saved username: " + username);
			}).catch(function(err) {
				console.log('Couldn\'t save username.', err);
			});

			//saving user's initials
			initials = $scope.makeInitials();
			local.setItem('initials', initials).then(function() {
				console.log("Saved initials: " + initials);
			}).catch(function(err) {
				console.log('Couldn\'t save initials.', err);
			});

			// Set a flag that tutorial is finished
			window.localStorage['didTutorial'] = true;
		}

		//redirecting to main state
		$location.path('/main/employees');
	};

	// Check if the user already did the tutorial and skip it if so
	if(window.localStorage.hasOwnProperty('didTutorial') && typeof window.localStorage['didTutorial'] !== "undefined" && window.localStorage['didTutorial'] === "true") {
		console.log('Skip intro, was already done.');
		$scope.startApp();
	} else {
		window.localStorage['didTutorial'] = false;
	}
});
