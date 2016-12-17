import { Meteor } from 'meteor/meteor';

Meteor.publish("Groups", function () {
  return Groups.find({});
});

Meteor.publish("AllUsers", function () {
  return Meteor.users.find({});
});

