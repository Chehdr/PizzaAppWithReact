import React, { Component} from 'react';
import { Link } from 'react-router';

export default class GuestPanel extends Component {
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
                    <Link to="/panel/guest/invites" className="btn btn-primary btn-block" role="button">Invites</Link>
                  </div>
                  <div className="panel-footer">
                    <Link to="/panel/guest/creategroup" className="btn btn-success btn-block" role="button">Create Group</Link>
                  </div>
                </div>
              </div>
              <div id='RenderForm' className="col-sm-8">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

