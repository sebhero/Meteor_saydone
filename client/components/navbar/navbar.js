///<reference path='../../../typingsCustom/myInterfaces.d.ts' />
var Saydone;
(function (Saydone) {
    var Navbar = (function () {
        function Navbar($log, todoService, $mdSidenav) {
            this.$log = $log;
            this.todoService = todoService;
            this.$mdSidenav = $mdSidenav;
            $log.info("NAVBAR LOADED");
        }
        Navbar.prototype.submitTask = function () {
            this.todoService.addTask({ title: this.newTaskTitle });
            this.newTaskTitle = '';
        };
        Navbar.prototype.toggleLeft = function () {
            this.$mdSidenav('left').toggle();
        };
        Navbar.$inject = ['$log', 'TodoService', '$mdSidenav'];
        return Navbar;
    })();
    function shmckNavbar() {
        return {
            // templateUrl: 'client/components/main/main.ng.html',
            templateUrl: 'client/components/navbar/navbar.ng.html',
            controllerAs: 'navbar',
            controller: Navbar
        };
    }
    angular.module('saydone').directive('shmckNavbar', shmckNavbar);
})(Saydone || (Saydone = {}));
//# sourceMappingURL=navbar.js.map