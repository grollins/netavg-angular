'use strict';

angular.module('netavgApp')
    .controller('JobCtrl', function($scope, $log, $location, $routeParams, NetAvgBackend) {
        $scope.jobId = $routeParams.jobId;
        $scope.jobDone = false;

        $scope.refreshJob = function() {
            NetAvgBackend.getJobResults($scope.jobId)
            .success(function(data, status) {
                $scope.status = status;
                $scope.jobData = data;
                $scope.results = data.result;
                $log.debug('Job refresh success');
                if (data.status === 'done') {
                    $scope.jobDone = true;
                }
            })
            .error(function(data, status) {
                $scope.jobData = data || 'Job refresh failed';
                $scope.status = status;
                $log.debug('Job refresh failed');
            });
        };
        $scope.refreshJob();

        $scope.deleteJob = function() {
            NetAvgBackend.deleteJob($scope.jobId)
            .success(function() {
                $log.debug('Job deleted');
                $location.path( '/home' );
            })
            .error(function() {
                $log.debug('Job deletion failed');
            });
        };

        $scope.exportPDB = function() {
            var pdbContent = $scope.results[0].output_pdb;
            var tempLink = document.createElement('a');
            tempLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(pdbContent));
            tempLink.setAttribute('download', $scope.jobData.title + '.pdb');
            tempLink.click();
        };

    });
