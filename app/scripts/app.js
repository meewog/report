'use strict';

/**
* @ngdoc overview
* @name reportApp
* @description
* # reportApp
*
* Main module of the application.
*/
angular
.module
(   'reportApp',
    [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ]
)

.config
(
    function ($routeProvider)
    {
        $routeProvider.when
        (
            '/',
            {
                templateUrl: '/views/login.html',
                controller: 'UserController',
                controllerAs: 'user'
            }
        )
        .when
        (
            '/builder',
            {
                templateUrl: '/views/canvas.html',
                controller: 'CanvasController',
                controllerAs: 'canvas'
            }
        )
        .when
        (
            '/about',
            {
                templateUrl: '/views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            }
        )
            .when
        (
            '/test',
            {
                templateUrl: '/views/test.html'
            }
        )
        .otherwise
        (
            {
                redirectTo: '/views/canvas.html'
            }
        );
    }
);
