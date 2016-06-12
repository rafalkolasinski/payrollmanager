'use strict';
angular.module('PayrollManager')
.controller('EmployeesCtrl', ['$scope', '$localForage', '$ionicPopup', '$ionicLoading', function ($scope, $localForage, $ionicPopup, $ionicLoading) {
	//data controls
	var local = $localForage;
	$scope.employees = [];
	$scope.dbkeys;

	//item controls
	$scope.reorder = false;
	$scope.delete = false;

	$scope.editList = function() {
		$scope.reorder = !$scope.reorder;
		$scope.delete = !$scope.delete;
	};

	$scope.moveItem = function(employee, fromIndex, toIndex) {
		$scope.employees.splice(fromIndex, 1);
		$scope.employees.splice(toIndex, 0, employee);
	};

	$scope.deleteItem = function(index) {
		var id = $scope.employees[index].id;
		console.log(id);
		var name = $scope.employees[index].firstname + ' ' + $scope.employees[index].lastname;
		var confirmPopup = $ionicPopup.confirm({
			title: name,
			template: 'Are you sure you want to delete this employee?'
		});

		confirmPopup.then(function(answer) {
			if(answer) {
				$scope.employees.splice(index, 1);
				localforage.removeItem(id).then(function() {
					console.log('Removed:' + name);
				}).catch(function(err) {
					console.log('Couldn\'t remove employee.', err);
				});
			} else {
				console.log('Employee not removed.');
			}
		});
	}

	$scope.getEmployees = function() {
		local.keys().then(function(keys) {
			$scope.dbkeys = keys;
			console.log(keys);

			$scope.dbkeys.forEach(function(key){
				var iterator = key;
				if(iterator !== 'username' && iterator !== 'initials' && iterator !== 'currency' && iterator !== 'recentPayments') {
					local.getItem(key).then(function(data) {
						$scope.employees.push(data);
						console.log("Employees: ", $scope.employees);
					}).catch(function(err) {
						console.log('Couldn\'t get DB data for this key.', err);
					})
				}
			})
		}).catch(function(err) {
			console.log('Couldn\'t get DB keys.', err);
			$ionicLoading.hide();
		});
	}


	$scope.init = function() {
		$scope.getEmployees();
	}

	$scope.init();
}]);
