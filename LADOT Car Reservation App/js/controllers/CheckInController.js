app.controller('CheckInController', ['$scope', '$timeout', '$http', '$sce', '$location', 'CheckedOutService', function ($scope, $timeout, $http, $sce, $location, CheckedOutService) {
    //Variables
    $scope.showForm = true;
    $scope.runLoop = true;
    $scope.carID = null;
    $scope.email;
    $scope.returnedFuel;
    $scope.mileage;
    $scope.returnDate;
    $scope.overDue = false;
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


    //Check Out Cars from external JSON
    $scope.vehicles=[];
    CheckedOutService.then(function (response) {
        console.table(response.data.Vehicle);
       $scope.vehicles = response.data.Vehicle;
    });

    //Find Car
    $scope.findCar = function () {   
        if ($scope.userForm.$valid) {
            console.log("Car ID: ", $scope.carID, "Email: ", $scope.email);
            $scope.runLoop = true;
            // On Valid Success
            angular.forEach($scope.vehicles, function (value, index) {
                if ($scope.runLoop) {
                    if (value.id == $scope.carID) {
                        console.log("Car ID MATCH. CHECK: ", value.checkedout);
                        if (value.checkedout == $scope.email) {
                            console.log("SUCCESS!  Email MATCH");
                            $scope.runLoop = false;
                            $scope.resultMessage = '<div class="alert alert-success app-container-header"><span> <h4><strong>Car Match Found</strong></h4> <img class="ajax-loader" src="https://upload.wikimedia.org/wikipedia/commons/d/de/Ajax-loader.gif" /></span>  </div>';
                           
                            $scope.showForm = false;
                            $timeout(function () {
                     
                                $location.path("/checkin")
                            }, 1000);

                        }
                        else {
                            $scope.runLoop = false;
                            console.log("NO Email MATCH");
                            $scope.resultMessage = '<div class="alert alert-danger app-container-header"> <h4><strong> <span class="glyphicon glyphicon-exclamation-sign"></span>  Email Not Found</strong></h4> Please try again.</div>';
                        }
                    }
                    else {
                        $scope.resultMessage = '<div class="alert alert-danger app-container-header"> <h4><strong> <span class="glyphicon glyphicon-exclamation-sign"></span>  Car ID Not Found</strong></h4> Please try again.</div>';
                    }
                }
            });   

        }

    }
    //Check Out
    //$scope.idChecked = $scope.vehicles.id;
    $scope.checkIn = function () {
        if ($scope.userForm.$valid) {
            console.log("Valid Form 2");
            //Do on Success
            $scope.resultMessage = '<div class="alert alert-success app-container-header"> <h4><strong>Car Successfully Checked-In <span class="glyphicon glyphicon-ok"></span> </strong></h4> Thank you for using the LADOT car reservation systerm. This page will redirect in 10 seconds.</div>';
            $scope.showForm = false;
            $timeout(function () {
                $location.path("/")
            }, 5000);


        }

    }
}]);

