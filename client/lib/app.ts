//@Author Sebastian Börebäck 2015-07-06
/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../model/todos.ts" />

interface ITodo{
    avg:number;
    min:number;
    max:number;
    title:string;
    totalDones:number;
    totalTime:number;
    isRunning: boolean;
    isDone:boolean;
    startTime?:Date;
    endTime?:Date;
    runTime?:number;
    owner?:any;
}


    var app = angular.module('saydone',['angular-meteor','ngMaterial','ngMdIcons','ngAnimate']);
    //.config(function($mdThemingProvider) {
    //    var customBlueMap = 		$mdThemingProvider.extendPalette('light-blue', {
    //        'contrastDefaultColor': 'light',
    //        'contrastDarkColors': ['50'],
    //        '50': 'ffffff'
    //    });
    //    $mdThemingProvider.definePalette('customBlue', customBlueMap);
    //    $mdThemingProvider.theme('default')
    //        .primaryPalette('customBlue', {
    //            'default': '500',
    //            'hue-1': '50'
    //        })
    //        .accentPalette('pink');
    //    $mdThemingProvider.theme('input', 'default')
    //        .primaryPalette('grey')
    //});
    //TODO maybe not working when deployed

app.filter('prettyTime', function () {
    return function (item:number) {
        var totalSec = item;
        var hours:number = Math.floor(totalSec / 3600  % 24);
        var minutes:number = Math.floor(( totalSec / 60 ) % 60);
        var seconds:number = Math.floor(totalSec % 60);

        var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);

        return result;
    };
});


    angular.module('saydone').controller('AppCtrl', ['$scope', '$meteor','$interval','$mdSidenav','$log',
        function ($scope, $meteor,$interval,$mdSidenav,$log) {

            $scope.isTimerRunning = false;

            var theTodos = $meteor.collection(Todos);
            $scope.todos = theTodos;

            //this function is used to close the left hand side nav bar.
            $scope.toggleLeft = function() {
                $mdSidenav('left').toggle().then(function(){
                    //$log.debug("toggle left is done");
                });
            };

            //Adds new task to list
            $scope.addTask= function(newTask:ITodo)
            {
                $log.info("newtask: "+newTask.title);
                //add extra data
                //var temp = $scope.newTask;
                newTask.avg=0;
                newTask.min=0;
                newTask.max=0;
                newTask.totalDones = 0;
                newTask.totalTime=0;
                newTask.isRunning = false;
                newTask.isDone = false;
                newTask.owner = Meteor.userId();

                //add to list
                $scope.todos.push(newTask);
                //clear input
                //TODO fix expression excepted

                //$scope.newTask<ITodo> = {};

            };

            $scope.deleteTask= function(task)
            {
                $scope.todos.splice($scope.todos.indexOf(task),1);
            };

            var promise;

            var tempTask:ITodo;

            function clock (){
                tempTask.runTime = tempTask.runTime+1;
            }

            $scope.start = function(theTask:ITodo)
            {
                $scope.stop();

                tempTask = theTask;
                promise = $interval(clock,1000);
            };

            $scope.stop = function()
            {
                $interval.cancel(promise);
            };

            // stops the interval when the scope is destroyed,
            // this usually happens when a route is changed and
            // the ItemsController $scope gets destroyed. The
            // destruction of the ItemsController scope does not
            // guarantee the stopping of any intervals, you must
            // be responsible of stopping it when the scope is
            // is destroyed.
            $scope.$on('$destroy', function() {
                $scope.stop();
            });

            $scope.setTaskDone = function(theTask:ITodo)
            {


                //TODO remove only debug
                //calculate avg min max time.
                $log.info("runtime: "+theTask.runTime);
                $log.info("starttime: "+theTask.startTime);
                $log.info("endtime: "+theTask.endTime);

                //when a task is set to done
                if(!theTask.isDone)
                {
                    theTask.totalDones++;
                    //Never ran
                    //then there is no start or end
                    if(theTask.runTime == undefined)
                    {
                        $log.info("tot: "+theTask.totalDones);
                    }
                    else
                    {
                        //the task has been run
                        //stop running task
                        if(theTask.isRunning)
                        {    $scope.startTask(theTask);}


                        //calc avg min max time
                        if(theTask.min > theTask.runTime)
                        {
                            theTask.min = theTask.runTime;
                        }

                        if(theTask.max < theTask.runTime)
                        {
                            theTask.max = theTask.runTime;
                        }

                        //total time
                        theTask.totalTime +=theTask.runTime;

                        theTask.avg = theTask.totalTime/theTask.totalDones;
                    }
                    theTask.runTime=0;

                }
                theTask.isDone = !theTask.isDone;

            };


            //starts stops current task
            $scope.startTask= function(theTask:ITodo)
            {
                //is running
                if(theTask.isRunning)
                {
                    //save time, stop running
                    theTask.endTime = new Date();

                    theTask.isRunning = !theTask.isRunning;
                    $scope.isTimerRunning = !$scope.isTimerRunning;

                    //$log.info("timer stopped start "+theTask.startTime);
                    //$log.info("end "+theTask.endTime);
                    //$log.info("end runtime "+theTask.runTime);
                    //TODO do end stuff
                    //stop intervall
                    $scope.stop();
                    tempTask=<ITodo>{};
                    //is done
                    if(theTask.isDone)
                        theTask.runTime = 0;

                }
                else
                {
                    //is not running PAUSED/STOPED
                    //start time, get current time
                    theTask.startTime = new Date();
                    //Is done reset time
                    if(theTask.isDone)
                        theTask.runTime = 0;

                    //firsttime Run
                    if(theTask.runTime == undefined)
                        theTask.runTime = 0;

                    theTask.isRunning = !theTask.isRunning;
                    $scope.isTimerRunning = !$scope.isTimerRunning;
                    //start interval
                    $scope.start(theTask);


                    //$log.info("statime "+theTask.startTime);
                }
            }


    }]);
