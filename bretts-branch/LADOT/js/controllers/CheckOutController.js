app.controller('CheckOutController',['$scope','$timeout','$http',function($scope,$timeout,$http){
    $scope.Success = false;
    $scope.Denied = false;
    $scope.name = "";
    $scope.daysrequired = 1;
    $scope.email = "me@testdomain.com"
    $scope.reservationJSON = {};
    $scope.message = "";
    $scope.vehicleCheckOutJSON = {};
    
    //Regex to use to test for email input
    $scope.regex = /^[a-z]+[a-z0-9._]+@testdomain.com$/;
    
    // Function to be Run on Submit
    $scope.submitForm = function(isValid){
        // Check that form is filled
        if (isValid){
            // Create JSON to be sent
        $scope.reservationJSON = {
            name: $scope.name,
            email: $scope.email,
            days: $scope.days
        }
        
        console.log("Here is the reservation JSON, that is created on CheckOut");
        console.log($scope.reservationJSON);
        // GET Request
        $http.get("https://raw.githubusercontent.com/BaReinhard/LADOT/master/jsonObjects/vehicle_response.json").then(function(response){
            console.log("Getting the vehicle that is being checked out to " + $scope.email + ". Here is the vehicle object:");
            console.log(response.data);
            $scope.message = "Car " + response.data.id + " is ready for you";
            $scope.Success = true;
            $scope.name = "";
            $scope.daysrequired = "";
            $scope.email = "";
            $scope.distance = "";
        $timeout(function(){
            $scope.Success = false;
            
        },5000);
        });
        // Timeout to Have The Alert Disappear
        
        }
        
        else{
            $scope.Denied = true;
            $scope.message = "Car has not been checked out, please make sure you have entered in correct information";
            $timeout(function(){
               $scope.Denied=false; 
            },5000);
            // if not filled do nothing
        }
        
        
    }
}]);