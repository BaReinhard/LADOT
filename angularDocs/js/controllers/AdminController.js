app.controller('AdminController',['$scope','getCheckinVehicleService',function($scope,getCheckinVehicleService){
    $scope.service = {};
    $scope.vehicles = {};

    // Service returns promise
    $scope.service = getCheckinVehicleService;
    
    // Upon response execute
    $scope.service.then(function(responseData){
        $scope.vehicles = responseData.data;
    });
    
    // Function to Delete Element, and send vehicle back to pool
    $scope.checkIn = function(vehicle){
        // Some POST request to send vehicle data back to database or Update Existing Database Item
        
        // Remove from $scope is done in ng-click
    }
}]);