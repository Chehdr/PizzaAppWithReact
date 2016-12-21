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
  const sub = Meteor.subscribe('AllUsers');
  this.state = {
      subscription: sub
    }
  }
  Panel(){
    if (this.state.subscription.ready()){
      const Role = Roles.getRolesForUser( Meteor.userId() )[0];
      switch(Role){
        case 'guest' : browserHistory.push('/panel/guest'); break
        case 'admin' : browserHistory.push('/panel/admin'); break
        case 'user' : browserHistory.push('/panel/user'); break
        case undefined : browserHistory.push('/loginreg'); break
      }
    }
  }
  render() {
  return <div> {this.Panel()} </div>
  }
};