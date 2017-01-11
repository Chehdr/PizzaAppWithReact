import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { Groups } from '../../../api/groups/Groups.js';

export default class Coupons extends TrackerReact(React.Component) {
  coupons() {
    const sub = Meteor.subscribe('Groups');
    if (sub.ready() ){
      return Groups.findOne({'AdminGroup': Meteor.userId()}).menu;  
    }
    return []
  }
  onAfterSaveCell(row) {
    row.coupons = parseInt(row.coupons);
    Meteor.call('Groups.addCoupon', row);
  }
  render() {
    const conf = {
      selectRow: {
        mode: "none"
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
        data={ this.coupons() } 
        selectRow={ conf.selectRow } 
        ref='table' 
        cellEdit={ conf.cellEdit }>
          <TableHeaderColumn dataField='id' isKey={ true } autoValue hidden>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name' editable={ false }>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField='coupons' editable={ true }>Coupons</TableHeaderColumn>
        </BootstrapTable>
        <br/>
      </div>
    )
  }
}