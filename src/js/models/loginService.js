// Handle Facebook logins for the current gamer.
musicQuizApp.service('loginService', ['notificationsService', 'Facebook', 

    function (notificationsService, Facebook) {
        'use strict';

        var that = this;

        this.gamer = {};
        this.showLogin = false;
        this.showLogout = false;

        this.facebookCallback = function (response) { 
            if (response && !response.error) {
                that.gamer = response;
            }

            if (response && response.error) {
                // todo: send a notification.
            }

            return response;
        }

        // Set current gamer details.
        this.setGamerDetails = function() {
            Facebook.api(
                    "/v2.1/me?fields=name,first_name,last_name,email,picture,link,gender,locale,age_range", 
                    that.facebookCallback);
        }

        // This is called with the results from from Facebook.getLoginStatus().
        this.statusChangeCallback = function (response, callback, $scope) {
            // The response object is returned with a status field that lets the app know the current login status of the person.
            // Full docs on the response object can be found in the documentation for Facebook.getLoginStatus().
            if (response.status === 'connected') {
                // Logged into your app and Facebook.
                that.gamer = that.setGamerDetails();
                that.showLogin = false;
                that.showLogout = true;
            } else {
                // response.status is 'not_authorized': the gamer is logged into Facebook, but not this app,
                // or response.status has any other value: the gamer is not logged into Facebook, so we're not sure if they are logged into this app or not.
                that.showLogin = true;
                that.showLogout = false;
            }

            callback($scope);

            return that;
        }

        // Standard notifications related to login operations.
        this.notifications = {
            success: {
                "type": "success",
                "title": "You are logged in",
                "message": "You can play Music Quiz and win Quiz Coins."
            },
            authorizationRequired: {
                "type": "info",
                "title": "Authorize this game",
                "message": "To play Music Quiz and win Quiz Coins, you first need to accept to play this game with your Facebook account."
            },
            loginRequired: {
                "type": "warning",
                "title": "Log into Facebook please",
                "message": "To play Music Quiz and win Quiz Coins, you first need to log into your Facebook account."
            }
        }

        // Logout the Facebook session of the current gamer.
        this.logout = function() {
            return Facebook.logout();
        }

        // Trigger a Facebook login.
        this.login = function(callback) {
            // Get the state of the gamer visiting this page and return:
            //      1. Logged into your app ('connected')
            //      2. Logged into Facebook, but not your app ('not_authorized')
            //      3. Not logged into Facebook and can't tell if they are logged into your app or not.
            return Facebook.login(function (response) {
                callback(response);
            });
        }
    }
]);