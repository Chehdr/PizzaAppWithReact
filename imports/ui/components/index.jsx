import React, { Component} from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/std:accounts-ui';
import ProfilePage from './userpanel/panel.jsx';

export default class IndexPage extends Component {
  render() {
    return (
      <div> { Meteor.userId() ? <ProfilePage/> :  browserHistory.push('/login')} </div>
    )
  }
}