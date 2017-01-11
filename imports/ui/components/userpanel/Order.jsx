import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from 'react-router';

import { Groups } from '../../../api/groups/Groups.js';
import { Orders } from '../../../api/orders/Orders.js';

export default class Order extends TrackerReact(React.Component) { 
  send(row, isSelected){
    const id = this.eventId;
    if('count' in row && isSelected){
      row.count = parseInt(row.count);
      Meteor.call('Order.insertOrder', row, id)
    }else if (!isSelected){
      Meteor.call('Order.deleteRow', row.id, id)
    }else{
      alert('Enter count');
      return false
    }
  }
  order() {
    const [sub1, sub2] = [ Meteor.subscribe('Groups'), Meteor.subscribe('Orders') ];
    if (sub1.ready() && sub2.ready()){
      const order = Orders.findOne({idUser : Meteor.userId(), idEvent : this.props.routeParams.id});
      if(order && order.confirm){
        return order.order
      }else {
        if(Roles.userIsInRole(Meteor.userId(), 'admin')){
          return Groups.findOne({'AdminGroup': Meteor.userId()}).menu;
        }else{
          return Groups.findOne( { 'users': Meteor.userId() } ).menu;
        }
      }
    }
    return []
  }
  confirm(){
    if(this.refs.table.state.selectedRowKeys.length > 0){
      Meteor.call('Order.confirm', this.props.params.id)
    }else{
      alert('Select Items!');
    }
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
          <TableHeaderColumn dataField='price' editable={ false }>Price, $</TableHeaderColumn>
          <TableHeaderColumn dataField='count' editable={ true }>Count</TableHeaderColumn>
        </BootstrapTable>
        <div className="container">
          <Link to="/" className="btn btn-default" role="button">Back</Link>
          <button type="button" className="btn btn-default" onClick={this.confirm.bind(this)}>Confirm</button>
        </div>
        <br/>
      </div>
    )
  }
}