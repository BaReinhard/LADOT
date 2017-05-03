// Routes
app.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .when('/checkout', {
            templateUrl: 'views/checkout.html',
            controller: 'CheckOutController'
        })
        .when('/findcar', {
            templateUrl: 'views/findcar.html',
            controller: 'CheckInController'
        })
        .when('/checkin', {
            templateUrl: 'views/checkin.html',
            controller: 'CheckInController'
        })
        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'AdminController'
        })

        .otherwise({ redirectTo: '/' });
});