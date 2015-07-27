/**
 * Created by seb on 2015-07-27.
 */
/// <reference path="../../typingsCustom/myInterfaces.d.ts" />
namespace Saydone{
	declare var Todos: Mongo.Collection<ITodo>;

	export class TodoService{

		private todos:Array<ITodo>;

		static $inject = ['$log','$meteor','$mdSidenav'];
		public searchFilter:string;

		constructor(public $log:ng.ILogService, private $meteor:angular.meteor.IMeteorService){

			$log.info("TODOSERVICE LOADED");
			this.todos = $meteor.collection(Todos).subscribe('todos');
		}

		addTask(newTask:ITodo){
			this.$log.info("add task");


			newTask.avg=0;
			newTask.min=0;
			newTask.max=0;
			newTask.totalDones=0;
			newTask.totalTime=0;
			newTask.isRunning = false;
			newTask.isDone = false;
			newTask.owner = Meteor.userId();

			this.todos.push(newTask);
		}


	}

	angular.module('saydone')
		.service('TodoService', TodoService);
}