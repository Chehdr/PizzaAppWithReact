import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import '../groups.js';
import '../../orders/orders.js';
import '../../events/events.js';

Meteor.methods({
  'group.createGroup': function (name) {
    check(name, String);
    Roles.removeUsersFromRoles(Meteor.userId(), 'guest');
    Roles.addUsersToRoles(Meteor.userId(), ['admin']);
    let info = { 
    	name: name, 
      image: '', 
      AdminGroup: Meteor.userId(), 
      AdminGroupName: Meteor.user().emails[0].address,
      dateCreate: new Date(), 
      invite: [],
      users: [],
      menu: [],
      coupons: []
    }
    Groups.insert( info );
  },  
  'group.deleteGroup': function() {
    Roles.removeUsersFromRoles( Meteor.userId(), 'admin');
    Roles.addUsersToRoles(Meteor.userId(), ['guest']);
    const group = Groups.findOne({'AdminGroup': Meteor.userId()});
    _.each(group.users, function(id){ 
      Roles.removeUsersFromRoles( id, 'user');
      Roles.addUsersToRoles( id, 'guest');    
    });
    Groups.remove({'_id': Group._id});
    UserEvents.remove({'groupId': Group._id});
    Orders.remove({'idGroup': Group._id});
  },
  'group.sendInvite': function(userId){
    check(userId, String);
    Groups.update({ 'AdminGroup': Meteor.userId() }, { $push: { 'invite': {'userId': userId} } });
  },  
  'group.acceptInviteToGroup': function(groupId){
    check(groupId, String);
    Roles.removeUsersFromRoles( Meteor.userId(), 'guest');
    Roles.addUsersToRoles(Meteor.userId(), ['user']);
    Groups.update({'_id': groupId }, { $push: { 'users': Meteor.userId() } });
    Groups.update({invite:{userId:Meteor.userId()}}, { $pull: { "invite" : { userId: Meteor.userId()} } },{multi: true});
  },
  'group.declineInviteToGroup': function(groupId){
    check(groupId, String);
    Groups.update({'_id': groupId }, { $pull: { "invite" : { userId: Meteor.userId()} } }, false, true );
  },
  'group.removeUserFromGroup': function(userId){
    check(userId, String);
    Roles.removeUsersFromRoles( userId, 'user');
    Roles.addUsersToRoles(Meteor.userId(), ['guest']);
    Groups.update({'AdminGroup': Meteor.userId() }, { $pull: { 'users': userId } });
  },  
  'group.leaveGroup': function(){
    Groups.update({}, { $pull: { 'users': Meteor.userId() } },{multi: true});
    const ifUserInGroups = Groups.findOne({ 'users': { $in: [Meteor.userId() ] }}); // якось так)
    if (ifUserInGroups.lenght === 0){
      Roles.removeUsersFromRoles( Meteor.userId(), 'user');
      Roles.addUsersToRoles(Meteor.userId(), ['guest']);
    }
  },  
  'group.insertMenu': function(menu){
    check( menu, { id: String, name: String, price: Number, coupons: Number }); 
    if(Roles.userIsInRole(Meteor.userId(), 'admin')){
      Groups.update({'AdminGroup': Meteor.userId()}, { $push: { 'menu': menu } });
    }else{
      Groups.update({ 'users': { $in: [Meteor.userId() ] }} , { $push: { 'menu': menu } });
    }
  },
  'group.menuRowDelete': function(row){
    check( row, String);
    if(Roles.userIsInRole(Meteor.userId(), 'admin')){
      Groups.update({'AdminGroup': Meteor.userId()}, { "$pull": { "menu": { "id": row } }});
    }else{
      Groups.update({ 'users': { $in: [Meteor.userId() ] }} , { "$pull": { "menu": { "id": row } }});
    }
  },
  'group.menuRowChange': function(row){
    check( row, { id: String, name: String, price: Number, coupons: Number });  
    if(Roles.userIsInRole(Meteor.userId(), 'admin')){
      Groups.update({'AdminGroup': Meteor.userId(), 'menu.id': row.id}, { "$set": { "menu.$": row }});
    }else{
      Groups.update({ 'users': { $in: [Meteor.userId() ] }, 'menu.id': row.id}, { "$set": { "menu.$": row }});
    }
  },
  'group.addCoupon': function(row){
    check( row, { id: String, name: String, price: Number, coupons: Number });  
    Groups.update({'AdminGroup': Meteor.userId(), 'menu.id': row.id}, { "$set": { "menu.$": row }});
  }
});