'use strict';

angular.module('reportApp').service('UserService', [
    '$q',
    '$http',
    function($q, $http)
    {

        this.get = function(params)
        {
            return $http.get("http://report-server.dev/users?"+this.stringifyParams(params));
        };

        this.getByStatus = function(status)
        {
            return $http.get("http://api.dev/complaints/"+status);
        };

        this.stringifyParams = function(params)
        {
            var tempArray = [];
            angular.forEach
            (
                params,
                function(val, id)
                {
                    tempArray.push
                    (
                        id+'='+val
                    )
                }
            );

            return tempArray.join('&');
        }
    }
]);