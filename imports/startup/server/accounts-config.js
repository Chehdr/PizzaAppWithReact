import { Meteor } from 'meteor/meteor';

Accounts.onCreateUser(function(options, user) {
  if(user.services.google == undefined){
    user.profile = options.profile;
    user.emails = user.emails;
    user.name = user.emails[0].address;
    //user.name = options.profile['first-name'] + ' ' + options.profile['last-name'];
    }else{
    user.profile = { 
      'first-name': user.services.google.given_name, 
      'last-name': user.services.google.family_name
    };
    user.emails = [{'address': user.services.google.email}];
    user.name = user.services.google.email;
  }
  user.roles = ['guest'];
  return user
});

