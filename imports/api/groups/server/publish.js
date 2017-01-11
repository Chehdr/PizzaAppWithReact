import { Meteor } from 'meteor/meteor';
import { Groups } from '../Groups.js';

Meteor.publish("Groups", function () {
  return Groups.find({});
});

Meteor.publish("AllUsers", function () {
  return Meteor.users.find({});
});

