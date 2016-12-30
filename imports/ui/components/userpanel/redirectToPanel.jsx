import React from 'react';
import { browserHistory } from 'react-router';

export default function redirectToPanel (nextState, replace, callback) {
  const sub = Meteor.subscribe('AllUsers')
  Tracker.autorun(function() {
    if (sub.ready()){
      const role = Roles.getRolesForUser( Meteor.userId() )[0];
      switch(role){
        case 'guest' : browserHistory.push('/panel/guest'); break
        case 'admin' : browserHistory.push('/panel/admin'); break
        case 'user' : browserHistory.push('/panel/user'); break
      }
    }
  });
  callback();
}
