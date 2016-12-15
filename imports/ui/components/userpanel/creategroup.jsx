import React, { Component} from 'react';

export default class CreateGroupForm extends Component {
    renderPhoto(){
        return (
            <div>
                Photo
            </div>
        )
    }
    PhotoOnChange() {
        console.log('onChange');
    }

  render() {
      return (
        <header>
          <h1>Create Group</h1>
          <br/>
          <form className="form-horizontal" role="form">
            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="text">Group Name:</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="GroupNameID" placeholder="Enter name"></input>
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="pwd">Group Image:</label>
                <div className="col-sm-10" id="ImagePlace">
                {this.renderPhoto()}
                <input onChange={this.PhotoOnChange} />
                </div>
            </div>
            <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-default">Create</button>
            </div>
                </div>
         </form>
        </header>
    )
  }
}
 
 
 
 
 
 
 
 
 
 
 
 
 
