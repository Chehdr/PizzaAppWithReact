import React, { Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Router, Route, browserHistory } from 'react-router';
import '../../../api/groups/groups.js';

export default class invites extends TrackerReact(React.Component) {

    invites() {
        let data = [];
        const sub = Meteor.subscribe('Groups');
        if (sub.ready() ){
            data = Groups.find({invite:{'userId': Meteor.userId()}}).fetch();  
        }
        return data
    }
    accept (){
        const id = this.refs.table.state.selectedRowKeys;
        if(id.length > 0){
            Meteor.call('AcceptInviteToGroup', id[0]);
            browserHistory.push('/panel/user');
        }else{
            alert('error');
        }
    }
   decline (){
        const id = this.refs.table.state.selectedRowKeys;
        id.length > 0 ? Meteor.call('DeclineInviteToGroup', id[0]) : alert('error');
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
 
 
 
 
 
 
 
 
 
 
 
 
 
