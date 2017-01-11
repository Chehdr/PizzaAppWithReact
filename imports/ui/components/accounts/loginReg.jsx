import styles from './style.css';
import React from 'react';
import { Accounts } from 'meteor/std:accounts-ui';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Link } from 'react-router';

export default class LoginReg extends TrackerReact(React.Component) {
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
                <div className="row">
                  <div className="col-sm-3"></div>
                    <div className="col-sm-6">
                      { Meteor.userId()? 
                        <div><Link to="/" className="btn btn-primary btn-block" role="button">Panel</Link></div>: 
                        <div>Please login or register</div> }
                    </div>
                    <div className="col-sm-3"></div>
                  </div>
                  <br/>
                <Accounts.ui.LoginForm/> {/* Так ця форма відображається завжди, оскільки зареєстрований користувач бачить деталі профілю і кнопку виходу,
                    а не зареєстрований - форму реєстрації. Якщо я правильно зрозумів запитання... */}
              </div>
            </div>
          </div>
        </div>
        <br/>
      </div>
    );
  }
}