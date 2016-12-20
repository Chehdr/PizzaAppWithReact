import React, { Component} from 'react';
import { browserHistory } from 'react-router'

export default function main(props){

    return (  
      <div>
        <div className="navbar navbar-default" role="navigation">
          <div className="navbar-header">
          <a className="navbar-brand" href="#">Pizza Day</a>
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li className="active"><a href="/">Link</a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
          </ul>
        </div>
        </div>
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-body"><Accounts.ui.LoginForm/></div>
              <div className="panel-footer">{props.children}</div>
            </div>
          </div>
          <footer className="navbar-default navbar-fixed-bottom">
          <div className="container-fluid">
            <span>Created by Farice</span>
          </div>
        </footer>
      </div>
    );
  }
