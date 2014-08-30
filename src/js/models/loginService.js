// Handle Facebook logins for the current gamer.
musicQuizApp.service('loginService', ['notificationsService', 

    function (notificationsService) {
        'use strict';

        var getGamerDetails,
            getFriendsWhoPlay,
            that = this;


        this.gamer = {};
        this.showLogin = false;
        this.showLogout = false;

        // Get current gamer details.
        getGamerDetails = function(callback, $scope) {
            FB.api("/v2.1/me?fields=name,first_name,last_name,email,picture,link,gender,locale,age_range", function (response) { 
                    if (response && !response.error) {
                        that.gamer = response;
                    }

                    if (response && response.error) {
                        // todo: what's the best way to handle this error? A notification?
                        console.log(response.error);
                    }

                    callback($scope);
                }
            );
        }

        // This is called with the results from from FB.getLoginStatus().
        this.statusChangeCallback = function (response, callback, $scope) {
            // The response object is returned with a status field that lets the app know the current login status of the person.
            // Full docs on the response object can be found in the documentation for FB.getLoginStatus().
            if (response.status === 'connected') {
                // Logged into your app and Facebook.
                this.gamer = getGamerDetails(callback, $scope);
                this.showLogout = true;
                this.showLogin = false;
                return this.gamer;
            } else if (response.status === 'not_authorized') {
                // The person is logged into Facebook, but not your app.
                this.showLogin = true;
                this.showLogout = false;
            } else {
                // The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
                this.showLogin = true;
                this.showLogout = false;
            }

            callback($scope);
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
                "message": "To play Music Quiz and win Music Coins, you first need to accept to play this game with your Facebook account."
            },
            loginRequired: {
                "type": "warning",
                "title": "Log into Facebook please",
                "message": "To play Music Quiz and win Music Coins, you first need to log into your Facebook account."
            }
        }

        // Logout the Facebook session of the current gamer.
        this.logout = function() {
            FB.logout();
        }

        // Trigger a Facebook login.
        this.login = function(callback) {
            // Get the state of the gamer visiting this page and return:
            //      1. Logged into your app ('connected')
            //      2. Logged into Facebook, but not your app ('not_authorized')
            //      3. Not logged into Facebook and can't tell if they are logged into your app or not.
            FB.login(function (response) {
                callback(response);
            });
        }
    }
]);