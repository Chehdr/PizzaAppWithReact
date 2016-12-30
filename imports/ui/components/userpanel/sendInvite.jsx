import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import '../../../api/groups/groups.js';

export default class SendInvite extends TrackerReact(React.Component){
  getSelectedRowKeys() {
    const id = this.refs.table.state.selectedRowKeys;
    id.length > 0 ? Meteor.call('group.sendInvite', id[0]) : alert('error');  
  }
  getUsers(){
    Meteor.subscribe('Groups');
    Meteor.subscribe('AllUsers');
    const users = Groups.findOne({AdminGroup: Meteor.userId()}, {fields:{'invite':1}});
    let sended = [];
    if(users){
      sended = _.pluck(users.invite, 'userId');
    }else{
      sended = [Meteor.userId()];
    }
    return Meteor.users.find( { $and: [ { _id : { $nin : sended }}, { roles : 'guest'}] } ).fetch();  
  }
  render() {
    return (
      <div>
        <h2>Send invites</h2>
        <p>Send invites to group </p>
        <BootstrapTable data={this.getUsers()} selectRow={{mode: "radio"}}  ref='table'>
          <TableHeaderColumn dataField="name">Email</TableHeaderColumn>
          <TableHeaderColumn dataField="_id" isKey={true} hidden>id</TableHeaderColumn>
        </BootstrapTable>
        <div className="container">
          <button type="button" onClick={this.getSelectedRowKeys.bind(this)} className="btn btn-default">Send Invite</button>
        </div>
        <br/>
      </div>
    )
  }
}
 
 
 
 
 
 
 
