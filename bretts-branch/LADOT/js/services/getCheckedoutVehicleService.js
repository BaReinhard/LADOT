app.factory('getCheckedoutVehicleService',['$http',function($http){
	console.log("Getting Vehicles from getCheckedoutVehicleService");
        var apiPath = "https://raw.githubusercontent.com/BaReinhard/LADOT/master/jsonObjects/vehicle_checkedin_list";
        return $http.get(apiPath);
        }]);
