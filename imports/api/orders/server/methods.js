import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';

import emailTemplate from './emailTemplate.js';

import '../orders.js';
import '../../groups/groups.js';
import '../../events/events.js';

Meteor.methods({
  'order.insertOrder': function(row, eventId){
    check( row, { id: String, name: String, price: Number, coupons: Number, count: Number });  
    check(eventId, String);
    const ifOrder = Orders.findOne({idUser: Meteor.userId()});
    const idGroup = UserEvents.findOne( { '_id': eventId}).groupId;
    if(ifOrder){
      Orders.update({idUser : Meteor.userId(), idEvent : eventId}, { "$push": { order: row }});
    }else{
      const order = {
        idGroup: idGroup,
        confirm: false,
        idUser: Meteor.userId(),
        idEvent: eventId,
        order: [row]
      }
      Orders.insert( order );  
    }
  },
   'order.confirm': function(eventId){
     check(eventId, String);
     Orders.update({idUser : Meteor.userId(), idEvent : eventId}, { "$set": { confirm: true }});
   },
  'order.deleteRow': function(id, eventId){
    check(eventId, String);
    check(id, String);
    Orders.update({idUser : Meteor.userId(), idEvent : eventId}, { "$pull": { order: { id: id } }});
  },
  'order.sendOrder': function(idEvent){
    const users = UserEvents.findOne({_id: idEvent});
    const adminEventEmail = Meteor.user( {id: users.createUser  } ).name;
    const allOrders = Orders.aggregate([
      { $match: {idEvent: idEvent, confirm: true}},         
      { "$unwind": "$order" },        
       { "$group": {            
         "_id": "$order.name",           
         "name": { "$first": "$order.name" },           
         "price": { "$first": "$order.price" },
         "coupons": { "$first": "$order.coupons" },             
         "totalqty": { "$sum": "$order.count" }         
        }
       },
      { $project: { 
        newPrice: { $multiply: [ { $divide: [  { $subtract: ["$totalqty", "$coupons"] }, "$totalqty" ] },  '$price'] },
        coupons: "$coupons",
        count: "$totalqty",
        } 
      },
      { $project: { 
        newPrice: "$newPrice",
        count: "$count",
        coupons: "$coupons",
        summ: { $multiply: [ "$newPrice",  "$count"] },
        } 
      }  
      ]);
    const options = {
      from: 'PizzaDayRobot@gmail.com',
      to: adminEventEmail,
      subject: 'Hello from Pizza Day!',
      html: emailTemplate(allOrders)
    }
    Email.send(options);
  } //Можна продовжувати робити через aggregate? чи порадите щось інше?
});
