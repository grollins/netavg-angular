'use strict';

angular.module('netavgApp')
  .factory('NetAvgBackend', function ($http) {
      var backendParams = {
          url: '',
      };
      return {
          setLocation: function(backendLocation) {
              backendParams.url = backendLocation;
          },
          verifyAssertion: function(assertion) {
              var assertionParam = 'assertion='+assertion;
              return $http({
                  method: 'POST',
                  url: backendParams.url + '/login/',
                  headers: {
                      'Content-type': 'application/x-www-form-urlencoded',
                  },
                  data: assertionParam
              })
          },
          saveJob: function(jobData) {
              return $http({
                  method: 'POST',
                  url: backendParams.url + '/jobs/',
                  headers: {
                      'Content-Type': undefined,
                  },
                  transformRequest: angular.identity,
                  data: jobData
              })
          },
          refreshJobs: function() {
              return $http({
                  method: 'GET',
                  url: backendParams.url + '/jobs/'
              })
          },
          getJobResults: function(jobId) {
              return $http({
                  method: 'GET',
                  url: backendParams.url + '/jobs/' + jobId + '/'
              })
          },
          deleteJob: function(jobId) {
              return $http({
                  method: 'DELETE',
                  url: backendParams.url + '/jobs/' + jobId + '/'
              })
          }
      }
  });
