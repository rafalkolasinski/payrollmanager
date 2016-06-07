angular.module('PayrollManager')
	.filter('capitalize', function() {
		return function(input, scope) {
			if (input && typeof input !== 'undefined')
				input = input.toLowerCase();
				return input.substring(0,1).toUpperCase()+input.substring(1);
			}
	});