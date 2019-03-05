import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Stationforms from '/imports/api/stationforms';

export default class Form extends Component {
  renderForm() {
    const formData = {"Registration": ["Name", "ID"],
                      "Height & weight": ["Height", "Weight", "Waist"],
                      "CBG & Hb": ["CBG", "Hb"],
                      "Phlebotomy": ["Blood"],
                      "Blood pressure": ["BP"]};
    
    return (
      <React.Fragment>
        {formData[this.props.station].map(field => (
          <React.Fragment>
            {field}:<br />
            <input type="text" ref={field} /><br /><br />
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }

  handleSubmit(event) {
    // event.preventDefault();

    // // Find the text field via the React ref
    // const newTask = ReactDOM.findDOMNode(this.refs.taskInput).value.trim();

    // Tasks.insert({
    //   text: newTask,
    //   createdAt: new Date(), // current time
    // });

    // // Clear form
    // ReactDOM.findDOMNode(this.refs.taskInput).value = '';
  }

  render() {
    return (
      <div>
        <form className="patient-form" onSubmit={this.handleSubmit.bind(this)} >
          { this.renderForm() }  
        </form>
      </div>
    );
  }
}
