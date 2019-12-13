import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class Info extends Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      anchorEl: null,
      textFieldLabel: "",
      textFieldValue: "",
      formParent: "",
    };
  }

  handleChange = (event, value) => {
    if (value == 1 && prompt("Password") === "iloveodisha" ) {
      this.setState({ value });
    } else {
      this.setState({ value: 0 });
    }
  };

  editField(field, parent, event) {
    this.setState({
      anchorEl: event.currentTarget,
      textFieldLabel: field[0],
      textFieldValue: field[1],
      formParent: parent,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  makeInfoEntry(field, parent=null) {
    return (
      <Fragment>
        <Button variant="text" fullWidth={true} onClick={this.editField.bind(this,field,parent)}>
          {field[0] + ": " + field[1]}
        </Button>
      </Fragment>
    );
  }

  handleEditChange = event => {
    // console.log(event.target.value);
    this.setState({
      textFieldValue: event.target.value,
    });
  };
  //   this.setState({textFieldValue: event.target.value});
  // }

  submitEdit(event) {
    const value = this.state.textFieldValue;
    alert('An edit was submitted: ' + this.state.textFieldValue);
    Meteor.call('patientinfo.editPatientInfo', this.props.id, this.state.formParent, this.state.textFieldLabel, value);
  }

  generalInfo() {
    return (
      <Fragment>
        <Typography>
          Name: {typeof(this.props.patientInfo["Patient Info"]) !== "undefined"
                  && this.props.patientInfo["Patient Info"].name}
        </Typography>
        <Divider />
        <Typography>
          Age: {typeof(this.props.patientInfo["Patient Info"]) !== "undefined"
                && this.props.patientInfo["Patient Info"].age}
        </Typography>
        <Divider />
        <Typography>
          Spoken Languages: {typeof(this.props.patientInfo["Patient Info"]) !== "undefined"
                            && typeof this.props.patientInfo["Patient Info"].spokenLanguages !== 'undefined' && 
            this.props.patientInfo["Patient Info"].spokenLanguages.join(", ")}
        </Typography>
        <Divider />
        <Typography>
          Drug Allergies: {typeof(this.props.patientInfo["Patient Info"]) !== "undefined" && this.props.patientInfo["Patient Info"].drugAllergies}
        </Typography>
        <Divider />
        <Typography>
          Pregnant: {typeof(this.props.patientInfo["Patient Info"]) !== "undefined" && this.props.patientInfo["Patient Info"].pregnant}
        </Typography>
      </Fragment>
    );
  }

  allInfo() {
    // Convert object to nested array
    // [ [field_name, value], ... ]
    var previousInfo = Object.entries(this.props.patientInfo);
    // Filter out unwanted fields
    const fieldsToRemove = ["_id", "stationQueue", "nextStation", "createdAt", "busy"];
    // Also filter out fields that are multiple select
    previousInfo = previousInfo.filter(field => !fieldsToRemove.includes(field[0]) && !Array.isArray(field[1]));

    var listInfo = [];
    var i;
    for (i = 0; i < previousInfo.length; i++) {
      const field = previousInfo[i];

      // All forms are objects
      if (field[1].__proto__.constructor.name === "Object") {
        // {Station: {.. fields ..} }
        // Convert object to array
        const individualForm = Object.entries(field[1]);

        // // Map each field in the form to display
        // const subFieldInfo = individualForm.map(
        //   subField => this.makeInfoEntry(subField, field[0])
        // );
        
        var j;
        var subFieldInfo = [];
        for (j = 0; j < individualForm.length; j++) {
          const subField = individualForm[j];
    
          // Skip array fields
          if (!Array.isArray(subField[1])) {
            subFieldInfo.push(this.makeInfoEntry(subField, field[0]));
          }
        }

        listInfo.push(subFieldInfo);
      } else {
        // Display individual field directly
        listInfo.push(this.makeInfoEntry(field));
      }
    }

    // const listInfo = previousInfo.map(
    //   field => this.makeInfoEntry(field)
    // );

    return (
      <div>
        {listInfo}
      </div>
    );
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const textFieldLabel = this.state.textFieldLabel;
    const textFieldValue = this.state.textFieldValue;
    console.log(this.props.patientInfo)

    return (
      <Paper elevation={1}>
        <AppBar position="static" color="default">
          <Tabs value={this.state.value} onChange={this.handleChange}>
            <Tab label="Summary" />
            <Tab label="All Info" />
          </Tabs>
        </AppBar>
        {this.state.value === 0 && this.generalInfo()}
        {this.state.value === 1 && this.allInfo()}
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Grid container
            direction="column"
            justify="center"
            alignItems="flex-end"
          >
            <Grid item>
              <TextField
                id="edit-field"
                label={textFieldLabel}
                value={this.state.textFieldValue}
                onChange={this.handleEditChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <Button
                size="large"
                variant="outlined"
                onClick={this.submitEdit.bind(this)}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </Popover>
      </Paper>
    );
  }
}

export default Info;