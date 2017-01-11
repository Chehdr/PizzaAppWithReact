import { Meteor } from 'meteor/meteor';
import { UserEvents } from '../UserEvents.js';

Meteor.publish("UserEvents", function () {
  return UserEvents.find({});
});
