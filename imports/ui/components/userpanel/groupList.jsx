import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import { Groups } from '../../../api/groups/Groups.js';


export default class GroupList extends TrackerReact(React.Component){
  getGroup(){
    const [sub1, sub2] = [ Meteor.subscribe('Groups'), Meteor.subscribe('AllUsers') ];
    if (sub1.ready() && sub2.ready()){
      const users = Groups.findOne({AdminGroup: Meteor.userId()});   
      return Meteor.users.find( { _id : { $in : users.users } } ).fetch();
    }
    return []
  }
  remove(){
    const id = this.refs.list.state.selectedRowKeys;
    id.length > 0 ? Meteor.call('Groups.removeUserFromGroup', id[0]) : alert('error');
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
 
 
 
 
 
 
 
