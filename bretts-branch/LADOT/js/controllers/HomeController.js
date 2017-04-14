app.controller('HomeController',['$scope','getVehicleService',function($scope,getVehicleService){
    $scope.service = {};
    $scope.service = getVehicleService;
    $scope.vehicles = {};
    $scope.service.then(function(responseData){
    	console.log("Storing Vehicles in $scope.vehicles in HomeController, here they are:");
    	$scope.vehicles = responseData;
    	console.log($scope.vehicles)

        
    });
}]);