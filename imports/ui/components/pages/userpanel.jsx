import React, { Component} from 'react';
import { Link, browserHistory  } from 'react-router';

export default class UserPanel extends Component {
  leavegroup(event) {
    Meteor.call('group.leaveGroup')
    browserHistory.push('/panel/guest')
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
                  <div className="panel-footer">
                    <button type="button" onClick={this.leavegroup} className="btn btn-danger btn-block">Leave Group</button>
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
                    <Link to="/panel/user/menu" className="btn btn-primary btn-block" role="button">Menu</Link>
                  </div>
                  <div className="panel-footer">
                    <Link to="/panel/user/events" className="btn btn-success btn-block" role="button">Event</Link>
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