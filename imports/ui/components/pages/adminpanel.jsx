import React, { Component} from 'react';
import { Link, browserHistory  } from 'react-router';

import { Groups } from '../../../api/groups/Groups.js';

export default class AdminPanel extends Component {
  deleteGroup(event) {
    Meteor.call('Groups.deleteGroup', function(error, result) {
      if(error){
        alert('Error');
      }else{
        browserHistory.push('/panel/guest');
      }
    });
  }
  render() {
    return (
      <div>
        <div className="panel-body">
          <div className="col-sm-8"></div>
          <div className="col-sm-2">
            <Link to="/loginReg" className="btn btn-primary btn-block" role="button">Profile</Link>
          </div>
        </div>
        <div className="panel-footer">
          <div className="container">
            <div className="row">
              <div className="col-sm-2">
                <div className="panel panel-default">
                  <div className="panel-heading">Action with groups</div>          
                    <div className="panel-body">
                      <Link to="/panel/admin/sendinvite" className="btn btn-primary btn-block" role="button">Send Invite</Link>
                    </div>
                    <div className="panel-body">
                      <Link to="/panel/admin/grouplist" className="btn btn-primary btn-block" role="button">Group List</Link>
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
                      <Link to="/panel/admin/menu" className="btn btn-primary btn-block" role="button">Menu</Link>
                    </div>
                    <div className="panel-body">
                      <Link to="/panel/admin/coupons" className="btn btn-primary btn-block" role="button">Coupons</Link>
                    </div>
                    <div className="panel-footer">
                      <Link to="/panel/admin/events" className="btn btn-success btn-block" role="button">Event</Link>
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

