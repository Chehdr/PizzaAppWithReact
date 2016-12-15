import { Meteor } from 'meteor/meteor';

Meteor.publish("AllUsers", function () {
  return Meteor.users.find({});
});

