app.factory('getCheckinVehicleService',['$http',function($http){
        var apiPath = "https://raw.githubusercontent.com/BaReinhard/LADOT/master/jsonObjects/vehicle_checkedin_list";
        return $http.get(apiPath);
        }]);
