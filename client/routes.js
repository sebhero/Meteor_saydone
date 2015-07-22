///<reference path='../typingsCustom/myInterfaces.d.ts' />
'use strict';
angular.module('saydone')
    .config(function ($stateProvider) {
    $stateProvider
        .state('main', {
        url: '/',
        template: "<shmck-main></shmck-main>"
    });
})
    .config(function ($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
}).run(['$rootScope', '$state', function ($rootScope, $state) {
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (error === 'AUTH_REQUIRED') {
                $state.go('/');
            }
        });
    }]);
//# sourceMappingURL=routes.js.map