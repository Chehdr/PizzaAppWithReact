import React, { Component} from 'react';
import { render } from 'react-dom';
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

export default class panel extends TrackerReact(React.Component) {

  constructor() {
    super();
    Meteor.subscribe('AllUsers');
  }
  Panel(){
    const Role = Roles.getRolesForUser( Meteor.userId() )[0];
    switch(Role){
      case 'guest' : browserHistory.push('/panel/guest');
      case 'admin' : browserHistory.push('/panel/admin');
      case 'user' : browserHistory.push('/panel/user');
      case undefined : browserHistory.push('/panel/usersds');
    }
  }
  render() {
    this.Panel()
  }
};