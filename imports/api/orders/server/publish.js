import { Meteor } from 'meteor/meteor';


Meteor.publish("Orders", function () {
  return Orders.find({});
});
