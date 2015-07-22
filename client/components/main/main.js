///<reference path='../../../typingsCustom/myInterfaces.d.ts' />
var Saydone;
(function (Saydone) {
    /**
     * Main
     */
    // class Main extends TestTimer{
    var Main = (function () {
        function Main($meteor, $log, timerService) {
            this.$log = $log;
            this.timerService = timerService;
            this.thereIsATaskRunning = false;
            this.componentName = 'main';
            this.todos = $meteor.collection(Todos).subscribe('todos');
        }
        Main.prototype.addTask = function (newTask) {
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
                        task.min = task.runTime;
                    }
                    if (task.max < task.runTime) {
                        task.max = task.runTime;
                    }
                    //total time
                    task.totalTime += task.runTime;
                    task.avg = task.totalTime / task.totalDones;
                }
                task.runTime = 0;
            }
            task.isDone = !task.isDone;
            this.$log.info("setting is done/or not " + task.isDone);
        };
        Main.prototype.resetTime = function (task) {
            this.timerService.reset(task);
            this.thereIsATaskRunning = false;
        };
        Main.$inject = ['$meteor', '$log', 'TimerService'];
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