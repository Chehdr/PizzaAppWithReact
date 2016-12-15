import React, { Component} from 'react';
import { render } from 'react-dom';
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import GuestPage from '../pages/guestpanel';
import UserPage from '../pages/userpanel';
import AdminPage from '../pages/adminpanel';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class PanelPage extends Component {
    
  render() {
    return (
      <div>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-body"><Accounts.ui.LoginForm formState={STATES.PROFILE} /></div>
            <div className="panel-footer"><PostContainer /></div>
          </div>
        </div>
    </div>
      
    );
  }
}
class PostContainer extends TrackerReact(React.Component) {

  constructor() {
    super();
    Meteor.subscribe('AllUsers');
  }
  Panel(){
    let Role = Roles.getRolesForUser( Meteor.userId() )[0];
    switch(Role){
      case 'guest' : return <GuestPage />;
      case 'admin' : return <GuestPage />;
      case 'user' : return <GuestPage />;
    }
  }
  render() {
  return <div> {this.Panel()} </div>
  }
};