app.controller('AdminController',['$scope','$http',function($scope,$http){
    $scope.service = {};
    $scope.vehicles = {};

    // Service returns promise
    
    // Upon response execute
    $http.get("/api/returnkey").then(function(responseData){
        $scope.vehicles = responseData.data;
        
    });
    
    // Function to Delete Element, and send vehicle back to pool
    $scope.checkIn = function(vehicle){
        // Some POST request to send vehicle data back to database or Update Existing Database Item
        $http.put("/api/returnkey", $scope.vehicles[vehicle]).then(function (response) {
            console.log(response);
            $scope.vehicles.splice(vehicle, 1);
        })
        // Remove from $scope is done in ng-click
    }
}]);