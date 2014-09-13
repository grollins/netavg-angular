'use strict';

angular.module('netavgApp')
    .controller('HeaderCtrl', function($scope, $location, User) {
        $scope.isActive = function (viewLocation) { 
            return viewLocation === $location.path();
        };

        $scope.isLoggedIn = function () {
            return User.isLoggedIn();
        };

        $scope.logout = function() {
            User.logout();
        };
    });
