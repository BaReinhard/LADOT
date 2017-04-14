app.controller('CheckOutController',['$scope','$timeout','$http',function($scope,$timeout,$http){
    $scope.Success = false;
    $scope.Denied = false;
    $scope.name = "";
    $scope.daysrequired = 1;
    $scope.email = "me@testdomain.com"
    $scope.reservationJSON = {};
    $scope.message = "";
    $scope.vehicleCheckOutJSON = {};
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
    
    //Regex to use to test for email input
    $scope.regex = /^[a-z]+[a-z0-9._]+@testdomain.com$/;
    
    // Function to be Run on Submit
    $scope.submitForm = function(isValid){
        // Check that form is filled
        if (isValid){
            // Create JSON to be sent
        $scope.reservationJSON = {
            checkedout: $scope.email,
            duedate : $scope.getDueDate(),
            updated: $scope.getDate()
        };
        
        console.log("Here is the reservation JSON, that is created on CheckOut");
        console.log($scope.reservationJSON);
        // GET Request
        $http.get("https://raw.githubusercontent.com/BaReinhard/LADOT/master/jsonObjects/vehicle_response.json").then(function(response){
            
            $scope.retrievedJSON = response.data
            console.log("Here is the retrieved JSON Object, which will be modified to then post to CheckedOut Pool");
            console.log($scope.retrievedJSON);
            $scope.retrievedJSON.duedate = $scope.getDueDate();
            $scope.retrievedJSON.updated = $scope.getDate();
            $scope.retrievedJSON.checkedout = $scope.email;
            console.log("Here is the updated retrievedJSON object");
            console.log($scope.retrievedJSON);
            // POST request to send new reserved car into CheckedOut Pool
            
            // Then Execute the following after POST
            console.log("Getting the vehicle that is being checked out to " + $scope.email + ". Here is the vehicle object:");
            console.log(response.data);
            $scope.message = "Car " + response.data.id + " is ready for you";
            $scope.Success = true;
            $scope.name = "";
            $scope.daysrequired = "";
            $scope.email = "";
            $scope.distance = "";
            console.log("Showing message to user in a popup type window for 5 seconds, then will disappear");
            
            
            
        $timeout(function(){
            console.log("Removed message");
            $scope.Success = false;
            
        },5000);
        });
        
        
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