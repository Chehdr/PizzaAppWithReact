import React, { Component} from 'react';
import SendInvite from '../userpanel/sendInvite.jsx';
import GroupList from '../userpanel/groupList.jsx';
import '../../../api/groups/groups.js';

import { render } from 'react-dom';

export default class AdminPage extends Component {

 sendinviteform(e) {
    e.preventDefault();
    render(<SendInvite/>, document.getElementById('RenderForm'));
  }
  grouplist(e) {
    e.preventDefault();
    render(<GroupList/>, document.getElementById('RenderForm'));
  }

  deletegroup(e) {
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
                <a href="SendInviteToGroup" onClick={this.sendinviteform} className="btn btn-primary btn-block" role="button">Send Invite</a>
              </div>
              <div className="panel-body">
                <a href="GroupList"  onClick={this.grouplist}  className="btn btn-primary btn-block" role="button">Group List</a>
              </div>
              <div className="panel-footer">
                <button type="button" onClick={this.deletegroup}  className="btn btn-danger btn-block">Delete Group</button>
            </div>
          </div>
        </div>
        <div id='RenderForm' className="col-sm-8">

        </div>
      </div>
    </div>
    );
  }
}

