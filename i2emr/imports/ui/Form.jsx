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
import SubmitField from 'uniforms-material/SubmitField';
import ErrorsField from 'uniforms-material/ErrorsField';

class ClearableAutoForm extends AutoForm {
  onSubmit () {
      // If you don't care about this Promise
      return super.onSubmit(...arguments).then(() => this.reset());

      // If you do care about this Promise
      return super.onSubmit(...arguments).then(result => {
          this.reset();
          return result;
      });
  }
}

class Form extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formRef = null;

    this.stations = ["Registration",
                      "Height & weight",
                      "CBG & Hb","Phlebotomy",
                      "Pap Smear","Breast Exam",
                      "Blood Pressure",
                      "Doctors' Consult", 
                      "Eye Screening",
                      "Pre-Women's Education Quiz",
                      "Post-Women's Education Quiz",
                      "Pre-Education Survey",
                      "Pre-Education Quiz",
                      "Post-Education Survey",
                      "Post-Education Quiz",
                      "Done"];

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
    // console.log(this.formRef);
    // this.formRef.reset();
  }

  render() {
    const newForm = () => (
      <ClearableAutoForm schema={formSchemas[this.props.station]} onSubmit={this.handleSubmit} >
        {formLayouts[this.props.station]}
        <ErrorsField />
        <div>
          <SubmitField inputRef={(ref) => this.formRef = ref} />
        </div>
      </ClearableAutoForm>
    );
    
    return (
      <Paper elevation={2} p={0} m={0}>
        {newForm()}
      </Paper>
    );
  }
}

export default Form;