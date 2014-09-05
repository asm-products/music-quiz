describe('The login service', function() {
    'use strict';

    beforeEach(angular.mock.module('musicQuizApp'));

    it('should have a gamer property which is initially an empty object', 
        angular.mock.inject(function (loginService) {
            expect(loginService.gamer).toEqual({});
        }));

    it('should define the facebookCallback function',
        angular.mock.inject(function (loginService) {
            expect(loginService.facebookCallback).toBeDefined();
        }));

    it('should be able to call the facebookCallback function with no error in the response',
        angular.mock.inject(function (loginService) {
            var result = loginService.facebookCallback({first_name: 'first name of gamer'});
            expect(result.first_name).toBe('first name of gamer');
        }));

    it('should be able to call the facebookCallback function with an error in the response',
        angular.mock.inject(function (loginService) {
            var result = loginService.facebookCallback({error: {}});
            expect(result.error).toEqual({});
        }));

    it('should define a setGamerDetails function',
        angular.mock.inject(function (loginService) {
            expect(loginService.setGamerDetails).toBeDefined();
        }));

    it('should be able to call its statusChangeCallback function with a response status of \'not_authorized\'',
        angular.mock.inject(function (loginService) {
            var response = { status: 'not_authorized' },
                callback = function () {},
                scope = null;

            expect(loginService.statusChangeCallback(response, callback, scope)).toBeDefined();
        }));

    it('should be able to call its statusChangeCallback function with a response status of \'connected\'',
        angular.mock.inject(function (loginService) {
            var response = { status: 'connected' },
                callback = function () {},
                scope = null;

            expect(loginService.statusChangeCallback(response, callback, scope)).toBeDefined();
        }));

    it('should have default notifications',
        angular.mock.inject(function (loginService) {
            expect(loginService.notifications).toBeDefined();
        }));

    it('should have a success default notification', 
        angular.mock.inject(function (loginService) {
            expect(loginService.notifications.success).toBeDefined();
        }));

    it('should have an authorizationRequired default notification', 
        angular.mock.inject(function (loginService) {
            expect(loginService.notifications.authorizationRequired).toBeDefined();
        }));

    it('should have an loginRequired default notification', 
        angular.mock.inject(function (loginService) {
            expect(loginService.notifications.loginRequired).toBeDefined();
        }));

    it('should be able to call its logout function', 
        angular.mock.inject(function (loginService) {
            expect(loginService.logout()).toBeDefined();
        }));

    it('should be able to call its login function',
        angular.mock.inject(function (loginService) {
            expect(loginService.login(function() {})).toBeDefined();
        }));

    it('should be able to call its login function',
        angular.mock.inject(function (loginService) {
            expect(loginService.login(function() {})).toBeDefined();
        }));

    it('should be able to access the Facebook login \'then\' function returned by the login function',
        angular.mock.inject(function (loginService) {
            var result = loginService.login(function() {});
            expect(result.then).toBeDefined();
        }));

    it('should be able to call the Facebook login \'then\' function returned by the login function',
        angular.mock.inject(function (loginService) {
            var result = loginService.login(function() {});
            expect(result.then()).toBeDefined();
        }));

});












































