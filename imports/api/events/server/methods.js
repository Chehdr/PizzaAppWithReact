import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import '../events.js';
import '../../orders/orders.js';

Meteor.methods({
  'event.createEvent': function(add){
    check( add, { _id: String, eventName: String, idGroup: String, status: String });  
    const info = {
      groupId: add.idGroup,
      createUser: Meteor.userId(), 
      dateCreate: new Date(),
      eventName: add.eventName,
      accepts: [Meteor.userId()],
      status: 'ordering'
    }
    UserEvents.insert( info ); 
  },      
  'event.removeEvent': function(id){
    check(id, String);
    UserEvents.remove({'_id': id});
    Orders.remove({'idEvent': id});
  },
  'event.joinToEvent': function(idEvent){
    check(idEvent, String);
    UserEvents.update({'_id': idEvent}, {$push: {'accepts': Meteor.userId()}});
  },
  'event.changeStatus': function(idEvent, status){
    check(idEvent, String);
    check(status, String);
    UserEvents.update({'_id': idEvent}, {$set: {'status': status}});
  },
  'event.resetEvent': function(idEvent){
    check(idEvent, String);
    Orders.remove({'idEvent': idEvent});
    UserEvents.update({'_id': idEvent}, {$set: {'status': 'ordering'}});
  }
});