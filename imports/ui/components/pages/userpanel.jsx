import React, { Component} from 'react';
import { render } from 'react-dom';
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import { Router, Route, browserHistory } from 'react-router';

export default class userPanel extends Component {

  leavegroup(e) {
    Meteor.call('LeaveGroup')
    browserHistory.push('/panel/guest')
  }
  
  Profile(e) {
    e.preventDefault();
    browserHistory.push('/loginReg');
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
                        <div className="panel-footer">
                            <button type="button" onClick={this.leavegroup} className="btn btn-danger btn-block">Leave Group</button>
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