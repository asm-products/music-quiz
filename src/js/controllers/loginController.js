musicQuizApp.controller('loginController', ['$scope', 'notificationsService', 'loginService', 

    function ($scope, notificationsService, loginService) {
		'use strict';

        $scope.showResult = false;

        $scope.notifications = notificationsService;

        $scope.login = loginService;

        // Call the login function from the login service and set the callback once the dialog is completed.
        $scope.login.login(function (response) {

            // Local callback to update the UI.
            var callback = function ($scope) {
                // The sidebar has now been populated.
                $scope.showSidebar = true;

                $scope.showResult = true;

                // Update the scope to display the sidebar.
                $scope.$apply();
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
        });
    }

]);