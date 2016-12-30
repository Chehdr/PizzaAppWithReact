import React, { Component} from 'react';
import { browserHistory } from 'react-router';

import '../../../api/groups/groups.js';

export default class CreateGroup extends Component {
  submit(event) {
    e.preventDefault();
    const name = this.refs.GroupName.value.trim();
    if (name){
      Meteor.call('group.createGroup', name);
      browserHistory.push('/panel/admin');
    }else{
      alert ('error');
    }         
  }
  render() {
    return (
      <header>
        <h1>Create Group</h1>
        <br/>
        <form className="form-horizontal" role="form" onSubmit={this.submit.bind(this)}>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="text">Group Name:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" ref="GroupName" placeholder="Enter name"></input>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default">Create</button>
            </div>
          </div>
        </form>
      </header>
    )
  }
}
 
 
 
 
 
 
 
 
 
 
 
 
 
