import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { Groups } from '../../../api/groups/Groups.js';

export default class Menu extends TrackerReact(React.Component) {
  menu() {
    const sub = Meteor.subscribe('Groups');
    if (sub.ready() ){
      if(Roles.userIsInRole(Meteor.userId(), 'admin')){
        return Groups.findOne({'AdminGroup': Meteor.userId()}).menu;  
      }else{
        return Groups.findOne({'users': Meteor.userId()}).menu;  
    }
    }
    return []
  }
  onAddRow(row) {
    row.price = parseFloat(row.price);
    row.allCount = 0;
    row.coupons = 0;
    Meteor.call('Groups.insertMenu', row);
  }
  onDeleteRow(row) {
    Meteor.call('Groups.menuRowDelete', row[0]);
  }
  onAfterSaveCell(row) {
    row.price = parseFloat(row.price);
    Meteor.call('Groups.menuRowChange', row);
  }
  render() {
    const conf = {
      selectRow: {
        mode: "radio"
      },
      insertRow: true,
      deleteRow: true,
      options: {
        onAddRow: this.onAddRow, 
        onDeleteRow: this.onDeleteRow
      },
      cellEdit: {
        mode: 'click',  
        blurToSave: true, 
        afterSaveCell: this.onAfterSaveCell
      }
    }
    return (
      <div>
        <br/>
        <BootstrapTable 
        data={ this.menu() } 
        selectRow={ conf.selectRow } 
        ref='table' 
        insertRow={ conf.insertRow } 
        deleteRow={ conf.deleteRow } 
        options={ conf.options } 
        cellEdit={ conf.cellEdit }>
          <TableHeaderColumn dataField='id' isKey={ true } autoValue hidden>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
          <TableHeaderColumn dataField='coupons' editable={ false }>Coupons</TableHeaderColumn>
          <TableHeaderColumn dataField='allCount' editable={ false }>In Orders</TableHeaderColumn>
        </BootstrapTable>
        <br/>
      </div>
    )
  }
}