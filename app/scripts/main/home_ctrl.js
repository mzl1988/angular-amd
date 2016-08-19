define(['app'], function () {
    'use strict';
    return ['$scope', 'config', function ($scope, config) {
        console.log(config);
        $scope.message = 'Welcome to Home Page';
    }];
});
