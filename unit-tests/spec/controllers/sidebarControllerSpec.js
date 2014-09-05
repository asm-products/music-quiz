describe('The sidebar controller', function() {
    'use strict';

    var ctrl, $scope, Facebook;

    beforeEach(angular.mock.module('musicQuizApp'));

    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();

        ctrl = $controller('sidebarController',
            {
                $scope: $scope
            });
    }));

    it('should be defined', function() {
        expect(ctrl).toBeDefined();
    });

    it('should have a scope', function() {
        expect($scope).toBeDefined();
    });

    it('should scope a notifications object', function() {
        expect($scope.notifications).toBeDefined();
    });

    it('should scope a login object', function() {
        expect($scope.login).toBeDefined();
    });

    it('should scope an online property', function() {
        expect($scope.online).toBeDefined();
    });

    it('should set showSidebarLoading to true by default', function() {
        expect($scope.showSidebarLoading).toBe(true);
    });

    it('should set showSidebar to false by default', function() {
        expect($scope.showSidebar).toBe(false);
    });

    it('should have access to the getLoginStatus function from Facebook', 
        angular.mock.inject(function (Facebook) {
            expect(Facebook.getLoginStatus).toBeDefined();
        }));

    it('should have access to the getLoginStatus function from Facebook', 
        angular.mock.inject(function (Facebook) {
            spyOn(Facebook, 'getLoginStatus');
            Facebook.getLoginStatus();
            expect(Facebook.getLoginStatus).toHaveBeenCalled();
        }));

    it('should define the facebookCallback function',
        angular.mock.inject(function (Facebook) {
            expect($scope.facebookCallback).toBeDefined();
        }));

    it('should be able to call the facebookCallback function with a connected status', function() {
        var result = $scope.facebookCallback({status: 'connected'});
        expect(result.status).toBe('connected');
    });

    it('should be able to call the facebookCallback function with a not_authorized status', function() {
        var result = $scope.facebookCallback({status: 'not_authorized'});
        expect(result.status).toBe('not_authorized');
    });

    it('should be able to call the facebookCallback function with an unknown status', function() {
        var result = $scope.facebookCallback({status: 'unknown'});
        expect(result.status).toBe('unknown');
    });

});


































