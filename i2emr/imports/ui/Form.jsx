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
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formRef = null;

    this.stations = Object.keys(formLayouts);

    this.isMultipage = (formSchemas[this.props.station].__proto__.constructor.name !== "SimpleSchema");
    this.pageIndex = 0;
    this.oldID = null;
  }

  handleSubmit(newForm) {
    // Insert/update patientinfo database
    if (this.props.station == "Registration") {
      console.log(this.stations[this.stations.indexOf(this.props.station)+1]);

      Meteor.call('patientinfo.insert', newForm);
    } else {
      newForm.id = this.props.id;      

      if (!this.isMultipage || this.pageIndex >= Object.keys(formSchemas[this.props.station]).length - 1) {
        console.log(this.stations[this.stations.indexOf(this.props.station)+1]);
        newForm.nextStation = this.stations[this.stations.indexOf(this.props.station)+1];
      }
      Meteor.call('patientinfo.update', newForm);
    }

    // If multipage AND not done, go to next form
    if (this.isMultipage && this.pageIndex < Object.keys(formSchemas[this.props.station]).length - 1) {
      this.pageIndex++;
    } else {
      // Otherwise (patient is done with station)
      Session.set('currentPatient',null);
      this.pageIndex = 0;
    }
  }

  render() {
    // On ID change => Reset page index
    if (this.isMultipage && this.oldID != this.props.id) {
      this.oldID = this.props.id;
      this.pageIndex = 0;
    }

    // Index into appropriate form for multipage forms
    var currentFormSchema = formSchemas[this.props.station];
    var currentFormLayout = formLayouts[this.props.station];
    if (this.isMultipage) {
      currentFormSchema = currentFormSchema[Object.keys(currentFormSchema)[this.pageIndex]];
      currentFormLayout = currentFormLayout[Object.keys(currentFormLayout)[this.pageIndex]];
    }
    
    const newForm = () => (
      <ClearableAutoForm schema={currentFormSchema} onSubmit={this.handleSubmit} >
        {currentFormLayout}
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