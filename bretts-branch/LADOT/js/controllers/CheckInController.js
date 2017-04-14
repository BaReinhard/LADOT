app.controller('CheckInController',['$scope','$timeout','$http','getCheckedoutVehicleService',function($scope,$timeout,$http,getCheckedoutVehicleService){
    $scope.carID = "";
    $scope.fuel = "";
    $scope.mileage = "";
    $scope.checkInJSON ={};
    $scope.Success = false;
    $scope.NotFound = false;
    $scope.found = false;
    //Regex to use to test for email input
    $scope.regex = /^[a-z]+[a-z0-9._]+@address.com$/;
    // GET EXISTING VEHICLES FROM Checked out POOL
    $scope.service = getCheckedoutVehicleService;
    $scope.vehicles=[];
    $scope.service.then(function(response){
        // Send CHECKEDOUT Vehicles to $scope.vehicles
        console.log("Storing the vehicles into $scope.vehicles, here they are:");
       $scope.vehicles = response.data.Vehicle;
       console.log($scope.vehicles);
    });
    
    // called by ng-blur (which executes an expression when an element loses focus)
    $scope.getEmail = function(){
    	console.log("Matching Car ID to existing instance in Checked Out Pool");
        for (var i = 0;i<$scope.vehicles.length;i++){
            if ($scope.vehicles[i].id == $scope.carID){
                $scope.email = $scope.vehicles[i].checkedout;
                // Mileage must be updated in order to submit form
                $scope.mileage = $scope.vehicles[i].mileage;
                $scope.mileageMin = parseInt($scope.mileage)+1;
                console.log("Inserting Email to Email Field, heres the email:");
		console.log($scope.email);
                console.log("Inserting Mileage to Mileage Field, and setting the minimum, so it must be changed before check-in, heres the mileage:");
		console.log($scope.mileage);
		console.log("Here is the minimum amount: " + $scope.mileageMin);
                
            }
        }
    };
     // Function to be Run on Submit
    $scope.submitForm = function(isValid){
        // Check that form is filled
        if (isValid){
        
            // Check the pool of checked out vehicles for submitted
            for( var i = 0; i<$scope.vehicles.length;i++){
                
                if ($scope.vehicles[i].id == $scope.carID & $scope.mileage > $scope.mileageMin) {
                    console.log("Car has been found, object is being sent to admin for processing");
                    $scope.found =true;
                    $scope.message = "Car has been checked in, please make sure to place the keys in the drop box";
                    $scope.Success = true;
                    console.log("Message is displayed, and will be removed after 5 seconds");

                    $timeout(function(){
                    	console.log("Message is now removed, fields are now reset");
                        $scope.carID = "";
                        $scope.fuel = "";
                        $scope.mileage = "";
                        $scope.checkInJSON = $scope.vehicles[i];
                        $scope.vehicles[i].pop
                        $scope.message ="";
                        $scope.email = "";
                        $scope.found = false;
                        $scope.Success= false;
                    },5000);
                    
                    // REMOVE VEHICLE FROM DATABASE
                    
                    
                    break;
                }
                else{
                    if(i == $scope.vehicles.length-1 & $scope.found == false){
                    console.log("Car was not found, ask user if information is incorrect by displaying a message for 5, don't delete the information");
                    $scope.message = "Car Was Not Checked In Please make sure you have entered in the correct information";
                    $scope.NotFound = true;
                    $timeout(function(){
                    	console.log("Message has been removed, with information intact");
                        $scope.message = "";
                        $scope.NotFound = false;
                    },5000);
                    }
                }
            }

           
            
       
        // Timeout to Have The Alert Disappear
        
        }
        
        else{
            // if not filled do nothing
        }
        
        
    }
}]);