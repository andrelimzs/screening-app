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
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  editField(field, event) {
    this.setState({
      anchorEl: event.currentTarget,
      textFieldLabel: field[0],
      textFieldValue: field[1],
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  makeInfoEntry(field) {
    // 
    // console.log(field);
    return (
      <Fragment>
        <Button variant="text" fullWidth={true} onClick={this.editField.bind(this,field)}>
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
    alert('An edit was submitted: ' + this.state.textFieldValue);
  }

  generalInfo() {
    return (
      <Fragment>
        <Typography>
          Name: {this.props.patientInfo.name}
        </Typography>
        <Divider />
        <Typography>
          Age: {this.props.patientInfo.age}
        </Typography>
        <Divider />
        <Typography>
          Spoken Languages: {typeof this.props.patientInfo.spokenLanguages !== 'undefined' && 
            this.props.patientInfo.spokenLanguages.join(", ")}
        </Typography>
        <Divider />
        <Typography>
          Drug Allergies: {this.props.patientInfo.drugAllergies}
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

    const listInfo = previousInfo.map(
      field => this.makeInfoEntry(field)
    );

    return (
      <div>
        {listInfo}
      </div>
    )
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const textFieldLabel = this.state.textFieldLabel;
    const textFieldValue = this.state.textFieldValue;

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