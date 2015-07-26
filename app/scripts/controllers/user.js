'use strict';

angular.module('reportApp').controller
(
    'UserController',
    function ($scope, UserService, $rootScope, $location)
    {
        if($rootScope.user)
        {
            $location.path('/builder');
        }

        $scope.user =
        {
            username: '',
            password: ''
        };

        $scope.login = function()
        {
            UserService.get($scope.user).then
            (
                function(user)
                {
                    if(user.data)
                    {
                        $rootScope.user = user.data;
                        $location.path('/builder');
                    }
                    else
                    {
                        $rootScope.user = null;
                        console.log('NOT logged in', $rootScope.user)
                    }
                }
            );

        };

        $scope.register = function()
        {
            //console.log($scope.user)
        };
    }
);