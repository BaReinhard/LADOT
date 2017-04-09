app.controller('HomeController',['$scope','getVehicleService',function($scope,getVehicleService){
    $scope.service = {};
    $scope.service = getVehicleService;
    $scope.vehicles = {};
    $scope.service.then(function(responseData){
        $scope.vehicles = responseData;
        console.log(responseData);
    });
    console.log($scope.vehicles)
}]);