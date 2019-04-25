import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import AutoForm from 'uniforms-unstyled/AutoForm';
import { infoSchema } from '/imports/api/formSchemas';

class Form extends Component {
  constructor() {
    super();

    this.formData = {"Registration": ["Name", "ID"],
                    "Height & weight": ["Height", "Weight", "Waist"],
                    "CBG & Hb": ["CBG", "Hb"],
                    "Phlebotomy": ["Blood"],
                    "Blood pressure": ["BP"]};

    this.stations = ["Registration","Height & weight","CBG & Hb","Phlebotomy","Blood pressure","Done"];
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
      newForm[field.toLowerCase()] = ReactDOM.findDOMNode(this.refs[field]).value.trim();
      // And clear form
      ReactDOM.findDOMNode(this.refs[field]).value = '';
    }

    // Insert/update patientinfo database
    if (this.props.station == "Registration") {
      console.log(this.stations[this.stations.indexOf(this.props.station)+1]);
      Meteor.call('patientinfo.insert', newForm);
    } else {
      newForm.id = this.props.id;
      console.log(this.stations[this.stations.indexOf(this.props.station)+1]);
      newForm.nextStation = this.stations[this.stations.indexOf(this.props.station)+1];
      Meteor.call('patientinfo.update', newForm);
    }

    Session.set('currentPatient',null);
  }

  render() {
    return (
      <div>
        <Typography>
          {this.props.id}
        </Typography>
        
        {/* <form className="patient-form" onSubmit={this.handleSubmit.bind(this)} >
          { this.renderForm() }
          <input type="submit" value="Submit" />
        </form> */}
        <AutoForm
          schema={infoSchema}
          onSubmit={doc => db.save(doc)}
        />
      </div>
    );
  }
}

export default Form;