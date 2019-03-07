import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Button from '@material-ui/core/Button';

export default class Form extends Component {
  constructor() {
    super();

    this.formData = {"Registration": ["Name", "ID"],
                    "Height & weight": ["Height", "Weight", "Waist"],
                    "CBG & Hb": ["CBG", "Hb"],
                    "Phlebotomy": ["Blood"],
                    "Blood pressure": ["BP"]};
  }

  renderForm() {
    return (
      <React.Fragment>
        {this.formData[this.props.station].map(field => (
          <React.Fragment>
            <label for={field}>{field}:</label>
            <input type="text" ref={field} /><br />
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const newForm = {};

    // Loop through form fields
    for (var i=0, len = this.formData[this.props.station].length; i < len; i++ ){
      const field = this.formData[this.props.station][i];
      // Extract data
      newForm[field] = ReactDOM.findDOMNode(this.refs[field]).value.trim();
      // And clear form
      ReactDOM.findDOMNode(this.refs[field]).value = '';
    }

    // Insert/update patientinfo database
    if (this.props.station == "Registration") {
      Meteor.call('patientinfo.insert', newForm);
    } else {
      Meteor.call('patientinfo.upsert', newForm);
    }
  }

  render() {
    return (
      <div>
        <form className="patient-form" onSubmit={this.handleSubmit.bind(this)} >
          { this.renderForm() }
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
