///<reference path='../../../typingsCustom/myInterfaces.d.ts' />
var Saydone;
(function (Saydone) {
    /**
     * Main
     */
    // class Main extends TestTimer{
    var Main = (function () {
        function Main($meteor, $log, timerService, todoService) {
            this.$log = $log;
            this.timerService = timerService;
            this.todoService = todoService;
            this.thereIsATaskRunning = false;
            this.componentName = 'main';
            this.todos = $meteor.collection(Todos).subscribe('todos');
        }
        Main.prototype.deleteTask = function (task) {
            this.todos.splice(this.todos.indexOf(task), 1);
        };
        //Handle timmer stuff
        Main.prototype.toggleTimer = function (task) {
            this.$log.info("calling toggle timer");
            this.thereIsATaskRunning = this.timerService.toggle(task);
        };
        Main.prototype.setTaskDone = function (task) {
            this.$log.info("Doing done stuff");
            //stop task
            this.timerService.stop(task);
            this.thereIsATaskRunning = false;
            //save data
            //when a task is set to done
            if (!task.isDone) {
                this.$log.info("Doing done stuff");
                task.totalDones++;
                //Never ran
                //then there is no start or end
                if (task.runTime == undefined) {
                    this.$log.info("tot: " + task.totalDones);
                }
                else {
                    //calc avg min max time
                    if (task.min > task.runTime || task.min == 0) {
                        if (task.runTime != 0)
                            task.min = task.runTime;
                    }
                    if (task.max < task.runTime) {
                        task.max = task.runTime;
                    }
                    //total time
                    task.totalTime += task.runTime;
                    task.avg = task.totalTime / task.totalDones;
                }
                this.resetTime(task);
            }
            task.isDone = !task.isDone;
            this.$log.info("setting is done/or not " + task.isDone);
        };
        Main.prototype.resetTime = function (task) {
            this.timerService.reset(task);
            this.thereIsATaskRunning = false;
        };
        Main.$inject = ['$meteor', '$log', 'TimerService', 'TodoService'];
        return Main;
    })();
    function shmckMain() {
        return {
            templateUrl: 'client/components/main/main.ng.html',
            controllerAs: 'main',
            controller: Main
        };
    }
    angular.module('saydone')
        .directive('shmckMain', shmckMain);
})(Saydone || (Saydone = {}));
//# sourceMappingURL=main.js.map