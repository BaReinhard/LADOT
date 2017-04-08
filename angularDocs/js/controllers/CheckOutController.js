app.controller('CheckOutController',['$scope','$timeout',function($scope,$timeout){
    $scope.submit = false;
    $scope.name = "";
    $scope.daysrequired = "";
    $scope.distance = "";
    $scope.submitted = function(){
        $scope.name = "";
    $scope.daysrequired = "";
    $scope.distance = "";
        $scope.submit = true;
        $timeout(function(){
            $scope.submit = false;
            
        },3000);
    }
}]);