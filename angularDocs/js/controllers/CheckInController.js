app.controller('CheckInController',['$scope','$timeout','$http','getCheckedoutVehicleService',function($scope,$timeout,$http,getCheckedoutVehicleService){
    $scope.carID = "";
    $scope.fuel = "";
    $scope.mileage = "";
    $scope.checkInJSON ={};
    $scope.submitted = false;
    //Regex to use to test for email input
    $scope.regex = /^[a-z]+[a-z0-9._]+@address.com$/;
    // GET EXISTING VEHICLES FROM Checked out POOL
    $scope.service = getCheckedoutVehicleService;
    $scope.vehicles=[];
    $scope.service.then(function(response){
        // Send CHECKEDOUT Vehicles to $scope.vehicles
       $scope.vehicles = response.data.Vehicle;
    });
    
    // called by ng-blur (which executes an expression when an element loses focus)
    $scope.getEmail = function(){
        for (var i = 0;i<$scope.vehicles.length;i++){
            if ($scope.vehicles[i].id == $scope.carID){
                
                $scope.email = $scope.vehicles[i].checkedout;
                // Mileage must be updated in order to submit form
                $scope.mileage = $scope.vehicles[i].mileage;
                $scope.mileageMin = parseInt($scope.mileage)+1;
                console.log($scope.mileageMin);
                
                
            }
        }
    };
     // Function to be Run on Submit
    $scope.submitForm = function(isValid){
        // Check that form is filled
        console.log(isValid);
        if (isValid){
        
            // Check the pool of checked out vehicles for submitted
            for( var i = 0; i<$scope.vehicles.length;i++){
                console.log($scope.vehicles[i].id);
                console.log($scope.carID);
                if ($scope.vehicles[i].id == $scope.carID & $scope.mileage > $scope.mileageMin) {
                    $scope.message = "Car has been checked in, please make sure to place the keys in the drop box";
                    $scope.submitted = true;

                    $timeout(function(){
                        $scope.carID = "";
                        $scope.fuel = "";
                        $scope.mileage = "";
                        $scope.checkInJSON = $scope.vehicles[i];
                        $scope.vehicles[i].pop
                        $scope.message ="";
                        $scope.submitted = false;
                        $scope.email = "";
                    },3000);
                    
                    // REMOVE VEHICLE FROM DATABASE
                    
                    
                    break;
                }
                else{
                    $scope.message = "Car Was Not Checked In Please make sure you have entered in the correct information";
                    $scope.submitted = true;
                    $timeout(function(){
                        $scope.message = "";
                        $scope.submitted = false;
                    },3000);
                }
            }

           
            
       
        // Timeout to Have The Alert Disappear
        
        }
        
        else{
            // if not filled do nothing
        }
        
        
    }
}]);