///<reference path='../../../typingsCustom/myInterfaces.d.ts' />



class Navbar {
	componentName:String;

	constructor() {
	this.componentName = 'navbar';
	}
}

function shmckNavbar() {
	return {
	// templateUrl: 'client/components/main/main.ng.html',
	templateUrl: 'client/components/navbar/navbar.ng.html',
	controllerAs: 'navbar',
	controller: Navbar
	};
}

angular.module('saydone').directive('shmckNavbar', shmckNavbar);