///<reference path='../../../typingsCustom/myInterfaces.d.ts' />


namespace Saydone {
	class Navbar {

		static $inject = ['$log', 'TodoService', '$mdSidenav'];
		private searchFilter:string;
		newTaskTitle:string;

		constructor(private $log:ng.ILogService, private todoService:TodoService,
					private $mdSidenav:angular.material.ISidenavService) {

			$log.info("NAVBAR LOADED");
		}

		submitTask() {
			this.todoService.addTask({title:this.newTaskTitle});
			this.newTaskTitle='';
		}

		toggleLeft() {
			this.$mdSidenav('left').toggle();
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
}