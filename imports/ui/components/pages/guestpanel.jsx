import React, { Component} from 'react';
import { Router, Route, browserHistory } from 'react-router';

export default class guestPanel extends Component {

  createForm(e) {
    e.preventDefault();
    browserHistory.push('/panel/guest/creategroup'); //не впевнений чи так можна створювати структуру проекту
  }

  inviteForm(e) {
    e.preventDefault();
    browserHistory.push('/panel/guest/invites');
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
          <div className="col-sm-2"></div>
          <div className="col-sm-2">
          <a href="GroupList"  onClick={ this.Profile }  className="btn btn-primary btn-block" role="button">Profile</a>
        </div></div>
        <div className="panel-footer">
          <div className="container">
            <div className="row">
              <div className="col-sm-2">
                <div className="panel panel-default">
                  <div className="panel-heading">Action with groups</div>          
                  <div className="panel-body">
                    <a onClick={this.inviteForm} href="InvatesToGroup" className="btn btn-primary btn-block" role="button">Invites</a>
                  </div>
                  <div className="panel-footer">
                    <a onClick={this.createForm} className="btn btn-success btn-block" role="button">Create Group</a>
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

