 var myApp = angular.module('myApp',[]);

myApp.controller('AppCtrl',['$scope','$http', function ($scope,$http) {
	console.log("From Controller!!!");

	$scope.group = [];

	var refresh = function() {
		$http.get('/contactlist').success( function(response){
			console.log("Received the requested data.");
			$scope.contactlist = response;
			$scope.contact = '';
		});		
	};

	refresh();

	$scope.add = function () {
		$scope.contact = "";
	};

	$scope.addContact = function() {
		console.log($scope.contact);
		$http.post('/contactlist', $scope.contact).success(function (response){
			console.log(response);
			refresh();
		});
	};

	$scope.remove = function (id) {
		console.log(id);
		$http.delete('/contactlist/'+id).success(function (response) {
			refresh();
		});
	};

	$scope.edit = function (id) {
		console.log(id);
		$http.get('/contactlist/'+ id).success (function (response) {
			$scope.contact = response; 
		});
		$("#update").show();
    	$("#addContact").hide();
    	$("#reset").hide();
    	$("#addGroup").show();
	};

	$scope.update = function () {
		console.log($scope.contact._id);
		$http.put('/contactlist/'+$scope.contact._id, $scope.contact).success (function (response) {
			refresh();
		});
	};

	$scope.deselect = function () {
		$scope.contact = "";
	};
}]);


