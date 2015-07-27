///<reference path='../../../typingsCustom/myInterfaces.d.ts' />


namespace Saydone{
	declare var Todos: Mongo.Collection<ITodo>;
/**
 * Main
 */
// class Main extends TestTimer{
class Main{
	
	componentName:string;
	thereIsATaskRunning:boolean = false;
	private todos:Array<ITodo>;

	static $inject = ['$meteor','$log','TimerService','TodoService'];

	
	constructor($meteor:angular.meteor.IMeteorService,
		private $log:ng.ILogService,private timerService:TimerService,
				private todoService:TodoService
		) {
			
		this.componentName = 'main';
		
		
		
		this.todos = $meteor.collection(Todos).subscribe('todos');
	}
	

	
	deleteTask(task)
	{
		this.todos.splice(this.todos.indexOf(task),1);
	}
	
	//Handle timmer stuff
	toggleTimer(task:ITodo){
		this.$log.info("calling toggle timer");
		this.thereIsATaskRunning= this.timerService.toggle(task);		
		
	}

	setTaskDone(task:ITodo)
	{
		this.$log.info("Doing done stuff");
		//stop task
		this.timerService.stop(task);
		this.thereIsATaskRunning=false;
		//save data
        //when a task is set to done
        if(!task.isDone)
        {
			this.$log.info("Doing done stuff");
			task.totalDones++;
	        //Never ran
	        //then there is no start or end
	        if(task.runTime == undefined)
	        {
	            this.$log.info("tot: "+task.totalDones);
	        }
	        else
	        {
	
	            //calc avg min max time
	            if(task.min > task.runTime || task.min == 0)
	            {
					if(task.runTime != 0)
	                	task.min = task.runTime;
	            }
	
	            if(task.max < task.runTime)
	            {
	                task.max = task.runTime;
	            }
	
	            //total time
	            task.totalTime +=task.runTime;
	
	            task.avg = task.totalTime/task.totalDones;
	        }
			this.resetTime(task);
		}
		
		task.isDone = !task.isDone;
		this.$log.info("setting is done/or not "+task.isDone);
		
	}
	
	resetTime(task:ITodo)
	{
		this.timerService.reset(task);
		this.thereIsATaskRunning = false;
	}
	//end of timer stuff
	
	
}

function shmckMain() {
	return {
		templateUrl: 'client/components/main/main.ng.html',
    	controllerAs: 'main',
    	controller: Main		
	};
}

angular.module('saydone')
.directive('shmckMain', shmckMain);
}