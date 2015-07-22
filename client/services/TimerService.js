/// <reference path="../../typings/tsd.d.ts" />
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
            if (!this.timerPromise) {
                task.startTime = this.startTime = new Date();
                task.isRunning = true;
                this.timerPromise = this.$interval(function (test) {
                    var now = new Date();
                    _this.elapsedMs = now.getTime() - _this.startTime.getTime();
                    task.runTime = _this.elapsedMs + _this.totalElapsedMs;
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
                this.totalElapsedMs += this.elapsedMs;
                task.runTime = this.totalElapsedMs;
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
            task.runTime = this.totalElapsedMs = this.elapsedMs = 0;
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
                this.stop(task);
                return false;
            }
            else {
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