import React, { Component} from 'react';
import { render } from 'react-dom';

export default class userPanel extends Component {

  leavegroup(e) {
    Meteor.call('LeaveGroup')

  }
  render() {
    return (
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
        </div>
      </div>
    </div>
    );
  }
}