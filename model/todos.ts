/**
 * Created by sebadmin on 2015-07-10.
 */
/// <reference path="../typings/tsd.d.ts" />

interface JobDAO {
    _id?: string;
    name: string;
    status?: string;
    queuedAt?: string;
    owner?:string;
}
declare var Todos:Mongo.Collection<JobDAO>;
Todos = new Mongo.Collection<JobDAO>("todos");

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


