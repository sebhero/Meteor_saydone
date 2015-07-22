///<reference path='../typingsCustom/myInterfaces.d.ts' />
'use strict';
Meteor.publish('todos', function (options) {
    return Todos.find({
        $or: [
            { $and: [
                    { "public": true },
                    { "public": { $exists: true } }
                ] },
            { $and: [
                    { owner: this.userId },
                    { owner: { $exists: true } }
                ] }
        ] });
});
//# sourceMappingURL=todos.publish.js.map