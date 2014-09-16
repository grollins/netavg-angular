'use strict';

angular.module('netavgApp')
    .controller('HomeCtrl', function($scope, $log, NetAvgBackend, User) {
        $scope.submissionFailed = false;
        $scope.submissionSucceeded = false;
        $scope.submissionStatus = '';
        $scope.jobs = [];
        $scope.username = User.username();

        $scope.job = {
            title: '',
            trajectoryFile: null,
            knn: 32
        };

        $scope.options = {
            knn: [4, 8, 16, 32, 64, 128]
        };

        $scope.closeAlert = function() {
            $scope.submissionFailed = false;
            $scope.submissionSucceeded = false;
            $scope.submissionStatus = '';
        };

        $scope.saveJob = function() {
            var fd = new FormData();
            fd.append('title', $scope.job.title);
            fd.append('trajectory', $scope.job.trajectoryFile);
            fd.append('knn', $scope.job.knn);

            NetAvgBackend.saveJob(fd)
            .success(function(data, status, headers, config) {
                $scope.status = status;
                $log.debug('Job post success');
                $scope.refreshJobs();
                $scope.submissionSucceeded = true;
            })
            .error(function(data, status, headers, config) {
                $scope.status = status;
                $log.debug('Job post failed');
                $log.debug(data);
                $scope.refreshJobs();
                $scope.submissionFailed = true;
                $scope.submissionStatus = status;
            });
            $scope.jobForm.$setPristine();
            $scope.job.title = '';
            angular.forEach(
            angular.element("input[type='file']"),
            function(inputElem) {
                angular.element(inputElem).val(null);
            });
        };

        $scope.refreshJobs = function() {
            NetAvgBackend.refreshJobs()
            .success(function(data, status) {
                $scope.status = status;
                $scope.jobs = data.results;
                $log.debug('Job refresh success');
            })
            .error(function(data, status) {
                $scope.jobs = data || 'Job refresh failed';
                $scope.status = status;
                $log.debug('Job refresh failed');
            });
        };

        $scope.refreshJobs();
    });