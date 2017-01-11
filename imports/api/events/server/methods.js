import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { UserEvents } from '../UserEvents.js';
import { Orders } from '../../orders/Orders.js';

Meteor.methods({
  'Event.createEvent': function(add){
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
  'Event.removeEvent': function(id){
    check(id, String);
    UserEvents.remove({'_id': id});
    Orders.remove({'idEvent': id});
  },
  'Event.joinToEvent': function(idEvent){
    check(idEvent, String);
    UserEvents.update({'_id': idEvent}, {$push: {'accepts': Meteor.userId()}});
  },
  'Event.changeStatus': function(idEvent, status){
    check(idEvent, String);
    check(status, String);
    UserEvents.update({'_id': idEvent}, {$set: {'status': status}});
  },
  'Event.resetEvent': function(idEvent){
    check(idEvent, String);
    Orders.remove({'idEvent': idEvent});
    UserEvents.update({'_id': idEvent}, {$set: {'status': 'ordering'}});
  },
  'Event.checkOrders': function(idEvent){
    check(idEvent, String);
    let status = UserEvents.findOne({'_id': idEvent}).status;
    switch(status){
      case 'ordering' :  status = 'ordered';	Meteor.call('Order.sendOrder', idEvent);  break 
      case 'ordered' : status = 'delivering'; break
      case 'delivering' : status = 'delivered'; break
      case 'delivered' : status = 'ordering'; break
    }
    Meteor.call('Event.changeStatus', idEvent, status);
  }
});