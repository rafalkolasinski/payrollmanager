'use strict';
angular.module('PayrollManager')
.controller('IntroCtrl', function ($scope, UserService) {
	console.log('Intro controller')

	// Called to navigate to the main app
	$scope.startApp = function() {
		console.log($scope.user);
		UserService.setUsername($scope.user.name);
		// $state.go('main');

		// Set a flag that we finished the tutorial
		// window.localStorage['didTutorial'] = true;
	};

	// Check if the user already did the tutorial and skip it if so
	if(window.localStorage['didTutorial'] === "true") {
		console.log('Skip intro, was already done.');
		$scope.startApp();
	}

	// Move to the next slide
	// $scope.next = function() {
	// 	$scope.$broadcast('slideBox.nextSlide');
	// };

	// // Our initial right buttons
	// var rightButtons = [
	// {
	// 	content: 'Next',
	// 	type: 'button-positive button-clear',
	// 	tap: function(e) {
	// 			// Go to the next slide on tap
	// 			$scope.next();
	// 		}
	// 	}
	// ];

	// //Initial left buttons
	// var leftButtons = [
	// {
	// 	content: 'Skip',
	// 	type: 'button-positive button-clear',
	// 	tap: function(e) {
	// 		// Start the app on tap
	// 		startApp();
	// 		}
	// 	}
	// ];

	// //Bind the left and right buttons to the scope
	// $scope.leftButtons = leftButtons;
	// $scope.rightButtons = rightButtons;


	//Called each time the slide changes
	// $scope.slideChanged = function(index) {
	// 	if(index > 0) {
	// 		$scope.leftButtons = [
	// 			{
	// 				content: 'Back',
	// 				type: 'button-positive button-clear',
	// 				tap: function(e) {
	// 					// Move to the previous slide
	// 					$scope.$broadcast('slideBox.prevSlide');
	// 				}
	// 			}
	// 		];
	// 	} else {
	// 		// This is the first slide, use the default left buttons
	// 		$scope.leftButtons = leftButtons;
	// 	}

	// 	if(index == 2) {
	// 		$scope.rightButtons = [
	// 			{
	// 				content: 'Start using MyApp',
	// 				type: 'button-positive button-clear',
	// 				tap: function(e) {
	// 					startApp();
	// 				}
	// 			}
	// 		];
	// 	} else {
	// 		// Otherwise, use the default buttons
	// 		$scope.rightButtons = rightButtons;
	// 	}
	// };
});
