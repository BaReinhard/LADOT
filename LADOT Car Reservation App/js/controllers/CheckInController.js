app.controller('CheckInController', ['$scope', '$timeout', '$http', '$sce', '$location', 'CheckedOutService','$q', function ($scope, $timeout, $http, $sce, $location, CheckedOutService,$q) {
    //Variables
    $scope.showForm = true;
    $scope.runLoop = true;
    $scope.carID = null;
    $scope.email;
    $scope.returnedFuel;
    $scope.mileage;
    $scope.returnDate;
    $scope.pastDue = false;
    $scope.checkInJSON = {};

    
    // Dropdown Options
    $scope.fuel = [{
        value: 0,
        label: "Empty",
    }, {
        value: 1,
        label: "1/4",
    }, {
        value: 2,
        label: "Half",
    }, {
        value: 3,
        label: "3/4",
    }, {
        value: 4,
        label: "Full",
    }];

    //Functions
    // Insert HTML
    $scope.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };


    //Get Calls
    $scope.getVehicles = CheckedOutService;
    $scope.vehicles = $scope.getVehicles.get();
    console.log("LOG: ", $scope.vehicles[0]);

    //Find Car
    $scope.findCar = function () {
        $scope.getValue = {
            carId: $scope.carID,
            email: $scope.email
        };

        $http.get("/api/findcar?email=" + $scope.email + "&carId=" + $scope.carID)
            .then(function (response) {
                $scope.getVehicles.set(response.data);
                console.log(typeof ($scope.carID));

                if (response.data == "") {
                    $scope.errorMessage = '<div class="alert alert-danger app-container-header"> <h4><strong> <span class="glyphicon glyphicon-exclamation-sign"></span>  Car Not Found</strong></h4> Please try again.</div>';
                }

                $scope.vehicles = $scope.getVehicles.get();

            if ($scope.userForm.$valid) {
                console.log("Car ID: ", $scope.carID, "Email: ", $scope.email);
                $scope.runLoop = true;
                //On Valid Success
                $scope.vehicles = $scope.getVehicles.get();
                angular.forEach($scope.vehicles, function (value, index) {
                    if ($scope.runLoop) {
                        if (value.carId == $scope.carID) {
                            console.log("Car ID MATCH. CHECK: ", value.carId);
                            if (value.email == $scope.email) {
                                console.log("SUCCESS!  Email MATCH");
                                $scope.runLoop = false;
                                $scope.errorMessage = '<div class="alert alert-success app-container-header"><span> <h4><strong>Car Match Found</strong></h4> <img class="ajax-loader" src="https://upload.wikimedia.org/wikipedia/commons/d/de/Ajax-loader.gif" /></span>  </div>';

                                $scope.showForm = false;
                                $timeout(function () {                                
                                    $location.path("/checkin")
                                }, 1000);
                                $scope.retrievedVehicle = {
                                    carId: value.carId,
                                    email: value.email,
                                    lastmileage: value.lastmileage,
                                    lastfuel:value.lastfuel
                                }
                            }                          
                        }                     
                    }
                });

            }

            // Function to be called when PUT fails
        }, function (error) {
            
        })
       
    }
    //Check Out


    //$scope.idChecked = $scope.vehicles.id;
    $scope.checkIn = function () {
        if ($scope.userForm.$valid) {

            //Do on Success
        
            $scope.vehicleJSON = $scope.vehicles[0];
            $scope.vehicleJSON.currentFuel = $scope.returnedFuel;
            $scope.vehicleJSON.currentMileage = $scope.mileage;
            $scope.vehicleJSON.comments = $scope.comments;
            console.log($scope.vehicleJSON);
            $http.put('/api/checkin', $scope.vehicleJSON).then(function (response) {
                console.log("Success");
                //Launch Modal
                $('#checkInModal').modal({
                    backdrop: 'static',
                    keyboard: false
                })
                $scope.resultTitle = '<h3 class="app-container-header"><strong>Car Successfully Checked-In <span class="glyphicon glyphicon-ok"></span> </strong></h3>';
                $scope.resultMessage = '<div class="app-container-header"><h4>Thank you for using the LADOT car reservation systerm. This page will redirect in 10 seconds.</h4></div>';
                $timeout(function () {
                    $('#checkInModal').modal('hide');
                    $location.path("/")
                }, 3500);
            }, function (error) {
                console.log(error);
            });           
        }

    }
}]);

