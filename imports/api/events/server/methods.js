import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { UserEvents } from '../UserEvents.js';
import { Orders } from '../../orders/Orders.js';
import { Groups } from '../../groups/Groups.js';

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
    if(Roles.userIsInRole(Meteor.userId(), 'admin')){
      Groups.update({'AdminGroup': Meteor.userId()}, { $set: { menu: []}});
    }else{
      Groups.update({ 'users': Meteor.userId()}, { $set: { menu: []}});
    }
    UserEvents.update({'_id': idEvent}, {$set: {'status': 'ordering'}});
  },
  'Event.checkStatus': function(idEvent){
    check(idEvent, String);
    const allStatus = ['ordering', 'ordered', 'delivering', 'delivered'];
    const status = UserEvents.findOne({'_id': idEvent}).status;
    let index = allStatus.indexOf(status);
    if(allStatus[0] === status){
      Meteor.call('Order.sendOrder', idEvent);
    }
    if(index < 3){index++}
    Meteor.call('Event.changeStatus', idEvent, allStatus[index]);
  }
});