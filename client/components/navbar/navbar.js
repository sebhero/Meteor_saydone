///<reference path='../../../typingsCustom/myInterfaces.d.ts' />
var Navbar = (function () {
    function Navbar() {
        this.componentName = 'navbar';
    }
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
//# sourceMappingURL=navbar.js.map