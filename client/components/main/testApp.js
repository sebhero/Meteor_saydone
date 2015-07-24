var app = angular.module('StarterApp', ['ngMaterial','ngMdIcons']);

app.controller('AppCtrl',['$scope','$log',
													 '$mdSidenav','$mdDialog', function($scope, $log, $mdSidenav,$mdDialog){


	this.toggleLeft = function() {
		$mdSidenav('left').toggle();
	};

	this.showAdvanced = function(ev) {
		$mdDialog.show({
			controller: AppCtrl,
			templateUrl: 'dialog1.tmpl.html',
			parent: angular.element(document.body),
			targetEvent: ev,
		})
		.then(function(answer) {
			$scope.alert = 'You said the information was "' + answer + '".';
		}, function() {
			$scope.alert = 'You cancelled the dialog.';
		});
	};


	this.todos =[];
	this.thereIsATaskRunning = false;

	this.addTask= function(newTask){
		newTask.avg=0;
		newTask.min=0;
		newTask.max=0;
		newTask.totalDones=0;
		newTask.totalTime=0;
		newTask.isRunning = false;
		newTask.isDone = false;
		this.todos.push(newTask);
	}

	this.addTask({title:"test task"});
	this.addTask({title:"other task"});
	this.addTask({title:"more task"});
	this.addTask({title:"more task"});
	this.addTask({title:"more task"});

	this.setTaskDone= function(task){
		task.isDone=!task.isDone;
		}

}]);

	function DialogController($scope, $mdDialog) {
	$scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	$scope.answer = function(answer) {
		$mdDialog.hide(answer);
	};
}

