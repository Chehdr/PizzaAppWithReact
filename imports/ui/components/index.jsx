import React, { Component} from 'react';
import { render } from 'react-dom';
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import GuestPage from './pages/guestPanel';
import UserPage from './pages/userPanel';
import AdminPage from './pages/adminPanel';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

export default class index extends TrackerReact(React.Component) {

  constructor() {
    super();
    Meteor.subscribe('AllUsers');
  }
  Panel(){
    const Role = Roles.getRolesForUser( Meteor.userId() )[0];
    switch(Role){
      case 'guest' : browserHistory.push('guest');
      case 'admin' : browserHistory.push('admin');
      case 'user' : return <UserPage />;
    }
  }
  render() {
  return <div> {this.Panel()} </div>
  }
};