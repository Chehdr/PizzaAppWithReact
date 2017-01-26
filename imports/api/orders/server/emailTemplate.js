import React from 'react';
import { renderEmail } from 'react-html-email';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default function emailTemplate(order) {
  return renderEmail(
    <div>
      <BootstrapTable data={ order }>
        <TableHeaderColumn dataField="name" isKey={true}>Name</TableHeaderColumn>
        <TableHeaderColumn dataField="coupons">Coupons</TableHeaderColumn>
        <TableHeaderColumn dataField="price">Price</TableHeaderColumn>
        <TableHeaderColumn dataField="count">Count</TableHeaderColumn>
        <TableHeaderColumn dataField="summ">Summ</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
}