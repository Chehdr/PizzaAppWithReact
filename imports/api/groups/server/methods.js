import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import '../groups.js';

Meteor.methods({
  CreateGroup: function (name) {
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
  DeleteGroup: function() {
    Roles.removeUsersFromRoles( Meteor.userId(), 'admin');
    Roles.addUsersToRoles(Meteor.userId(), ['guest']);
    const Group = Groups.findOne({'AdminGroup': Meteor.userId()});
    _.each(Group.users, function(id){ 
      Roles.removeUsersFromRoles( id, 'user');
      Roles.addUsersToRoles( id, 'guest');
         
    });
   Groups.remove({'_id': Group._id});
   //Events.remove({'GroupId': Group._id});
   //Orders.remove({'GroupId': Group._id});
  },
    SendInvite: function(userId){
    check(userId, String);
    Groups.update({ 'AdminGroup': Meteor.userId() }, { $push: { 'invite': {'userId': userId} } });
  },  
    AcceptInviteToGroup: function(groupId){
    check(groupId, String);
    Roles.removeUsersFromRoles( Meteor.userId(), 'guest');
    Roles.addUsersToRoles(Meteor.userId(), ['user']);
    Groups.update({'_id': groupId }, { $push: { 'users': Meteor.userId() } });
    Groups.update({invite:{userId:Meteor.userId()}}, { $pull: { "invite" : { userId: Meteor.userId()} } },{multi: true});
  },
    DeclineInviteToGroup: function(groupId){
    check(groupId, String);
    Groups.update({'_id': groupId }, { $pull: { "invite" : { userId: Meteor.userId()} } }, false, true );
  },
  RemoveUserFromGroup: function(userId){
    check(userId, String);
    Roles.removeUsersFromRoles( userId, 'user');
    Roles.addUsersToRoles(Meteor.userId(), ['guest']);
    Groups.update({'AdminGroup': Meteor.userId() }, { $pull: { 'users': userId } });
  },  
  LeaveGroup: function(){
    Roles.removeUsersFromRoles( Meteor.userId(), 'user');
    Roles.addUsersToRoles(Meteor.userId(), ['guest']);
    Groups.update({}, { $pull: { 'users': Meteor.userId() } },{multi: true});
  },  
  GroupMenu: function(menu){
    check( menu, { id: String, name: String, price: String, coupons: String }); 
    if(Roles.userIsInRole(Meteor.userId(), 'admin')){
      Groups.update({'AdminGroup': Meteor.userId()}, { $push: { 'menu': menu } });
    }else{
      Groups.update({ 'users': { $in: [Meteor.userId() ] }} , { $push: { 'menu': menu } });
    }
  },
  menuRowDelete: function(row){
    check( row, String);
    if(Roles.userIsInRole(Meteor.userId(), 'admin')){
      Groups.update({'AdminGroup': Meteor.userId()}, { "$pull": { "menu": { "id": row } }});
    }else{
      Groups.update({ 'users': { $in: [Meteor.userId() ] }} , { "$pull": { "menu": { "id": row } }});
    }
  },
  menuRowChange: function(row){
    check( row, { id: String, name: String, price: String, coupons: String });  
    if(Roles.userIsInRole(Meteor.userId(), 'admin')){
      Groups.update({'AdminGroup': Meteor.userId(), 'menu.id': row.id}, { "$set": { "menu.$": row }});
    }else{
      Groups.update({ 'users': { $in: [Meteor.userId() ] }, 'menu.id': row.id}, { "$set": { "menu.$": row }});
    }
  },
  addCoupon: function(row){
    check( row, { id: String, name: String, price: String, coupons: String });  
    Groups.update({'AdminGroup': Meteor.userId(), 'menu.id': row.id}, { "$set": { "menu.$": row }});
    }
});