import React, { Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Router, Route, browserHistory } from 'react-router';
import '../../../api/groups/groups.js';

export default class coupons extends TrackerReact(React.Component) {

    menu() {
        let data = [];
        const sub = Meteor.subscribe('Groups');
        if (sub.ready() ){
            data = Groups.findOne({'AdminGroup': Meteor.userId()}).menu;  
        }
        return data
    }
    onAfterSaveCell(row) {
        Meteor.call('addCoupon', row);
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
            data={ this.menu() } 
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