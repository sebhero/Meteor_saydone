 ///<reference path='../../typingsCustom/myInterfaces.d.ts' />
 declare var Todos: Mongo.Collection<ITodo>;
 
 Meteor.startup(function () {
	 
	//  if (Todos.find().count() === 0) {
    //        var todos = [
    //            {
    //                avg: 10,
    //                min: 7,
    //                max: 7,
    //                title: "Dammsuga",
    //                totalDones: 1,
    //                totalTime: 0,
    //                isRunning: false,
    //                isDone:true
    //            },
    //            {
    //                avg: 1.03,
    //                min: 0.10,
    //                max: 1.00,
    //                title: "Tvätta",
    //                totalDones: 3,
    //                totalTime: 0,
    //                isRunning: false,
    //                isDone:false
    //            },
    //            {
    //                avg: 1.03,
    //                min: 0.10,
    //                max: 1.00,
    //                title: "Diska",
    //                totalDones: 3,
    //                totalTime: 0,
    //                isRunning: false,
    //                isDone:false
    //            }
    //        ];
    //        for (var i = 0; i < todos.length; i++)
    //            Todos.insert(todos[i]);
    //     }
    //     else
    //     {
    //         console.log("Loading todos...");
    //     }
	 
 });