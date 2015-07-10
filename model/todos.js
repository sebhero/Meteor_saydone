/**
 * Created by sebadmin on 2015-07-10.
 */
/// <reference path="../typings/tsd.d.ts" />
Todos = new Mongo.Collection("todos");
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
//# sourceMappingURL=todos.js.map