app.controller('AdminController',['$scope',function($scope){
    $scope.firstPanel = true;
    $scope.secondPanel = true;
    $scope.thirdPanel = true;
    $scope.checkin = function(index){
        if (index == 1){
            $scope.firstPanel = false;
        }
        else if (index == 2){
            $scope.secondPanel = false;
        }else{
            $scope.thirdPanel = false;   
        }
    }
}]);