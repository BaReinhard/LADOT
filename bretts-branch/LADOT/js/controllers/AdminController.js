app.controller('AdminController',['$scope','getCheckinVehicleService',function($scope,getCheckinVehicleService){
	
    $scope.service = {};
    $scope.vehicles = {};

    // Service returns promise
    $scope.service = getCheckinVehicleService;
    // Upon response execute
    $scope.service.then(function(responseData){
        console.log("Storing Vehicles into $scope.vehicles in AdminController, here they are:");

        $scope.vehicles = responseData.data;
        console.log($scope.vehicles);
    });
    // Remove Vehicle from vehicles
    $scope.removeVehicle = function(index){
    console.log("Removing Vehicle " + index + " from $scope.vehicles");
    console.log("Car " + $scope.vehicles.Vehicle[index].id + ", checkedout by " + $scope.vehicles.Vehicle[index].checkedout + " has been removed");
    	$scope.vehicles.Vehicle.splice(index,1)
    };
    // Function to Delete Element, and send vehicle back to pool
    $scope.checkIn = function(vehicle){
        // Some POST request to send vehicle data back to database or Update Existing Database Item
        
        // Remove from $scope is done in ng-click
    };
}]);