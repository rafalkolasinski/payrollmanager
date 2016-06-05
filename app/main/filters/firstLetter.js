angular.module('PayrollManager')
	.filter('firstLetter', function() {
		return function(input) {
			var output;

			output = input.charAt(0).toUpperCase();

			return output;
		}
	})