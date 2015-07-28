/// <reference path="../../typingsCustom/myInterfaces.d.ts" />
var Saydone;
(function (Saydone) {
    /**
     * A timer Service handling stopwatch time.
     */
    var TimerService = (function () {
        function TimerService($interval, $log) {
            this.$interval = $interval;
            this.$log = $log;
            this.totalElapsedMs = 0;
            this.elapsedMs = 0;
        }
        /**
         * Lambda
         * function(){} === () => {}
         * function(attribute){} === (attribute) => {}
         */
        /**
         * Starts the timer
         */
        TimerService.prototype.start = function (task) {
            var _this = this;
            this.$log.info("start task");
            this.$log.info("total: " + task.totalElapsedMs);
            this.$log.info("start: " + task.startTime);
            this.$log.info("run: " + task.runTime);
            if (task.totalElapsedMs < 0 || isNaN(task.totalElapsedMs)) {
                task.totalElapsedMs = 0;
            }
            if (!this.timerPromise) {
                task.startTime = this.startTime = new Date();
                task.isRunning = true;
                this.timerPromise = this.$interval(function (test) {
                    var now = new Date();
                    _this.elapsedMs = now.getTime() - _this.startTime.getTime();
                    // task.runTime=this.elapsedMs+this.totalElapsedMs;
                    task.runTime = _this.elapsedMs + task.totalElapsedMs;
                    // this.$log.info("count: "+this.elapsedMs);
                    // this.$log.info("start: "+this.startTime);
                    // this.$log.info("now: "+now);
                }, 1000);
            }
        };
        /**
         * Stops the running timer, like a pause button
         */
        TimerService.prototype.stop = function (task) {
            if (this.timerPromise) {
                this.$interval.cancel(this.timerPromise);
                this.timerPromise = undefined;
                task.totalElapsedMs += this.elapsedMs;
                task.runTime = task.totalElapsedMs;
                this.elapsedMs = 0;
                // this.$log.info("stop total: "+this.totalElapsedMs);
                task.isRunning = false;
            }
        };
        /**
         * Resets the timer to Zero
         */
        TimerService.prototype.reset = function (task) {
            this.stop(task);
            task.startTime = this.startTime = new Date();
            task.runTime = task.totalElapsedMs = this.elapsedMs = 0;
        };
        /**
         * Gets the time that the timer has run
         */
        TimerService.prototype.getElapsedMs = function () {
            return this.totalElapsedMs + this.elapsedMs;
            this.$log.info("gettime: " + this.totalElapsedMs + this.elapsedMs);
        };
        /**
         * Handles request for the task is done. returns
         * stops the timer if its running, and resets it.
         * @returns Returns data from timer about the the timer run.
         */
        TimerService.prototype.done = function (task) {
            this.stop(task);
        };
        /**
         * Toggle the timer (start/pause)
         * @return if its running return true.
         * if its stoped return false
         */
        TimerService.prototype.toggle = function (task) {
            if (this.timerPromise) {
                this.$log.info("calling STOP on timer");
                this.stop(task);
                return false;
            }
            else {
                this.$log.info("calling START on timer");
                this.start(task);
                return true;
            }
        };
        //private $interval:ng.IIntervalService; 
        TimerService.$inject = ['$interval', '$log'];
        return TimerService;
    })();
    Saydone.TimerService = TimerService;
    angular.module('saydone')
        .service('TimerService', TimerService);
})(Saydone || (Saydone = {}));
//# sourceMappingURL=TimerService.js.map