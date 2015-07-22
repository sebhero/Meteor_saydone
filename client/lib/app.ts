///<reference path='../../typingsCustom/myInterfaces.d.ts' />

angular.module('saydone',[
	'angular-meteor',
	'ui.router',
	'ngMaterial',
	'ngMdIcons',
	'ngAnimate'
		
	]);
	
function onReady() {
	angular.bootstrap(document,['saydone']);
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceReady', onReady);
} else {
  angular.element(document).ready(onReady);
}