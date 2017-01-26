import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { browserHistory } from 'react-router';

import { Groups } from '../../../api/groups/Groups.js';
import { UserEvents } from '../../../api/events/UserEvents.js';
import { Orders } from '../../../api/orders/Orders';

export default class Events extends TrackerReact(React.Component) {
  join() {
    const id = this.refs.table.state.selectedRowKeys;
    if(id.length > 0){
      Meteor.call('Event.joinToEvent', id[0]);
    }else{
      alert('error');
    }
  }
  order (){
    const id = this.refs.table.state.selectedRowKeys;
    if(id.length > 0){
      if(Roles.userIsInRole(Meteor.userId(), 'admin')){
        browserHistory.push('/panel/admin/order/' + id);
      }else{
        browserHistory.push('/panel/user/order/' + id);
      }
    }else{
      alert('error');
    }
  }
  nextStatus (event){
    const id = this.refs.table.state.selectedRowKeys;
    if(id.length > 0){
      Meteor.call('Event.checkStatus', id[0]);
    }else{
      alert('error');
    }
  }
  events() {
    const [sub1, sub2] = [ Meteor.subscribe('Groups'), Meteor.subscribe('UserEvents') ];
    if (sub1.ready() && sub2.ready()){
     	if(Roles.userIsInRole(Meteor.userId(), 'admin')){
        this.state = {
          group: Groups.findOne({'AdminGroup': Meteor.userId()}),
          user: 'admin'
        }
      }else{
        this.state = {
          group: Groups.findOne( { 'users': Meteor.userId() } ),
          user: 'user'
        }
      }
      this.state = {
        event: UserEvents.find({'groupId': this.state.group._id}).fetch(),
      }
      return this.state.event
    }
    return []
  }
  usersButtons(){
    if (this.state && this.state.event[0]){
      if(this.state.event[0].createUser === Meteor.userId()){
        return (
          <div>
            <button type="button" className="btn btn-default" onClick={this.order.bind(this)}>Order in Event</button>
            <button type="button" className="btn btn-default" onClick={this.resetEvent.bind(this)}>Reset</button>
            <button type="button" className="btn btn-default" onClick={this.nextStatus.bind(this)}>Next Status</button>
          </div>
        )
      }else if (this.state.event[0].accepts.indexOf(Meteor.userId()) >= 0){
        return ( 
          <div>
            <button type="button" className="btn btn-default" onClick={this.order.bind(this)}>Order in Event</button>
          </div>
        )
      }else{
        return (
          <div>
            <button type="button" className="btn btn-default" onClick={this.join.bind(this)}>Join to Event</button>
          </div>
        )
      }
    }
    return 'Please create event'
  }
  addEvent(add){
    add.idGroup = Groups.findOne({'AdminGroup': Meteor.userId()})._id;
    Meteor.call('Event.createEvent', add);
  }
  deleteEvent(row){
    Meteor.call('Event.removeEvent', row[0]);
  }
  resetEvent(event){
    const id = this.refs.table.state.selectedRowKeys;
    if(id.length > 0){
      Meteor.call('Event.resetEvent', id[0]);
    }else{
      alert('error');
    }
  }
  render() {
    const conf = {
      selectRow: {
        mode: "radio"
      },
      insertRow: true,
      deleteRow: true,
      options: {
        onAddRow: this.addEvent, 
        onDeleteRow: this.deleteEvent
      }
    }
    return (
      <div>
        <br/>
        <BootstrapTable 
        data={ this.events() } 
        selectRow={ conf.selectRow } 
        ref='table' 
        insertRow={ conf.insertRow } 
        deleteRow={ conf.deleteRow } 
        options={ conf.options }>
          <TableHeaderColumn dataField='_id' isKey={ true } autoValue hidden>Event ID</TableHeaderColumn>
          <TableHeaderColumn dataField='eventName'>Event Name</TableHeaderColumn>
          <TableHeaderColumn dataField='status' hiddenOnInsert editable={ false }>Status</TableHeaderColumn>
        </BootstrapTable>
        <div className="container">
          { this.usersButtons(this) }
        </div>   
        <br/>
      </div>
    )
  }
}