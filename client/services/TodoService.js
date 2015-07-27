/**
 * Created by seb on 2015-07-27.
 */
/// <reference path="../../typingsCustom/myInterfaces.d.ts" />
var Saydone;
(function (Saydone) {
    var TodoService = (function () {
        function TodoService($log, $meteor) {
            this.$log = $log;
            this.$meteor = $meteor;
            $log.info("TODOSERVICE LOADED");
            this.todos = $meteor.collection(Todos).subscribe('todos');
        }
        TodoService.prototype.addTask = function (newTask) {
            this.$log.info("add task");
            newTask.avg = 0;
            newTask.min = 0;
            newTask.max = 0;
            newTask.totalDones = 0;
            newTask.totalTime = 0;
            newTask.isRunning = false;
            newTask.isDone = false;
            newTask.owner = Meteor.userId();
            this.todos.push(newTask);
        };
        TodoService.$inject = ['$log', '$meteor', '$mdSidenav'];
        return TodoService;
    })();
    Saydone.TodoService = TodoService;
    angular.module('saydone')
        .service('TodoService', TodoService);
})(Saydone || (Saydone = {}));
//# sourceMappingURL=TodoService.js.map