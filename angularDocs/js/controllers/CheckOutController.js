app.controller('CheckOutController',['$scope','$timeout','$http',function($scope,$timeout,$http){
    $scope.submitted = false;
    $scope.name = "";
    $scope.daysrequired = 1;
    $scope.email = "";
    $scope.reservationJSON = {};
    $scope.message = "";
    $scope.vehicleCheckOutJSON = {};
    
    // Function to be Run on Submit
    $scope.submit = function(){
        // Check that form is filled
        if ($scope.name !="" && $scope.daysrequired != "" && $scope.email != ""){
            // Create JSON to be sent
        $scope.reservationJSON = {
            name: $scope.name,
            email: $scope.email,
            days: $scope.days
        }
        
        
        console.log($scope.reservationJSON);
        // GET Request
        $http.get("https://raw.githubusercontent.com/BaReinhard/LADOT/master/jsonObjects/vehicle_response.json").then(function(response){
            console.log(response.data);
            $scope.message = "Car " + response.data.id + " is ready for you";
            $scope.submitted = true;
            $scope.name = "";
            $scope.daysrequired = "";
            $scope.email = "";
            $scope.distance = "";
            $timeout(function(){
            $scope.submitted = false;
            
        },3000);
        });
        // Timeout to Have The Alert Disappear
        
        }
        
        else{
            // if not filled do nothing
        }
        
        
    }
}]);