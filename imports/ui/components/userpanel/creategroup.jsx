import React, { Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import '../../../api/groups/groups.js';

export default class CreateGroupForm extends Component {
    handleSubmit(e) {
        e.preventDefault();
        let name = this.refs.GroupName.value.trim();
        name ? Meteor.call('CreateGroup', name) : alert ('ewe');
           
        
    }

  render() {
      return (
        <header>
          <h1>Create Group</h1>
          <br/>
            <form className="form-horizontal" role="form" onSubmit={this.handleSubmit.bind(this)}>
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
 
 
 
 
 
 
 
 
 
 
 
 
 
