import React, { Component} from 'react';
import CreateGroup from '../userpanel/creategroup.jsx';
import { render } from 'react-dom';
export default class NotFoundPage extends Component {

  createform(event) {
    event.preventDefault();
    render(<CreateGroup/>, document.getElementById('RenderForm'));

  }

  render() {
    return (
    <div className="container">
      <div className="row">
        <div className="col-sm-2">
          <div className="panel panel-default">
            <div className="panel-heading">Action with groups</div>          
            <div className="panel-body">
              <a href="InvatesToGroup" className="btn btn-primary btn-block" role="button">Invites</a>
            </div>
            <div className="panel-footer">
              <a onClick={this.createform} className="btn btn-success btn-block" role="button">Create Group</a>
            </div>
          </div>
        </div>
        <div id='RenderForm' className="col-sm-8">

        </div>
      </div>
    </div>
    );
  }
}

