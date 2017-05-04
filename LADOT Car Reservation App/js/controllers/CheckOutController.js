app.controller('CheckOutController', ['$scope', '$timeout', '$http', '$sce', '$location', function ($scope, $timeout, $http, $sce, $location) {
    //Variables
    $scope.showForm = true;
    $scope.name;
    $scope.email;
    $scope.destination;
    $scope.reservationJSON = {};

    //Functions
    // Insert HTML
    $scope.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };
    //GetDate
    $scope.getDate = function () {
        var today = moment().format('hh:mma MMMM/D/YYYY');
        return today;
    };

    //DueDate
    $scope.getDueDate = function () {
        var today = moment();
        var dueDate = moment(today).add(Number($scope.daysrequired), 'day').format('hh:mma MMMM/D/YYYY ');
        return dueDate;
    };

    //Submit
    $scope.checkOut = function () {
        // On Valid Success
        if ($scope.userForm.$valid) {
            // New JSON
            $scope.reservationJSON = {
                name: $scope.name,
                email: $scope.email,
                duedate: $scope.getDueDate(),
                updated: $scope.getDate(),
                destination: $scope.destination
            };
            // PUT Request
            $http.put("/api/checkout", $scope.reservationJSON).then(function (response) {
                // Ensure a Vehicle was returned
                if (response.data != null) {
                    $scope.retrievedJSON = response.data
                    console.log("Thank you, " + $scope.name + ". Car is assigned to " + $scope.email + ". Car Reservation Data: ", response.data);

                    //Do on Success
                    $('#checkOutModal').modal({
                        backdrop: 'static',
                        keyboard: false
                    })
                    $scope.resultTitle = '<h3 class="app-container-header"><strong>Success <span class="glyphicon glyphicon-ok"></span> </strong></h3>';                  
                    $scope.resultMessage = '<div class="app-container-header"><h4>Thank you, ' + $scope.name + '. Car ' + response.data.carId + ' is ready for you. The car is due back: ' + response.data.duedate + '.</h4></div><hr />';
                    $scope.showForm = false;
                    $timeout(function () {
                        $('#checkOutModal').modal('hide');
                        $location.path("/")
                    }, 3500);

                }
                // Function to run on Failure of the PUT Request
            }, function (error) {
                console.log("PUT Request has failed");
                console.log(error);
                $scope.errorMessage = '<div class="app-container-header alert alert-danger"><h4><strong>Error!</strong></h4>No vehicles are available.</div>';
            });
        }
    }
}]);
