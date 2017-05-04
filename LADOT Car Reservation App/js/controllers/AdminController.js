app.controller('AdminController',['$scope','$http',function($scope,$http){
    $scope.service = {};
    $scope.vehicles = {};
    $scope.selectedCarIndex;


    // Service returns promise
    
    // Upon response execute
    $http.get("/api/returnkey").then(function(responseData){
        $scope.vehicles = responseData.data;

        $scope.pendingCount = $scope.vehicles.length;
       
    });

    $http.get("/api/returnkey").then(function (responseData) {
        $scope.vehicles = responseData.data;

        $scope.pendingCount = $scope.vehicles.length;
        if ($scope.pendingCount == null) {
            $scope.pendingCount = "ERR"
        }

    });
    
    // Function to Delete Element, and send vehicle back to pool
    $scope.checkIn = function (vehicle) {



        // Some POST request to send vehicle data back to database or Update Existing Database Item
        $http.put("/api/returnkey", $scope.vehicles[vehicle]).then(function (response) {
            console.log(response);
            $scope.vehicles.splice(vehicle, 1);
        })

        $scope.pendingCount--;
        // Remove from $scope is done in ng-click
    }

    //JSON Table 
    $scope.addRowAsyncAsNV = function () {
        $scope.companies.push({ 'name': $scope.name, 'employees': $scope.employees, 'headoffice': $scope.headoffice });
        // Writing it to the server
        //		
        var data = 'name=' + $scope.name + '&employees=' + $scope.employees + '&headoffice=' + $scope.headoffice;
        $http.post('/savecompany', data)
		.success(function (data, status, headers, config) {
		    $scope.message = data;
		})
		.error(function (data, status, headers, config) {
		    alert("failure message: " + JSON.stringify({ data: data }));
		});
    };

    //Modal Function
    //This passes the clicked object to the modal popup for display
    $scope.carDetails = function (car, index) {
        $scope.selectedCar = car;
        $scope.selectedCarIndex = index;
        console.log("Clicked: ", $scope.selectedCar, "\nIndex: ", $scope.selectedCarIndex);
    }
}]);
