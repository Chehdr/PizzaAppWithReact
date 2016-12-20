import styles from './style.css';
import React, { Component} from 'react';
import { Accounts, STATES } from 'meteor/std:accounts-ui';

export default class loginReg extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <center>
		        <h2>Login / Registration</h2>
	         </center>
        </div>
        <br/>
        <div className="container">
          <div className="row">
            <div className="EditForm col-md-4 col-md-offset-4">
              <div className="form-body">
                <Accounts.ui.LoginForm/>
              </div>
            </div>
          </div>
        </div>
    </div>
      
    );
  }
}