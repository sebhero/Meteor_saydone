///<reference path='../typingsCustom/myInterfaces.d.ts' />

declare var Todos: Mongo.Collection<ITodo>;

Todos = new Mongo.Collection<ITodo>('todos');

////disables add/update and remove
// Todos.allow({
//   update: function () { return false; },
//   remove: function () { return false; }
// });