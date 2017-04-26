app.factory('CheckedOutService', ['$http', function ($http) {
    
    
    var savedData = {}
    function set(value) {
        savedData = value;
        
    }
    function get() {
        return savedData;
    }

    return {
        set: set,
        get: get
    }


    
}]);
