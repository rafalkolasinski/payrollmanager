angular.module('PayrollManager')
	.filter('firstLetterUsername', function() {
		return function(input) {
			var output = '';
			var temp = [];

			if(input.indexOf(' ') >= 0) {
				temp = input.split(/[ ,]+/);
				temp.forEach(function(word) {
					output += word.charAt(0).toUpperCase();
				})
			}

			return output;
		}
	})
