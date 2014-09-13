'use strict';

angular.module('netavgApp')
  .factory('User', function ($http, $location) {
      var user = {
          isLoggedIn: false,
          username: ''
      };
      return {
          username: function () {
              return user.username;
          },
          isLoggedIn: function() {
              return user.isLoggedIn;
          },
          login: function (username, token) {
              user.isLoggedIn = true;
              user.username = username;
              $http.defaults.headers.common['Authorization'] = 'Token ' + token;
              $location.path( '/home' );
          },
          logout: function () {
              user.isLoggedIn = false;
              user.username = '';
              $http.defaults.headers.common['Authorization'] = '';
              $location.path( '/login' );
          }
      }
  });
