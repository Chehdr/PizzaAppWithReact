import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import '../orders.js';
import '../../groups/groups.js';
import '../../events/events.js';

Meteor.methods({
  'order.insertOrder': function(row, eventId){
    check( row, { id: String, name: String, price: String, coupons: String });  
    check(eventId, String);
    const ifOrder = Orders.findOne({idUser: Meteor.userId()});
    const idGroup = UserEvents.findOne( { '_id': eventId}).groupId;
    if(ifOrder){
      Orders.update({idUser : Meteor.userId(), idEvent : eventId}, { "$push": { order: row }});
    }else{
      const order = {
        idGroup: idGroup,
        idUser: Meteor.userId(),
        idEvent: eventId,
        order: [row]
      }
      Orders.insert( order );  
    }
  },
  'order.deleteRow': function(id, eventId){
    check(eventId, String);
    check(id, String);
    Orders.update({idUser : Meteor.userId(), idEvent : eventId}, { "$pull": { order: { id: id } }});
  },
  'order.sendOrder': function(idEvent, idGroup){
   
  }  
});
