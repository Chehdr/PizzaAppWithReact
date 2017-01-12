import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';

import emailTemplate from './emailTemplate.js';

import { UserEvents } from '../../events/UserEvents.js';
import { Orders } from '../Orders.js';
import { Groups } from '../../groups/Groups.js';


Meteor.methods({
  'Order.insertOrder': function(row, eventId){
    check( row, { id: String, name: String, price: Number, coupons: Number, count: Number });  
    check(eventId, String);
    const userOrder = Orders.findOne({idUser: Meteor.userId(), idEvent: eventId});
    const idGroup = UserEvents.findOne( { '_id': eventId}).groupId;
    if(userOrder){
      Orders.update({idUser : Meteor.userId(), idEvent : eventId}, { "$push": { order: row }});
    }else{
      const order = {
        idGroup, // я правильно зрозумів?
        confirm: false,
        idUser: Meteor.userId(),
        idEvent: eventId,
        order: [row]
      }
      Orders.insert( order );  
    }
  },
   'Order.confirm': function(eventId){
     check(eventId, String);
     Orders.update({idUser : Meteor.userId(), idEvent : eventId}, { "$set": { confirm: true }});
   },
  'Order.deleteRow': function(id, eventId){
    check(eventId, String);
    check(id, String);
    Orders.update({idUser : Meteor.userId(), idEvent : eventId}, { "$pull": { order: { id: id } }});
  },
  'Order.sendOrder': function(idEvent){
    const users = UserEvents.findOne({_id: idEvent});
    const adminEventEmail = Meteor.user( {id: users.createUser  } ).name;
    const options = {
      from: 'PizzaDayRobot@gmail.com',
      subject: 'Hello from Pizza Day!',
    }
    const allOrders = Orders.find({idEvent: idEvent, confirm: true})
      .map( function(order) {
        const userEmail = Meteor.users.findOne({_id: order.idUser  }).name; //По одному повідомленню користувачам
        options.to = userEmail;
        options.html = emailTemplate(order.order);
        Email.send(options);
        return order.order 
      })
      options.to = adminEventEmail;
      options.html = emailTemplate(allOrders);
    Email.send(options); //І ще одне адміну з усіма замовленнями
  } 
});
