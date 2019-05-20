import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

import AutoForm from 'uniforms-material/AutoForm';
import { formSchemas } from '/imports/api/formSchemas';
import { formLayouts } from '/imports/api/formLayouts';

class Form extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formRef = null;

    this.stations = ["Registration","Height & weight","CBG & Hb","Phlebotomy","Pap Smear","Blood pressure","Done"];

  }

  handleSubmit(newForm) {
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

    this.formRef.reset();
  }

  render() {
    return (
      <Paper elevation={1} p={0} m={0}>
        {formLayouts[this.props.station]}
      </Paper>
    );
  }
}

export default Form;