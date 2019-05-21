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
    // this.pageIndex = 0;
    this.oldID = null;
    this.multiData = {};

    this.state = {pageIndex: 0};
  }

  handleSubmit(newForm) {
    // Insert/update patientinfo database
    if (this.props.station == "Registration") {
      // console.log(this.stations[this.stations.indexOf(this.props.station)+1]);

      Meteor.call('patientinfo.insert', newForm);

    } else if (this.isMultipage) {
      if (this.state.pageIndex < Object.keys(formSchemas[this.props.station]).length - 1) {
        // If not at last subpage
        // Concat and store multipage form data
        const subSchemaName = Object.keys(formSchemas[this.props.station])[this.state.pageIndex];
        this.multiData[subSchemaName] = newForm;

        // this.pageIndex++;
        this.setState((state, props) => ({
          pageIndex: state.pageIndex + 1
        }));

        console.log("Next subpage");
      } else {
        this.multiData.id = this.props.id;

        console.log(this.multiData);

        // On last subpage
        Meteor.call('patientinfo.update', this.multiData);
        // Empty data for multipage form
        this.multiData = {};
        // Reset page index
        // this.pageIndex = 0;
        this.setState({
          pageIndex: 0
        });

        Session.set('currentPatient',null);

        console.log("Finished multipage");
      }

    } else {
      newForm.id = this.props.id;      

      // if (!this.isMultipage || this.pageIndex >= Object.keys(formSchemas[this.props.station]).length - 1) {
      console.log(this.stations[this.stations.indexOf(this.props.station)+1]);
      newForm.nextStation = this.stations[this.stations.indexOf(this.props.station)+1];

      Meteor.call('patientinfo.update', newForm);

      Session.set('currentPatient',null);
    }
  }

  render() {
    // // On ID change => Reset page index
    // if (this.isMultipage && this.oldID != this.props.id) {
    //   this.oldID = this.props.id;
    //   // this.pageIndex = 0;
    //   this.setState({
    //     pageIndex: 0
    //   });
    //   console.log("New patient");
    // }

    // Index into appropriate form for multipage forms
    var currentFormSchema = formSchemas[this.props.station];
    var currentFormLayout = formLayouts[this.props.station];
    if (this.isMultipage) {
      currentFormSchema = currentFormSchema[Object.keys(currentFormSchema)[this.state.pageIndex]];
      currentFormLayout = currentFormLayout[Object.keys(currentFormLayout)[this.state.pageIndex]];
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