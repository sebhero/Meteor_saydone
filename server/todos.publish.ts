///<reference path='../typingsCustom/myInterfaces.d.ts' />


'use strict';
declare var Todos:Mongo.Collection<ITodo>;

Meteor.publish('todos', function(options) {
  return Todos.find({
   $or:[
      {$and:[
        {"public": true},
        {"public": {$exists: true}}
      ]},
      {$and:[
        {owner: this.userId},
        {owner: {$exists: true}}
      ]}
    ]});
});