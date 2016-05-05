angular.module('mainApp', ['mainServices'])

.controller('instanceController', ['$scope','instance', 'projectId', function($scope, instance, projectId) {
    // self = this;
    // $scope.project = "";
    // var projectJSON = 
    var initDisp = function(){
        projectId.get().$promise.then(function(project) {
            $scope.project = project;
        }).catch(function(data, status){
            alert("projectId.get error");
        });

        // var insObj = {
        //     'instance': 'instancename',
        //     'zone': 'zone',
        //     'status': 'RUNNGING',
        //     'ip': '111.0.0.1'        
        // }    
        instance.query().$promise.then(function(insList) {
            $scope.insList = insList;
        }).catch(function(data, status){
            alert("instance.query error");
        });
    };
    initDisp();
    
    var instanceStart = function(index){
        param = {
           'instance': $scope.insList[index].instance,
           'zone':  $scope.insList[index].zone,
           'Method':  'start'
        };
        instance.post(param).$promise.then(function(ins) {    
        }).catch(function(data, status){
            alert("instance.post error");
        });
    };
    $scope.instanceStart = instanceStart;
    var instanceStop = function(index){
        param = {
           'instance': $scope.insList[index].instance,
           'zone':  $scope.insList[index].zone,
           'Method':  'stop'
        };
        instance.post(param).$promise.then(function(ins) {    
        }).catch(function(data, status){
            alert("instance.post error");
        });
    };
    $scope.instanceStop = instanceStop;

    var instanceRefresh = function(){
        instance.query().$promise.then(function(insList) {
            $scope.insList = insList;
        }).catch(function(data, status){
            alert("instance.query error");
        });
    };
    $scope.instanceRefresh = instanceRefresh;


}]);


var mainServices = angular.module('mainServices', ['ngResource']);

mainServices.factory('instance', ['$resource',function($resource){
    return $resource(
        '/instance', 
        {}, 
        {
            query: {method:'GET', isArray: true},
            post: {method:'POST'}
        });
}])
.factory('projectId', ['$resource',function($resource){
    return $resource('/projectid');
}]);