import React, { Component} from 'react';
import { Router, Route, browserHistory } from 'react-router';
import '../../../api/groups/groups.js';

export default class adminPanel extends Component {

 sendInviteForm(e) {
    e.preventDefault();
    browserHistory.push('/admin/sendinvite');
  }
  groupList(e) {
    e.preventDefault();
    browserHistory.push('/admin/grouplist');
  }

  deleteGroup(e) {
      Meteor.call('DeleteGroup')
    }

  render() {
    return (
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
      </div>
    </div>
    );
  }
}

