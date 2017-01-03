import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { browserHistory } from 'react-router';

import '../../../api/groups/groups.js';
import '../../../api/events/events.js';

export default class Events extends TrackerReact(React.Component) {
  join() {
    const id = this.refs.table.state.selectedRowKeys;
    if(id.length > 0){
      Meteor.call('event.joinToEvent', id[0]);
    }else{
      alert('error');
    }
  }
  order (){
    const id = this.refs.table.state.selectedRowKeys;
    if(id.length > 0){
      browserHistory.push('order/'+id);
    }else{
      alert('error');
    }
  }
  nextStatus (event){
    const id = this.refs.table.state.selectedRowKeys;
    if(id.length > 0){
      let status = UserEvents.findOne({'_id': id[0]}).status;
      switch(status){
        case 'ordering' :  status = 'ordered';	Meteor.call('order.sendOrder', id[0]);  break 
        case 'ordered' : status = 'delivering'; break
        case 'delivering' : status = 'delivered'; break
        case 'delivered' : status = 'ordering'; break
      }
      Meteor.call('event.changeStatus', id[0], status);
    }else{
      alert('error');
    }
  }
  events() {
    const sub1 = Meteor.subscribe('Groups');
    const sub2 = Meteor.subscribe('UserEvents');  
    if (sub1.ready() && sub2.ready()){
     	if(Roles.userIsInRole(Meteor.userId(), 'admin')){
        this.state = {
          group: Groups.findOne({'AdminGroup': Meteor.userId()})
        }
      }else{
        this.state = {
          group: Groups.findOne( { 'users': { $in: [Meteor.userId() ] } } ),
        }
      }
      this.state = {
        event: UserEvents.find({'groupId': this.state.group._id}).fetch(),
      }
      return this.state.event
    }
    return []
  }
  userIsAdmin(){
    const buttons = {};
    if (this.state && this.state.event[0]){
      if(this.state.event[0].createUser === Meteor.userId()){
        buttons.user = (
          <div>
            <button type="button" className="btn btn-default" onClick={this.order.bind(this)}>Order in Event</button>
            <button type="button" className="btn btn-default" onClick={this.resetEvent.bind(this)}>Reset</button>
            <button type="button" className="btn btn-default" onClick={this.nextStatus.bind(this)}>Next Status</button>
          </div>
        )
      }else if (this.state.event[0].accepts.indexOf(Meteor.userId()) >= 0){
        buttons.user = ( 
          <div>
            <button type="button" className="btn btn-default" onClick={this.order.bind(this)}>Order in Event</button>
          </div>
        )
      }else{
        buttons.user = (
          <div>
            <button type="button" className="btn btn-default" onClick={this.join.bind(this)}>Join to Event</button>
          </div>
        )
      }
      return buttons.user
    }
    return 'Please create event'
  }
  addEvent(add){
    add.idGroup = Groups.findOne({'AdminGroup': Meteor.userId()})._id;
    Meteor.call('event.createEvent', add);
  }
  deleteEvent(row){
    Meteor.call('event.removeEvent', row[0]);
  }
  resetEvent(event){
    const id = this.refs.table.state.selectedRowKeys;
    if(id.length > 0){
      Meteor.call('event.resetEvent', id[0]);
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
          { this.userIsAdmin(this) }
        </div>   
        <br/>
      </div>
    )
  }
}