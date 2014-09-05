musicQuizApp.controller('sidebarController', ['$scope', 'notificationsService', 'loginService', 'Facebook', 

    function ($scope, notificationsService, loginService, Facebook) {
        'use strict';

        var facebookCallback;

        $scope.showSidebarLoading = true;
        $scope.showSidebar = false;
        $scope.notifications = notificationsService;
        $scope.login = loginService;
        $scope.online = navigator.onLine;

        // Get the state of the gamer visiting this page and return:
        //      1. Logged into your app ('connected')
        //      2. Logged into Facebook, but not your app ('not_authorized')
        //      3. Not logged into Facebook and can't tell if they are logged into your app or not.
        $scope.facebookCallback = function (response) {

            // Local callback to update the UI.
            var callback = function ($scope) {
                // The sidebar has now been populated.
                $scope.showSidebarLoading = false;
                $scope.showSidebar = true;
            };

            // Notifications to display.
            if (response.status === 'connected') {
                // The gamer is logged into the app and Facebook.
                $scope.notifications.add($scope.login.notifications.success);
            } else if (response.status === 'not_authorized') {
                // The gamer is logged into Facebook, but not the app.
                $scope.notifications.add($scope.login.notifications.authorizationRequired);
            } else {
                // The gamer is not logged into Facebook, so we're not sure if he is logged into this app or not.
                $scope.notifications.add($scope.login.notifications.loginRequired);
            }

            // Update the login service.
            $scope.login.statusChangeCallback(response, callback, $scope);

            return response;
        };

        Facebook.getLoginStatus($scope.facebookCallback);
    }

]);