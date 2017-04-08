app.controller('CheckInController',['$scope','$timeout',function($scope,$timeout){
    $scope.name="";
    $scope.carID = "";
    $scope.fuel = "";
    $scope.mileage = "";
    $scope.submitted = function(){
        $scope.name="";
    $scope.carID = "";
    $scope.fuel = "";
    $scope.mileage = "";
        $scope.submit = true;
        $timeout(function(){
           $scope.submit = false; 
        },3000);
    }
}]);