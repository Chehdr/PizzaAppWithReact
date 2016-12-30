import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import '../../../api/groups/groups.js';

export default class Menu extends TrackerReact(React.Component) {
  menu() {
    let data = [];
    const sub = Meteor.subscribe('Groups');
    if (sub.ready() ){
      data = Groups.findOne({'AdminGroup': Meteor.userId()}).menu;  
    }
    return data
  }
  onAddRow(row) {
    Meteor.call('group.groupMenu', row);
  }
  onDeleteRow(row) {
    Meteor.call('group.menuRowDelete', row[0]);
  }
  onAfterSaveCell(row) {
    Meteor.call('group.menuRowChange', row);
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
        </BootstrapTable>
        <br/>
      </div>
    )
  }
}