import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from 'react-router';

import '../../../api/groups/groups.js';
import '../../../api/orders/orders.js';

export default class Order extends TrackerReact(React.Component) { 
  send(row, isSelected){
    const id = this.eventId;
    if (isSelected){
      Meteor.call('order.insertOrder', row, id)
    }else{
      Meteor.call('order.deleteRow', row.id, id)
    }
  }
  order() {
    let data = [];
    const sub1 = Meteor.subscribe('Groups');
    const sub2 = Meteor.subscribe('Orders');
    if (sub1.ready() && sub2.ready()){
      const order = Orders.findOne({idUser : Meteor.userId(), idEvent : this.props.routeParams.id});
      if(order){
        data = order.order
      }else {
        if(Roles.userIsInRole(Meteor.userId(), 'admin')){
          return Groups.findOne({'AdminGroup': Meteor.userId()}).menu;
        }else{
          return Groups.findOne( { 'users': { $in: [Meteor.userId() ] } } ).menu;
        }
      }
    }
    return data
  }
  render() {
    const conf = {
      selectRow: {
        mode: "checkbox",
        onSelect: this.send,
        eventId: this.props.routeParams.id
      },
      cellEdit: {
        mode: 'click',  
        blurToSave: true
      }
    }
    return (
      <div>
        <br/>
        <BootstrapTable 
        data={ this.order() } 
        selectRow={ conf.selectRow } 
        ref='table' 
        cellEdit={ conf.cellEdit }>
          <TableHeaderColumn dataField='id' isKey={ true } autoValue hidden>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name' editable={ false }>Name Item</TableHeaderColumn>
          <TableHeaderColumn dataField='coupons' editable={ false }>Price, $</TableHeaderColumn>
          <TableHeaderColumn dataField='count' editable={ true }>Count</TableHeaderColumn>
        </BootstrapTable>
        <div className="container">
          <Link to="/" className="btn btn-default" role="button">Back</Link>
        </div>
        <br/>
      </div>
    )
  }
}