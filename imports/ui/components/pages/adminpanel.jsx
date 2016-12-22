import React, { Component} from 'react';
import { Router, Route, browserHistory } from 'react-router';
import '../../../api/groups/groups.js';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
export default class adminPanel extends TrackerReact(React.Component) {

 sendInviteForm(e) {
    e.preventDefault();
    browserHistory.push('/panel/admin/sendinvite');
  }
  groupList(e) {
    e.preventDefault();
    browserHistory.push('/panel/admin/grouplist');
  }
  Profile(e) {
    e.preventDefault();
    browserHistory.push('/loginReg');
  }
  menu(e) {
    e.preventDefault();
    browserHistory.push('/panel/admin/menu');
  }
  deleteGroup(e) {
      Meteor.call('DeleteGroup');
      browserHistory.push('/panel/guest');
    }

  render() {
    return (
    <div>
      <div className="panel-body">
        <div className="col-sm-8"></div>
        <div className="col-sm-2">
          <a href="GroupList"  onClick={ this.Profile }  className="btn btn-primary btn-block" role="button">Profile</a>
        </div>
      </div>
      <div className="panel-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-2">
              <div className="panel panel-default">
                <div className="panel-heading">Action with groups</div>          
                  <div className="panel-body">
                    <a href="SendInviteToGroup" onClick={this.sendInviteForm} className="btn btn-primary btn-block" role="button">Send Invite</a>
                  </div>
                  <div className="panel-body">
                    <a href="GroupList"  onClick={this.groupList}  className="btn btn-primary btn-block" role="button">Group List</a>
                  </div>
                  <div className="panel-footer">
                    <button type="button" onClick={this.deleteGroup}  className="btn btn-danger btn-block">Delete Group</button>
                </div>
              </div>
            </div>
            <div id='RenderForm' className="col-sm-8">
              {this.props.children}
            </div>
            <div className="col-sm-2">
              <div className="panel panel-default">
                <div className="panel-heading">Action with menu</div>
                  <div className="panel-body">
                    <a href="Menu" onClick={this.menu} className="btn btn-primary btn-block" role="button">Menu</a>
                  </div>
                  <div className="panel-body">
                    <a href="Coupons" className="btn btn-primary btn-block" role="button">Coupons</a>
                  </div>
                  <div className="panel-footer">
                    <a href="Event" className="btn btn-success btn-block" role="button">Event</a>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

