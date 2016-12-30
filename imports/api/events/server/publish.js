import { Meteor } from 'meteor/meteor';

Meteor.publish("UserEvents", function () {
  return UserEvents.find({});
});
