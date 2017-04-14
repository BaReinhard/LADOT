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
       $scope.vehicles = response.data.Vehicle;
    });
    
    $scope.getDate = function(){
        console.log("Getting Today's Date");
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
            mm='0'+mm;
        } 
        var today = mm+'/'+dd+'/'+yyyy;
        return today;
    };
    $scope.getDueDate = function(){
        console.log("Getting Due Date");
        var today = new Date();
        var dd = today.getDate() + $scope.daysrequired;
        var mm = today.getMonth()+1; //January is 0!
        
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
            mm='0'+mm;
        } 
        var today = mm+'/'+dd+'/'+yyyy;
        return today;
    };
    
    // called by ng-blur (which executes an expression when an element loses focus)
    $scope.getInfo = function(){
        console.log("Matching Information based on ID");
        for (var i = 0;i<$scope.vehicles.length;i++){
            if ($scope.vehicles[i].id == $scope.carID){
                console.log("Information Found. Updating...");
                $scope.email = $scope.vehicles[i].checkedout;
                // Mileage must be updated in order to submit form
                $scope.mileage = $scope.vehicles[i].mileage;
                $scope.mileageMin = parseInt($scope.mileage)+1;
                console.log("Minimum value allowed for mileage");
                console.log($scope.mileageMin);
                console.log("Last mileage of vehicle");
                console.log($scope.mileage);
                
                
            }
        }
    };
     // Function to be Run on Submit
    $scope.submitForm = function(isValid){
        // Check that form is filled
        if (isValid){
        
            // Check the pool of checked out vehicles for submitted
            for( var i = 0; i<$scope.vehicles.length;i++){
                
                if ($scope.vehicles[i].id == $scope.carID & $scope.mileage >= $scope.mileageMin) {
                    $scope.found =true;
                    $scope.message = "Car has been checked in, please make sure to place the keys in the drop box";
                    $scope.Success = true;
                    
                    // POST Request send car to admin checkin pool
                    // New updated json
                    $scope.updatedVehicle = {
                        checkedout: $scope.vehicles[i].checkedout,
                        duedate : $scope.vehicles[i].duedate,
                        fuel: $scope.fuel,
                        id: $scope.vehicles[i].id,
                        mileage: $scope.mileage,
                        update: $scope.getDate()
                    }
                    console.log("Updated Vehicle Information to be passed to admin Controller");
                    console.log($scope.updatedVehicle);
                    // Code goes here
                    
                    $timeout(function(){
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
                    $scope.message = "Car Was Not Checked In Please make sure you have entered in the correct information";
                    $scope.NotFound = true;
                    $timeout(function(){
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