describe('The quiz list controller', function() {
    'use strict';

    var ctrl, $scope;

    beforeEach(angular.mock.module('musicQuizApp'));

    beforeEach(angular.mock.inject(function($rootScope, $controller) {
        $scope = $rootScope.$new();

        ctrl = $controller('quizlistController',
            {
                $scope: $scope
            });
    }));

    it('should be defined', function() {
        expect(ctrl).toBeDefined();
    });

});