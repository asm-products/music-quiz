describe('The login controller', function() {
    'use strict';

    var ctrl, $scope;

    beforeEach(angular.mock.module('musicQuizApp'));

    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();

        ctrl = $controller('loginController',
            {
                $scope: $scope
            });
    }));

    it('should be defined', function() {
        expect(ctrl).toBeDefined();
    });

    it('should scope a showResult property with a false as default value', function() {
        expect($scope.showResult).toBe(false);
    });

    it('should scope a login object', function() {
        expect($scope.login).toBeDefined();
    });

    it('should scope a notifications object', function() {
        expect($scope.notifications).toBeDefined();
    });

    it('should define a login function in the login object', function() {
        expect($scope.login.login).toBeDefined();
    });

    it('should scope a facebookStatusChangeCallback function', function() {
        expect($scope.facebookStatusChangeCallback).toBeDefined();
    });

    it('should be able to call the facebookStatusChangeCallback function with a connected status', function() {
        var result = $scope.facebookStatusChangeCallback({status: 'connected'});
        expect(result.status).toBe('connected');
    });

    it('should be able to call the facebookStatusChangeCallback function with a not_authorized status', function() {
        var result = $scope.facebookStatusChangeCallback({status: 'not_authorized'});
        expect(result.status).toBe('not_authorized');
    });

    it('should be able to call the facebookStatusChangeCallback function with an unknown status', function() {
        var result = $scope.facebookStatusChangeCallback({status: 'unknown'});
        expect(result.status).toBe('unknown');
    });

});
