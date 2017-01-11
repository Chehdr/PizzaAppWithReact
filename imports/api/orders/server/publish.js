import { Meteor } from 'meteor/meteor';
import { Orders } from '../Orders.js';

Meteor.publish("Orders", function () {
  return Orders.find({});
});
