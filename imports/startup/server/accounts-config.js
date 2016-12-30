import { Meteor } from 'meteor/meteor';

Accounts.onCreateUser(function(options, user) {
  const userProfile = Object.assign({}, user);
  if(user.services.google === undefined){
    userProfile.emails = user.emails;
    userProfile.name = user.emails[0].address;
  }else{
    userProfile.profile = { 
      firstName: user.services.google.given_name, 
      lastName: user.services.google.family_name
    };
    userProfile.emails = [{address: user.services.google.email}];
    userProfile.name = user.services.google.email;
  }
  userProfile.roles = ['guest'];
  return userProfile
});

