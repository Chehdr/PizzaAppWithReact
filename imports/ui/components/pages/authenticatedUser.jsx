import React, { Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

export default class authenticatedUser extends TrackerReact(React.Component){  

  getMeteorData() {
    return {
      isAuthenticated: Meteor.userId() !== null
    };
  }
  componentWillMount () {
    if (!this.getMeteorData().isAuthenticated) {
      browserHistory.push('/loginreg');
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (!this.getMeteorData().isAuthenticated) {
      browserHistory.push('/loginreg');
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}