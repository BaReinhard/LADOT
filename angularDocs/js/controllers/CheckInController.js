app.controller('CheckInController',['$scope','$timeout','$http','getCheckedoutVehicleService',function($scope,$timeout,$http,getCheckedoutVehicleService){
    $scope.carID = "";
    $scope.fuel = "";
    $scope.mileage = "";
    $scope.checkInJSON ={};
    $scope.submitted = false;
    // GET EXISTING VEHICLES FROM Checked out POOL
    $scope.service = getCheckedoutVehicleService;
    $scope.vehicles=[];
    $scope.service.then(function(response){
        // Send CHECKEDOUT Vehicles to $scope.vehicles
       $scope.vehicles = response.data.Vehicle;
    });
    $scope.submit = function(){
        // Check that form is filled
        if ($scope.carID !="" && $scope.fuel != "" && $scope.email != "" && $scope.mileage != ""){
            
        
            // Check the pool of checked out vehicles for submitted
            for( var i = 0; i<$scope.vehicles.length;i++){
                console.log($scope.vehicles[i]);
                if ($scope.vehicles[i].id == $scope.carID){
                    $scope.carID = "";
                    $scope.fuel = "";
                    $scope.mileage = "";
                    $scope.email = "";
                    $scope.checkInJSON = $scope.vehicles[i];
                    $scope.vehicles[i].pop
                    $scope.message = "Car has been checked in, please make sure to place the keys in the drop box";
                    $scope.submitted = true;
                    $timeout(function(){
                       $scope.message ="";
                       $scope.submitted = false;
                    },3000);
                    
                    // REMOVE VEHICLE FROM DATABASE
                    
                    
                    break;
                }
                else{
                    $scope.message = "Car cannot be found, please make sure you have entered the proper ID#";
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