/**
 * Created by meewog on 6/11/15.
 */
app.service('ComplaintService', [
    '$q',
    '$http',
    function($q, $http) {

        this.getAll = function()
        {
            return $http.get("http://api.dev/complaints/");
        };

        this.getByStatus = function(status)
        {
            return $http.get("http://api.dev/complaints/"+status);
        };
    }
]);