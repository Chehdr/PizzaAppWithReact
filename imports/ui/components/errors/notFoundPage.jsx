import React from 'react';
import { Link } from 'react-router';

export default function notFoundPage(props) {
  return (
    <div>
      <div className="panel-body">
      <div className="col-sm-8">Error 404 - Page not found!</div>
        <div className="col-sm-2">
          <Link to="/loginReg" className="btn btn-primary btn-block" role="button">Login/Registration</Link>
        </div>
      </div>
    </div>
  );
};