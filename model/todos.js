///<reference path='../typingsCustom/myInterfaces.d.ts' />
Todos = new Mongo.Collection('todos');
Todos.allow({
    insert: function (userId, todo) {
        return userId && todo.owner === userId;
    },
    update: function (userId, todo, fields, modifier) {
        if (userId !== todo.owner)
            return false;
        return true;
    },
    remove: function (userId, todo) {
        if (userId !== todo.owner)
            return false;
        return true;
    }
});
////disables add/update and remove
// Todos.allow({
//   update: function () { return false; },
//   remove: function () { return false; }
// }); 
//# sourceMappingURL=todos.js.map