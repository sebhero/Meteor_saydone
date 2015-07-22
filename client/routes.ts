///<reference path='../typingsCustom/myInterfaces.d.ts' />


'use strict';

angular.module('saydone')
  .config(function ($stateProvider:angular.ui.IStateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        template: `<shmck-main></shmck-main>`
      });
  })
  .config(function ($urlRouterProvider:angular.ui.IUrlRouterProvider, $locationProvider:ng.ILocationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  }).run(['$rootScope', '$state', function ($rootScope:ng.IRootScopeService, $state:angular.ui.IStateService) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      if (error === 'AUTH_REQUIRED') {
        $state.go('/');
      }
    });
  }]);