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

        $scope.exportCSV = function() {
            var csvContent = 'filename,rmsd,energy_ref_to_pdb,energy_pdb_to_ref\n';
            for (var i = 0; i < $scope.results.length; i++) {
                var r = $scope.results[i];
                csvContent += r.name + ',';
                csvContent += r.rmsd + ',';
                csvContent += r.energy_ref_to_pdb + ',';
                csvContent += r.energy_pdb_to_ref + '\n';
            }

            var tempLink = document.createElement('a');
            tempLink.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
            tempLink.setAttribute('download', $scope.jobData.title + '.csv');
            tempLink.click();
        };

    });
