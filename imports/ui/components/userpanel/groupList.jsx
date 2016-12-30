import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import '../../../api/groups/groups.js';

export default class GroupList extends TrackerReact(React.Component){
  getGroup(){
    let users = [];
    let data = [];
    const sub1 = Meteor.subscribe('Groups');
    const sub2 = Meteor.subscribe('AllUsers');
      if (sub1.ready() && sub2.ready()){
        users = Groups.findOne({AdminGroup: Meteor.userId()});   
        data = Meteor.users.find( { _id : { $in : users.users} } ).fetch();
      }
    return data
  }
  remove(){
    const id = this.refs.list.state.selectedRowKeys;
    id.length > 0 ? Meteor.call('group.removeUserFromGroup', id[0]) : alert('error');
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-10">
            <br/>
            <BootstrapTable data={this.getGroup()} selectRow={{mode: "radio"}} ref='list'>
              <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
              <TableHeaderColumn dataField="_id" isKey={true} hidden>id</TableHeaderColumn>
            </BootstrapTable>
            <div className="container">
              <button type="button" onClick={this.remove.bind(this)} className="btn btn-default">Remove User</button>
            </div>
            <br/>
          </div>
        </div>
      </div>
    )
  }
}
 
 
 
 
 
 
 
