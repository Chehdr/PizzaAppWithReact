import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { browserHistory } from 'react-router';

import { Groups } from '../../../api/groups/Groups.js';

export default class Invites extends TrackerReact(React.Component) {
  invites() {
    const sub = Meteor.subscribe('Groups');
    if (sub.ready() ){
      return Groups.find({invite:{'userId': Meteor.userId()}}).fetch();  
    }
    return []
  }
  accept (){
    const id = this.refs.table.state.selectedRowKeys;
    if(id.length > 0){
      Meteor.call('Groups.acceptInviteToGroup', id[0], function(error, result) {
        if(error){
          alert('Error');
        }else{
          browserHistory.push('/panel/user');
        }
      });
    }else{
      alert('error');
    }
  }
  decline (){
    const id = this.refs.table.state.selectedRowKeys;
    id.length > 0 ? Meteor.call('Groups.declineInviteToGroup', id[0]) : alert('error');
  }
  render() {
    return (
      <div>
        <br/>
        <BootstrapTable data={this.invites()} selectRow={{mode: "radio"}}  ref='table'>
          <TableHeaderColumn dataField="AdminGroupName">Email</TableHeaderColumn>
          <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
          <TableHeaderColumn dataField="_id" isKey={true} hidden>id</TableHeaderColumn>
        </BootstrapTable>
        <div className="container">
          <button type="button" onClick={this.accept.bind(this)} className="btn btn-default">Accept Invite</button>
          <button type="button" onClick={this.decline.bind(this)} className="btn btn-default">Decline Invite</button>
        </div>
        <br/>
      </div>
    )
  }
}
 
 
 
 
 
 
 
 
 
 
 
 
 
