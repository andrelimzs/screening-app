import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import Patientinfo from '/imports/api/patientinfo';

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

    // Find the text field via the React ref
    // const newTask = ReactDOM.findDOMNode(this.refs.taskInput).value.trim();
    
    const newForm = {};

    for (var i=0, len = this.formData[this.props.station].length; i < len; i++ ){
      const field = this.formData[this.props.station][i];
      newForm[field] = ReactDOM.findDOMNode(this.refs[field]).value;
    }

    Patientinfo.insert(newForm);

    // // Clear form
    // ReactDOM.findDOMNode(this.refs.taskInput).value = '';
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
