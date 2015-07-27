/// <reference path="../../typingsCustom/myInterfaces.d.ts" />


namespace Saydone{
	/**
	 * A timer Service handling stopwatch time.
	 */
	export class TimerService{
		
		private totalElapsedMs:number = 0;
		private elapsedMs:number = 0;
		private startTime:Date;
		private timerPromise:ng.IPromise<any>;
		//private $interval:ng.IIntervalService; 


		static $inject = ['$interval','$log'];
		constructor(public $interval:ng.IIntervalService,public $log:ng.ILogService){
		}
		
		
		/**
		 * Lambda
		 * function(){} === () => {}
		 * function(attribute){} === (attribute) => {}
		 */

		/**
		 * Starts the timer
		 */
		start(task:ITodo):void{
			if(!this.timerPromise)
			{
				task.startTime=this.startTime = new Date();
				task.isRunning=true;
				this.timerPromise=this.$interval((test) =>{
					var now = new Date();
					
					this.elapsedMs = now.getTime() - this.startTime.getTime();
					task.runTime=this.elapsedMs+this.totalElapsedMs;
					// this.$log.info("count: "+this.elapsedMs);
					// this.$log.info("start: "+this.startTime);
					// this.$log.info("now: "+now);
				},1000);
			}			
		}
		
		/**
		 * Stops the running timer, like a pause button
		 */
		stop(task:ITodo)
        {
			if(this.timerPromise){
	        	this.$interval.cancel(this.timerPromise);
				this.timerPromise = undefined;
				this.totalElapsedMs += this.elapsedMs;
				task.runTime=this.totalElapsedMs;
				this.elapsedMs =0;
				// this.$log.info("stop total: "+this.totalElapsedMs);
				task.isRunning=false;
			}
        }
		
		/**
		 * Resets the timer to Zero
		 */
		reset(task:ITodo){
			this.stop(task);
			task.startTime=this.startTime = new Date();
			task.runTime=this.totalElapsedMs = this.elapsedMs = 0;
		}
		
		/**
		 * Gets the time that the timer has run
		 */
		getElapsedMs():number
		{
			return this.totalElapsedMs + this.elapsedMs;
			this.$log.info("gettime: "+this.totalElapsedMs + this.elapsedMs);
		}
		
		/**
		 * Handles request for the task is done. returns 
		 * stops the timer if its running, and resets it.
		 * @returns Returns data from timer about the the timer run.
		 */
		done(task:ITodo){
			this.stop(task);
		}
		
		
		/**
		 * Toggle the timer (start/pause)
		 * @return if its running return true.
		 * if its stoped return false
		 */
		toggle(task:ITodo){
			if(this.timerPromise){
				this.stop(task);
				return false;
			}else{
				this.start(task);
				return true;
			}
			
		}
		
	}

angular.module('saydone')
        .service('TimerService', TimerService);

}