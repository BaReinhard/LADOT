var app = angular.module('CarPoolApp',['ngRoute']); //Place App Name in Single Quotes

app.config(function($routeProvider){
    $routeProvider
        // Route for root page
        .when('/', {
            templateUrl : 'views/home/home.html',
            controller : 'HomeController'
        })
        .when('/checkout',{
            templateUrl: 'views/checkout/checkout.html',
            controller: 'CheckOutController'
        })
        .when('/checkin',{
            templateUrl: 'views/checkin/checkin.html',
            controller: 'CheckInController'
        })
        .when('/admin',{
            templateUrl:'views/admin/admin.html',
            controller:'AdminController'
        })
        
        // Location for new route, e.g. '/about'
        
        // Route for anyother path is tried, re-direct to root
        .otherwise({ redirectTo : '/'});
});