'use strict';
angular.module('mappingApp',[])
//
// .config(function ($httpProvider) {
//
//     // script for http request
//     $httpProvider.defaults.useXDomain = true;
//     delete $httpProvider.defaults.headers.common['X-Requested-With'];
//     $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
//     var param = function (obj) {
//         var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
//
//         for (name in obj) {
//             value = obj[name];
//
//             if (value instanceof Array) {
//                 for (i = 0; i < value.length; ++i) {
//                     subValue = value[i];
//                     fullSubName = name + '[' + i + ']';
//                     innerObj = {};
//                     innerObj[fullSubName] = subValue;
//                     query += param(innerObj) + '&';
//                 }
//             } else if (value instanceof Object) {
//                 for (subName in value) {
//                     subValue = value[subName];
//                     fullSubName = name + '[' + subName + ']';
//                     innerObj = {};
//                     innerObj[fullSubName] = subValue;
//                     query += param(innerObj) + '&';
//                 }
//             } else if (value !== undefined && value !== null)
//                 query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
//         }
//
//         return query.length ? query.substr(0, query.length - 1) : query;
//     };
//
//     // Override $http service's default transformRequest
//     $httpProvider.defaults.transformRequest = [function (data) {
//         return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
//     }];
//
// })
.controller('MappingController', function($scope,$http){
    var socket;
    var herokoUrl ='https://chatappwhiteboard.herokuapp.com/';
    $scope.tutors = [];
    $scope.admin = {};
    $scope.user = {};
    $scope.students = {};
    $scope.authAdmin = function (){

        $http({
            method: 'post',
            url: herokoUrl + 'admin-auth',
            data: {email:$scope.admin.email,password:$scope.admin.password},
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function(response){
           var resData = response.data;
            if (resData.status == 'success') {
                $('#auth-modal').modal('hide');

                $scope.user = resData.user;
                var connectionOptions = {
                    'force new connection': true,
                    'reconnectionAttems': "Infinity",
                    "timeout": 10000,
                    "transports": ["websocket"],
                    "query": {"token": $scope.user.token}
                };
                socket = new io(herokoUrl, connectionOptions);
                socket.emit('add-user');
                socket.on('update-users', function(data){
                    $scope.students = data.students;
                    $scope.tutors = data.tutors;
                    $scope.$apply();

                });
            }
        })
    }
    $(document).on('change','.js-map-student', function (){
       var tutor = $(this).val();
       var student = $(this).data().student;
       if(tutor!=''){
           socket.emit('force-tutor-student-map',{tutor:tutor,student:student});
           console.log({tutor:tutor,student:student});
       }
    });


});
